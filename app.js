const loopback = require("loopback");
const boot = require("loopback-boot");
const SpotifyWebApi = require("spotify-web-api-node");
const request = require("request");

const app = loopback();

// Your client ID and client secret from the Spotify Developer Dashboard
const clientId = "205d51b041064894b6680df74303e6fb";
const clientSecret = "11de63d3435340beb44f62bf6ad8da1a";

// Set up the Spotify Web API client
const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
});

// Get an access token using the Client Credentials flow
const authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " +
      new Buffer.from(clientId + ":" + clientSecret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    const token = body.access_token;
    spotifyApi.setAccessToken(token);
    console.log("Access token generated:", token);
  }
});

app.get("/api/v1/spotify", async (req, res) => {
  try {
    const data = await spotifyApi.getMe({
      headers: {
        Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
      },
    });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
});

app.get("/api/v1/spotify/search", async (req, res) => {
  try {
    const { data } = await spotifyApi.searchTracks("artist:Love");
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
});

app.start = function () {
  return app.listen(function () {
    app.emit("started");
    const baseUrl = app.get("url").replace(/\/$/, "");
    console.log("Web server listening at: %s", baseUrl);
    if (app.get("loopback-component-explorer")) {
      const explorerPath = app.get("loopback-component-explorer").mountPath;
      console.log("Browse your REST API at %s%s", baseUrl, explorerPath);
    }
  });
};

boot(app, __dirname, function (err) {
  if (err) throw err;
  // start the server if `$ node server.js`
  if (require.main === module) {
    app.start();
  }
});

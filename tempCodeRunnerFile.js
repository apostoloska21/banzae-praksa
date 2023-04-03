app.get("/api/v1/spotify/albums", async (req, res) => {
  try {
    const { data } = await spotifyApi.searchAlbums(
      `artist:${req.query.artist}`
    );
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
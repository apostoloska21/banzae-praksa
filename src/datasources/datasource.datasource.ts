import { inject, lifeCycleObserver, LifeCycleObserver } from "@loopback/core";
import { juggler } from "@loopback/repository";

const config = {
  name: "datasource",
  connector: "memory",
  localStorage: "spotifyapp",
  file: "",
};

@lifeCycleObserver("datasource")
export class DatasourceDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = "datasource";
  static readonly defaultConfig = config;

  constructor(
    @inject("datasources.config.datasource", { optional: true })
    dsConfig: object = config
  ) {
    super(dsConfig);
  }
}

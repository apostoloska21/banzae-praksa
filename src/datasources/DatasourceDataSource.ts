import { inject, lifeCycleObserver, LifeCycleObserver } from "@loopback/core";
import { juggler } from "@loopback/repository";
import { config } from "./datasource.datasource";

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

// import { juggler } from "@loopback/repository";
// import { inject, lifeCycleObserver, LifeCycleObserver } from "@loopback/core";
// import * as tsconfig from "../../public/tsconfig.json";
// //db.datasources.ts

// export const config = {
//     name: 'db',
//     connector: 'postgresql',
//     url: '',
//     host: 'localhost',
//     port: 5432,
//     user: 'postgres',
//     password: '1234',
//     database: 'postgres',
//     ssl: false,
//   };

//   @lifeCycleObserver('datasource')
//   export class DbDataSource
//     extends juggler.DataSource
//     implements LifeCycleObserver
//   {
//     static dataSourceName = 'db'
//     static readonly defaultConfig = config

//     constructor(
//       @inject('datasources.config.db', { optional: true })
//       dsConfig: object = config,
//     ) {
//       super(dsConfig)
//     }
//   }

// // Set experimentalDecorators option explicitly
// // to remove the warning
// // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// if (process.env.NODE_ENV === "development") {
//   // eslint-disable-next-line @typescript-eslint/no-var-requires
//   require("reflect-metadata");
// }

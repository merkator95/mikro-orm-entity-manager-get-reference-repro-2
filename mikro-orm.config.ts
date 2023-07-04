import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { PostgreSqlDriver, defineConfig } from '@mikro-orm/postgresql';

export default defineConfig({
  driver: PostgreSqlDriver,
  dbName: 'repro',
  host: 'localhost',
  port: 5432,
  user: 'admin',
  password: 'admin',
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 60_000,
  },

  type: 'postgresql',
  dynamicImportProvider: (id) => import(id),
  entities: ['./entities/*.ts'],
  metadataProvider: TsMorphMetadataProvider,
  debug: true,
});

// /// sqlite config - works fine here
// import { defineConfig, SqlitePlatform } from '@mikro-orm/sqlite';

// SqlitePlatform.prototype.usesReturningStatement = () => false;
// export default defineConfig({
//   dbName: ':memory:',
//   dynamicImportProvider: (id) => import(id),
//   entities: ['./entities/*.ts'],
//   metadataProvider: TsMorphMetadataProvider,
//   allowGlobalContext: true, // only for testing!
//   debug: true,
//   // as batch insert in sqlite requires returning statements now, we need to disable it
//   useBatchInserts: false,
// });

import { mongoMigrateCli } from 'mongo-migrate-ts';
import  { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } from '../config'

mongoMigrateCli({
  uri: `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:27017/${DB_NAME}`,
  migrationsDir: './src/migrations',
  // The name of the collection to store the applied migrations
  migrationsCollection: 'migrations_changelog'
});
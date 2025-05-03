// src/db/migrate.ts
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { migrationClient, db } from './index';

async function runMigrations() {
  console.log('Connecting to database for migrations...');
  try {
    console.log('Running migrations...');
    await migrate(db, { migrationsFolder: 'drizzle' });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exitCode = 1;
  } finally {
    console.log('Closing migration client connection...');
    await migrationClient.end();
    console.log('Migration client connection closed.');
    process.exit(process.exitCode || 0);
  }
}

runMigrations();

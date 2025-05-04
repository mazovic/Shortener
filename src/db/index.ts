import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { environment } from '../config/env';
import { urls } from './schema/url.schema';

const connectionString = environment.databaseUrl;

export const migrationClient = postgres(connectionString, { max: 1 });

export const queryClient = postgres(connectionString);
export const db = drizzle(queryClient, { schema: { urls } });

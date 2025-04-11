import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

// Připojení přímo k Supabase PostgreSQL databázi
const connectionString = process.env.DATABASE_URL || ''
// Nastavení connectionString ve formátu:
// postgres://postgres.xxxxxxxxxxxx:[heslo]@aws-0-xx-xx-xx.pooler.supabase.com:5432/postgres

const client = postgres(connectionString)

// Vytvoření Drizzle instance
export const db = drizzle(client)

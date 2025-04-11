// import {neon, neonConfig, NeonQueryFunction} from '@neondatabase/serverless'
// import { NeonHttpDatabase} from 'drizzle-orm/neon-http'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from '../database/schema'

export function useDrizzle () {
  if (!process.env.DATABASE_URL)
    throw new Error('Missing db.url in runtime config')

  return drizzle(postgres(process.env.DATABASE_URL, { max: 1 }), { schema })
}

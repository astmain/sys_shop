
import { timestamp, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"


export const id_str = varchar({ length: 36 }).primaryKey().default(sql`gen_random_uuid()`)
export const at_created = timestamp({ withTimezone: false }).defaultNow().notNull()
export const at_updated = timestamp({ withTimezone: false }).defaultNow().notNull().$onUpdate(() => new Date())
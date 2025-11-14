import { pgTable, varchar, integer, check } from "drizzle-orm/pg-core"
import { id_str } from "../common"
import { sql } from "drizzle-orm"

export const tb_test2 = pgTable("tb_test2", {
    id: id_str,
    name: varchar("name", { length: 255 }),
    age: integer("age"),
    phone: varchar("phone", { length: 255 }),
}, (table) => [
    check(
        "tb_test2_age_non_negative",
        sql`${table.age} >= 0`
    ),
    check(
        "tb_test2_phone_format_check",
        sql`${table.phone} ~ '^1[3-9][0-9]{9}$'`
    ),
])

import type { z } from 'zod'
import { createSelectSchema, createUpdateSchema, createInsertSchema } from 'drizzle-zod'

export const tb_test2_schema = createSelectSchema(tb_test2).omit({ age: true, })
// export const tb_test2_schema = createSelectSchema(tb_test2 )
export type tb_test2_infer = z.infer<typeof tb_test2_schema>

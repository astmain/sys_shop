import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core"
import { id_str } from "../common"


// tb_account 表
export const tb_account = pgTable("tb_account", {
    id: id_str,
    name: varchar("name", { length: 255 }).default("小许"),

})


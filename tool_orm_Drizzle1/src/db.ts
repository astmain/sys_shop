import postgres from "postgres"
import * as drizzle_orm from "drizzle-orm/postgres-js"
import * as schema from "./schema/index"
import config from "./config"

// 创建 postgres 客户端
const client = postgres((config as any)?.dbCredentials?.url || "")

// 创建 drizzle 数据库实例
export const db = drizzle_orm.drizzle(client, { schema })

// 导出客户端，用于关闭连接
export const db_client = client


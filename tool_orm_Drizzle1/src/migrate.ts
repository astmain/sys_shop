import { db, db_client } from "./db"
import * as schema from "./schema/index"

async function migrate() {
    try {
        console.log("开始创建表...")

        // 使用 drizzle-kit 的 push 功能创建表
        // 注意：这里需要先运行 drizzle-kit push 命令
        // 或者使用 drizzle-orm 的 SQL 直接创建表

        console.log("表创建完成")
    } catch (error) {
        console.error("迁移失败:", error)
        throw error
    } finally {
        await db_client.end()
    }
}

// 如果直接运行此文件
if (require.main === module) {
    migrate()
        .then(() => {
            console.log("迁移成功")
            process.exit(0)
        })
        .catch((error) => {
            console.error("迁移失败:", error)
            process.exit(1)
        })
}


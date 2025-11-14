import { db, db_client } from "./db"
import { tb_test1 } from "./schema/tb_test1"
import { eq } from "drizzle-orm"

// 示例：插入数据
async function example_insert() {
    const result = await db.insert(tb_test1).values({ name: "测试名称" }).returning()
    console.log("插入结果:", result)
    return result
}

// 示例：查询数据
async function example_select() {
    const result = await db.select().from(tb_test1)
    console.log("查询结果:", result)
    return result
}

// 示例：根据 id 查询
async function example_select_by_id(id: number) {
    const result = await db.select().from(tb_test1).where(eq(tb_test1.id, id))
    console.log("根据 id 查询结果:", result)
    return result
}

// 示例：更新数据
async function example_update(id: number, name: string) {
    const result = await db.update(tb_test1).set({ name }).where(eq(tb_test1.id, id)).returning()
    console.log("更新结果:", result)
    return result
}

// 示例：删除数据
async function example_delete(id: number) {
    const result = await db.delete(tb_test1).where(eq(tb_test1.id, id)).returning()
    console.log("删除结果:", result)
    return result
}

// 主函数
async function main() {
    try {
        // 插入示例
        await example_insert()

        // 查询示例
        await example_select()

        // 关闭连接
        await db_client.end()
    } catch (error) {
        console.error("执行失败:", error)
        await db_client.end()
        process.exit(1)
    }
}

// 如果直接运行此文件
if (require.main === module) {
    main()
}

export { example_insert, example_select, example_select_by_id, example_update, example_delete }


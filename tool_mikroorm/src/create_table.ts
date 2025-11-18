import 'reflect-metadata'
import { db1_init, db1_create_schema, db1_orm } from './db1'

async function create_table() {
    try {
        // 初始化数据库连接
        await db1_init()

        // 创建表
        await db1_create_schema()

        console.log('所有表创建完成')
    } catch (error) {
        console.error('创建表失败:', error)
    } finally {
        // 关闭数据库连接
        if (db1_orm) {
            await db1_orm.close()
        }
    }
}

create_table()


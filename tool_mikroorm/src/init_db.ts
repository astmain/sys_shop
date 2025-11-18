import 'reflect-metadata'
import { db1_init, db1_create_schema, db1_drop_schema, db1_orm } from './db1'

// 方式1: 更新表结构（保留数据，添加新字段）
async function update_schema() {
    try {
        console.log('开始更新表结构...')
        await db1_init()
        await db1_create_schema()
        console.log('表结构更新完成')
    } catch (error) {
        console.error('更新表结构失败:', error)
    } finally {
        if (db1_orm) {
            await db1_orm.close()
        }
    }
}

// 方式2: 删除所有表并重新创建（清空所有数据）
async function drop_and_create_schema() {
    try {
        console.log('开始删除所有表...')
        await db1_init()
        await db1_drop_schema()
        
        console.log('开始重新创建表...')
        await db1_create_schema()
        console.log('数据库重新初始化完成')
    } catch (error) {
        console.error('重新初始化失败:', error)
    } finally {
        if (db1_orm) {
            await db1_orm.close()
        }
    }
}

// 根据命令行参数选择方式
// 如果传入 'drop' 参数，则删除并重建；否则只更新表结构
const mode = process.argv[2]

if (mode === 'drop') {
    console.log('⚠️  警告：将删除所有表和数据！')
    drop_and_create_schema()
} else {
    console.log('更新表结构（保留数据）...')
    update_schema()
}


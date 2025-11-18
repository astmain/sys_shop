import { MikroORM } from '@mikro-orm/core'
import { defineConfig } from '@mikro-orm/postgresql'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { tb_test1 } from './entity/tb_test1'

export const db1_config = defineConfig({
    clientUrl: 'postgresql://root:123456@103.119.2.223:2008/back?schema=public',
    entities: [tb_test1],
    dbName: 'back',
    user: 'root',
    password: '123456',
    host: '103.119.2.223',
    port: 2008,
    schema: 'public',
    timezone: 'Asia/Shanghai',
    debug: false,
    allowGlobalContext: true,
})

export let db1_orm: MikroORM<PostgreSqlDriver> | null = null

export async function db1_init() {
    if (!db1_orm) {
        db1_orm = await MikroORM.init<PostgreSqlDriver>(db1_config)
        console.log('数据库连接成功')
    }
    return db1_orm
}

export const db1 = () => {
    if (!db1_orm) {
        throw new Error('数据库未初始化，请先调用 db1_init()')
    }
    // 由于配置了 allowGlobalContext: true，可以直接使用全局 em
    // 如果需要独立上下文，可以使用 db1_orm.em.fork()
    return db1_orm.em
}

// 创建表（如果表不存在则创建，如果存在则更新）
export async function db1_create_schema() {
    if (!db1_orm) {
        await db1_init()
    }
    if (db1_orm) {
        const generator = db1_orm.schema
        await generator.updateSchema()
        console.log('表创建/更新成功')
    }
}

// 删除所有表（危险操作，谨慎使用）
export async function db1_drop_schema() {
    if (!db1_orm) {
        await db1_init()
    }
    if (db1_orm) {
        const generator = db1_orm.schema
        await generator.dropSchema()
        console.log('所有表已删除')
    }
}

// 创建表（仅创建，如果表已存在会报错）
export async function db1_create_schema_safe() {
    if (!db1_orm) {
        await db1_init()
    }
    if (db1_orm) {
        const generator = db1_orm.schema
        await generator.createSchema()
        console.log('表创建成功')
    }
}


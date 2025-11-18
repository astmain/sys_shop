import { MikroORM } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'
import { tb_test1 } from './entity/tb_test1'

export const db1_config = {
    type: 'postgresql' as const,
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
}

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
    return db1_orm.em
}


import 'reflect-metadata'
import { db1, db1_connect } from './db1'
import { tb_test1 } from './entity/tb_test1'
import { tb_user } from './entity/tb_user'


export { Like } from 'typeorm'

export const db_typeorm = db1
export { tb_test1 } from './entity/tb_test1'
export { tb_user } from './entity/tb_user'
export { sys_user } from './entity/sys_user'
export { tb_test1_zod, tb_test1_zod_i } from './tb_type/tb_test1_zod'







tool_db_init_entity()
export async function tool_db_init_entity() {
  try {
    if (!db1_connect.isInitialized) {
      await db1_connect.initialize()
      await db1_connect.query("SET TIME ZONE 'Asia/Shanghai'")
      console.log('数据库连接成功')
    }
    // await db1_connect.synchronize()
    // console.log('数据库同步成功')
  } catch (error) {
    console.error('数据库连接失败:', error)
    throw error
  }
}

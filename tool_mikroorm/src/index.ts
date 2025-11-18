import 'reflect-metadata'
import { db1, db1_init, db1_orm } from './db1'
import { tb_test1 } from './entity/tb_test1'

export { tb_test1 } from './entity/tb_test1'
export const db_mikroorm = db1

mikroorm_init_entity()
export async function mikroorm_init_entity() {
  try {
    await db1_init()
    console.log('MikroORM 初始化成功')
  } catch (error) {
    console.error('MikroORM 初始化失败:', error)
    throw error
  }
}


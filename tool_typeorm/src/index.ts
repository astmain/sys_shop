import 'reflect-metadata'
import { db1, db1_connect } from './db1'

import { tb_user } from './entity/tb_user'


export { Like, In } from 'typeorm'

export const db_typeorm = db1

export { tb_user } from './entity/tb_user'






// 用户表
export { sys_user } from './entity/sys_user'
export { login, login_type } from './entity/sys_user'
export { remove_ids_user, remove_ids_user_type } from './entity/sys_user'




// 菜单表
export { sys_menu } from './entity/sys_menu'

// 部门表
export { sys_depart } from './entity/sys_depart'


tool_typeorm_init_entity()
export async function tool_typeorm_init_entity() {
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

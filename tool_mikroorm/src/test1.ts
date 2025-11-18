import 'reflect-metadata'
import { db1, db1_init, db1_orm } from './db1'
import { tb_test1 } from './entity/tb_test1'
import { v4 as uuidv4 } from 'uuid'

async function insert_test1() {
  // 初始化数据库连接
  await db1_init()
  
  // 获取 EntityManager
  const em = db1()
  
  // 创建新实体实例
  const new_item = new tb_test1()
  new_item.id = uuidv4()
  new_item.name = '测试名称'
  
  // 持久化并提交到数据库
  em.persist(new_item)
  await em.flush()
  
  console.log('插入成功:', new_item)
  
  // 关闭连接
  if (db1_orm) {
    await db1_orm.close()
  }
}

// 批量插入示例
async function insert_test1_batch() {
  await db1_init()
  const em = db1()
  
  // 创建多个实体
  const items = [
    { id: uuidv4(), name: '测试1' },
    { id: uuidv4(), name: '测试2' },
    { id: uuidv4(), name: '测试3' },
  ]
  
  // 批量持久化
  items.forEach(item => {
    const new_item = new tb_test1()
    new_item.id = item.id
    new_item.name = item.name
    em.persist(new_item)
  })
  
  // 一次性提交
  await em.flush()
  console.log('批量插入成功:', items.length, '条')
  
  if (db1_orm) {
    await db1_orm.close()
  }
}

// 执行插入
insert_test1().catch(console.error)
// insert_test1_batch().catch(console.error) // 取消注释以使用批量插入
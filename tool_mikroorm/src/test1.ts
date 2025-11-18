import 'reflect-metadata'
import { db1, db1_init, db1_orm } from './db1'
import { tb_test1 } from './entity/tb_test1'
import { v4 as uuidv4 } from 'uuid'

// 方法1: 使用 persistAndFlush (推荐 - 一次性完成持久化和提交)
async function insert_test1() {
    await db1_init()
    const em = db1()

    // 创建新实体实例
    const new_item = new tb_test1()
    new_item.id = uuidv4()
    new_item.name = '测试名称'

    // 使用 persistAndFlush 一次性完成持久化和提交
    await em.persistAndFlush(new_item)

    console.log('插入成功:', new_item)

    if (db1_orm) {
        await db1_orm.close()
    }
}

// 方法2: 使用 insert (直接插入数据，不需要创建实体实例)
async function insert_test1_insert() {
    await db1_init()
    const em = db1()

    // 使用 insert 直接插入数据
    const new_item = await em.insert(tb_test1, {
        id: uuidv4(),
        name: '测试名称_insert',
        age: '18'


    })

    console.log('插入成功:', new_item)

    if (db1_orm) {
        await db1_orm.close()
    }



    console.log('插入成功:', new_item)

    if (db1_orm) {
        await db1_orm.close()
    }
}

// 方法3: 使用 create + persistAndFlush
async function insert_test1_create() {
    await db1_init()
    const em = db1()

    // 使用 create 创建实体实例
    const new_item = em.create(tb_test1, {
        id: uuidv4(),
        name: '测试名称_create',
        age: '18'

    })

    // 持久化并提交
    await em.persistAndFlush(new_item)

    console.log('插入成功:', new_item)

    if (db1_orm) {
        await db1_orm.close()
    }
}

// 批量插入示例 - 使用 insertMany (推荐)
async function insert_test1_batch() {
    await db1_init()
    const em = db1()

    // 使用 insertMany 批量插入
    const items = await em.insertMany(tb_test1, [
        { id: uuidv4(), name: '测试1', age: '18' },
        { id: uuidv4(), name: '测试2', age: '18' },
        { id: uuidv4(), name: '测试3', age: '18' },
    ])

    console.log('批量插入成功:', items.length, '条')

    if (db1_orm) {
        await db1_orm.close()
    }
}

// 批量插入示例 - 使用 persist + flush
async function insert_test1_batch_persist() {
    await db1_init()
    const em = db1()

    // 创建多个实体
    const items = [
        { id: uuidv4(), name: '测试1', age: '18' },
        { id: uuidv4(), name: '测试2', age: '18' },
        { id: uuidv4(), name: '测试3', age: '18' },
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

// 执行插入 - 选择其中一种方法
insert_test1().catch(console.error)
// insert_test1_insert().catch(console.error)
// insert_test1_create().catch(console.error)
// insert_test1_batch().catch(console.error)
// insert_test1_batch_persist().catch(console.error)
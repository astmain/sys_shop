import { Controller, Module, Get, Post, Body, Query, Req, Inject } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger'
import { Api_Get } from '@src/plugins/Api_Get'
import { Api_group } from '@src/plugins/Api_group'

// dto
import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsNotEmptyObject, IsString, Min, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'


// db
import { db1 as db } from '@src/v1/zoom_prisma/db_prisma_1'
import { db as orm, eq, tb_test1, tb_account } from 'tool_orm_Drizzle1'
import { util_uuid9 } from '@src/plugins/util_uuid9'

@Api_group('test', '测试数据库')
export class test_db {
    @Api_Get('测试1')
    async test1() {
        const user_list = await db.user.findMany()
        const test_insert = await orm.insert(tb_test1).values({ name: "测试名称" }).returning()
        const test_list = await orm.select().from(tb_test1).where(eq(tb_test1.id, 1))
        console.log(`111---test_list:`, test_list)

        return { code: 200, msg: '成功:测试数据库', result: { user_list, test_list, test_insert } }
    }


    @Api_Get('测试2_新增')
    async test2_insert() {
        const one = await orm.insert(tb_account).values({ name: "测试名称" }).returning()
        return { code: 200, msg: '成功:测试2_新增', result: { one } }
    }



    @Api_Get('测试2_更新')
    async test2_update() {
        //     7
        const name = '测试名称' + util_uuid9()
        console.log(`111---name:`, name)
        const one = await orm.update(tb_account).set({ name }).where(eq(tb_account.id, "7")).returning()


        // "one": [
        //     {
        //       "id": 7,
        //       "name": "测试名称c796_b999",
        //       "createdAt": "2025-11-13 11:41:08.004",
        //       "updatedAt": "2025-11-13 11:41:08.004"
        //     }
        //   ]

        // 为什么我更新了updatedAt却没有变化？,我希望能自动变化
        return { code: 200, msg: '成功:测试2_更新', result: { one } }
    }


}

@Module({
    controllers: [test_db],
    providers: [],
})
export class test_db_module { }

import { Controller, Module, Get, Post, Body, Query, Req, Inject, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger'
import { Api_Get } from '@src/plugins/Api_Get'
import { Api_group } from '@src/plugins/Api_group'

// dto
import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsNotEmptyObject, IsString, Min, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
import { util_uuid9 } from '@src/plugins/util_uuid9'

// db

import { db_typeorm } from 'tool_db'
import { Like } from 'tool_db'
import { tb_user } from 'tool_db'
import { Api_Post } from '@src/plugins/Api_Post'

export class find_list_user extends PickType(tb_user, ['name']) {}

@Api_group('test', '测试_typeorm')
export class test_typeorm {
  @Api_Get('新增')
  async create() {
    // const one = await db_typeorm.save(new tb_user({ name: '测试名称', password: '123456' }))
    const user = new tb_user({ name: '测试名称', password: '123456' })
    const one = await db_typeorm.save(user)
    return { code: 200, msg: '成功:新增', result: { one } }
  }

  @Api_Get('更新')
  async update() {
    // 更新的方式1
    const user = await db_typeorm.findOne(tb_user, { where: { id: '379d8261-be02-4c98-a96e-3312bc41d517' } })
    user.name = '测试名称2' + util_uuid9()
    const one = await db_typeorm.save(user)

    // 更新的方式2
    // const one = await db_typeorm.update(
    //   tb_user,
    //   { id: '379d8261-be02-4c98-a96e-3312bc41d517' }, // WHERE 条件
    //   { name: '新名字', password: '123456' }, // SET 字段
    // )

    return { code: 200, msg: '成功:更新', result: { one: one } }
  }

  @Api_Post('查询')
  async find(@Query() body: find_list_user) {
    console.log('1111111', body)
    // const user = await db_typeorm.find(tb_user, { where: { id: '379d8261-be02-4c98-a96e-3312bc41d517' } })
    const list = await db_typeorm.find(tb_user, { where: { name: Like(`%${body.name || ''}%`) } })
    const list_by = await db_typeorm.findBy(tb_user, { name: Like(`%${body.name || ''}%`) })
    const one = await db_typeorm.findOne(tb_user, { where: { name: Like(`%${body.name}%`) } })
    const one_by = await db_typeorm.findOneBy(tb_user, { id: '379d8261-be02-4c98-a96e-3312bc41d517' })
    return { code: 200, msg: '成功:查询', result: { list, list_by, one, one_by } }
  }
}

@Module({
  controllers: [test_typeorm],
  providers: [],
})
export class test_typeorm_module {}

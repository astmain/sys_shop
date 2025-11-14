import { Controller, Module, Get, Post, Body, Query, Req, Inject } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger'
import { Api_Get } from '@src/plugins/Api_Get'
import { Api_group } from '@src/plugins/Api_group'

// dto
import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsNotEmptyObject, IsString, Min, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

import { db2 as db } from '@src/v2/zoom_prisma/db_prisma_2'

class find_list_user {
  @ApiProperty({ description: '名称', example: '名称' })
  @IsString()
  name2: string
}

// http://127.0.0.1:3002/doc.html
// http://127.0.0.1:3002/v2/user/find_list_user?name1=111
@Api_group('v2', '用户管理')
export class user {
  @Api_Get('查询用户列表')
  async find_list_user(@Query() body: find_list_user, @Req() _req: any) {
    let list = await db.test1.findMany()
    return { code: 200, msg: '成功:v2', result: { list } }
  }
}

@Module({
  controllers: [user],
  providers: [],
})
export class user_module {}

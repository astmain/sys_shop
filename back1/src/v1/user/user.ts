import { Controller, Module, Get, Post, Body, Query, Req, Inject } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger'
import { Api_Get } from '@src/plugins/Api_Get'
import { Api_group } from '@src/plugins/Api_group'
import * as tool_typeorm from 'tool_typeorm'




@Api_group('v1', '用户管理')
export class user {
  @Api_Get('查询用户列表')
  async find_list_user(@Query() body: any, @Req() _req: any) {

    return { code: 200, msg: '成功:v1', result: {} }
  }



}

@Module({
  controllers: [user],
  providers: [],
})
export class user_module { }

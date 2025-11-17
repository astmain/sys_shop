import { Controller, Module, Get, Post, Body, Query, Req, Inject } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger'
import { Api_Get } from '@src/plugins/Api_Get'
import { Api_Post } from '@src/plugins/Api_Post'
import { Api_group } from '@src/plugins/Api_group'


// ================================== 数据库 ==================================
import { db_typeorm, In } from 'tool_typeorm'
import { sys_user } from 'tool_typeorm'


// ================================== dto ==================================
import { remove_ids_user } from 'tool_typeorm'


@Api_group('v1', '用户管理')
export class user {
  @Api_Get('查询用户列表')
  async find_list_user(@Query() body: any, @Req() _req: any) {
    return { code: 200, msg: '成功:v1', result: {} }
  }



  @Api_Post('删除用户')
  async remove_ids_user(@Body() body: remove_ids_user, @Req() _req: any) {
    console.log(`remove_ids_user---body:`, body)
    await db_typeorm.delete(sys_user, { user_id: In(body.ids) })
    return { code: 200, msg: '成功:v1', result: {} }
  }



}

@Module({
  controllers: [user],
  providers: [],
})
export class user_module { }

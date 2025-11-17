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
import { find_one_user } from './dto/find_one_user'

// ================================== 服务 ==================================
import { auth_Service } from '../auth/auth_Service'

@Api_group('v1', '用户管理')
export class user {


  constructor(private readonly auth_service: auth_Service) { }
  @Api_Get('查询用户列表')
  async find_list_user(@Query() body: any, @Req() _req: any) {
    return { code: 200, msg: '成功', result: {} }
  }



  @Api_Post('删除用户')
  async remove_ids_user(@Body() body: remove_ids_user, @Req() _req: any) {
    console.log(`remove_ids_user---body:`, body)
    await db_typeorm.delete(sys_user, { user_id: In(body.ids) })
    return { code: 200, msg: '成功', result: {} }
  }


  @Api_Post('保存用户')
  async save_user(@Body() body: sys_user, @Req() _req: any) {
    console.log(`save_user---body:`, body)
    return { code: 200, msg: '成功', result: {} }
  }



  @Api_Post('查询-单个-用户')
  async find_one_user(@Body() body: { user_id: string }, @Req() _req: any) {
    console.log(`find_one_user---body:`, body)
    const user = await db_typeorm.findOne(sys_user, { where: { user_id: body.user_id } })
    if (!user) return { code: 400, msg: '失败', result: {} }
    const { depart_tree } = await this.auth_service.find_depart_tree()
    return { code: 200, msg: '成功', result: { user, depart_tree } }
  }



}

@Module({
  controllers: [user],
  providers: [auth_Service],
})
export class user_module { }

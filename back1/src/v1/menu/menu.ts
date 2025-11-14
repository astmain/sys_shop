import { Controller, Module, Get, Post, Body, Query, Req, Inject } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger'
import { Api_Get } from '@src/plugins/Api_Get'
import { Api_Post } from '@src/plugins/Api_Post'
import { Api_group } from '@src/plugins/Api_group'
import { Api_public } from '@src/App_Auth'
import { JwtService } from '@nestjs/jwt'

// ================================== 数据库 ==================================
// import { db_typeorm } from 'tool_typeorm'
// import { sys_user } from 'tool_typeorm'
// ================================== dto ==================================
// import { login } from 'tool_typeorm'

@Api_public()
@Api_group('v1', '000000')
export class menu {
  @Api_Post('111111')
  async find_tree_menu(@Body() body: any, @Req() _req: any) {
    console.log(`login---body:`, body)
    return { code: 200, msg: '成功', result: {} }
  }








}

@Module({
  controllers: [menu],
  providers: [],
})
export class menu_module { }

import { Controller, Module, Get, Post, Body, Query, Req, Inject } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger'
import { Api_Get } from '@src/plugins/Api_Get'
import { Api_Post } from '@src/plugins/Api_Post'
import { Api_group } from '@src/plugins/Api_group'
import { Api_public } from '@src/App_Auth'
import { JwtService } from '@nestjs/jwt'

// ================================== 数据库工具 ==================================
import { db_build_tree } from '@src/plugins/db_build_tree'

// ================================== 数据库 ==================================
import { db_typeorm } from 'tool_typeorm'
import { sys_menu } from 'tool_typeorm'

// ================================== dto ==================================



@Api_public()
@Api_group('v1', '菜单管理')
export class menu {
  @Api_Post('查询-菜单树')
  async find_tree_menu(@Body() body: any, @Req() _req: any) {
    console.log(`login---body:`, body)
    const list_menu = await db_typeorm.find(sys_menu) 

    const tree_menu = db_build_tree(list_menu)

    return { code: 200, msg: '成功', result: {tree_menu} }
  }








}

@Module({
  controllers: [menu],
  providers: [],
})
export class menu_module { }

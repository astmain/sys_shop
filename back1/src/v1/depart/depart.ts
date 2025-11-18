import { Controller, Module, Get, Post, Body, Query, Req, Inject } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger'
import { Api_Get } from '@src/plugins/Api_Get'
import { Api_Post } from '@src/plugins/Api_Post'
import { Api_group } from '@src/plugins/Api_group'
import { Api_public } from '@src/App_Auth'
import { JwtService } from '@nestjs/jwt'


// ================================== 数据库 ==================================
import { db_typeorm } from 'tool_typeorm'
// import { sys_user } from 'tool_typeorm'
// ================================== dto ==================================
import { find_depart_role } from './dto/find_depart_role'


// ================================== 服务 ==================================
import { auth_Service } from '../auth/auth_Service'

@Api_public()
@Api_group('v1', '部门管理')
export class depart {

    constructor(private readonly auth_service: auth_Service) { }


    @Api_Post('查询-部门树')
    async find_tree_depart(@Req() req: any) {
        const { tree_depart } = await this.auth_service.find_tree_depart()
        return { code: 200, msg: '成功', result: { tree_depart } }
    }


    @Api_Post('查询-部门-角色')
    async find_depart_role(@Body() body: find_depart_role, @Req() req: any) {
        const { list_role } = await this.auth_service.find_depart_role(body.depart_id)
        return { code: 200, msg: '成功', result: { list_role } }
    }




}

@Module({
    controllers: [depart],
    providers: [auth_Service],
})
export class depart_module { }

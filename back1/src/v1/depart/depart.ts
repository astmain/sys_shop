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
import { sys_depart, sys_menu } from 'tool_typeorm'
// ================================== dto ==================================
import { find_depart_role } from './dto/find_depart_role'
import { edit_depart_role_menu } from './dto/edit_depart_role_menu'
// ================================== 工具 ==================================
import { util_uuid9 } from '@src/plugins/util_uuid9'
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
        const { list_role, form } = await this.auth_service.find_depart_role(body.depart_id)
        return { code: 200, msg: '成功', result: { list_role, form } }
    }



    @Api_Post('修改-部门-角色-菜单-列表')
    async edit_depart_role_menu(@Body() body: edit_depart_role_menu, @Req() req: any) {
        const { depart_id, depart_name, role_list } = body
        console.log("body---", JSON.parse(JSON.stringify(body)))
        await db_typeorm.transaction(async (transaction) => {
            if (depart_id) {

                await transaction.update(sys_depart, { id: depart_id }, { name: depart_name })
            }
            else {
                await transaction.save(sys_depart, { name: depart_name })
            }
            for (let item of role_list) {
                // 如果角色ID为空，先创建角色记录
                let role_id = item.id
                if (!role_id || role_id.trim() === '') {
                    role_id = `role_${util_uuid9()}`
                    await transaction.save(sys_depart, { id: role_id, name: item.name, type: 'role', parent_id: depart_id, })
                }
                // 如果角色已存在，更新角色名称
                else {
                    await transaction.update(sys_depart, { id: role_id }, { name: item.name })
                }

                // 先查询旧的关联
                const ref_list = await transaction.createQueryBuilder().relation(sys_depart, 'sys_menu').of(role_id).loadMany()
                // 再删除旧的关联
                await transaction.createQueryBuilder().relation(sys_depart, 'sys_menu').of(role_id).remove(ref_list.map((o: any) => o.id))
                // 添加新的关联
                await transaction.createQueryBuilder().relation(sys_depart, 'sys_menu').of(role_id).add(item.button_ids)

            }

        })
        return { code: 200, msg: '成功', result: {} }
    }
}

@Module({
    controllers: [depart],
    providers: [auth_Service],
})
export class depart_module { }

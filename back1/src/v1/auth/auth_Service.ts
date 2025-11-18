import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'

// ================================== 数据库 ==================================
import { db_typeorm, In } from 'tool_typeorm'
import { sys_user } from 'tool_typeorm'
import { sys_menu } from 'tool_typeorm'
import { sys_depart } from 'tool_typeorm'

import { db_build_tree } from '@src/plugins/db_build_tree'

import { db_find_ids_self_and_parent } from '@src/plugins/db_find_ids_self_and_parent'
import { db_find_ids_self_and_children } from '@src/plugins/db_find_ids_self_and_children'


@Injectable()
export class auth_Service {
    // 查询-角色-根据-用户ID
    async find_role_by_user_id(user_id: string) {
        const role_list = await db_typeorm.createQueryBuilder().relation(sys_user, 'sys_depart').of(user_id).loadMany()
        return role_list
    }


    // 查询-部门-根据-角色ID
    async find_depart_by_user_id(user_id: string) {
        const role_list = await this.find_role_by_user_id(user_id)
        const depart_ids = await db_find_ids_self_and_parent({ db: db_typeorm, table_name: "sys_depart", ids: role_list.map((item) => item.id) })
        const depart_list = await db_typeorm.find(sys_depart, { where: { id: In(depart_ids) } })
        const depart_tree = db_build_tree(depart_list)
        return { depart_tree, depart_ids, depart_list }
    }



    // 查询-部门树
    async find_tree_depart() {
        const list_depart = await db_typeorm.find(sys_depart)
        const tree_depart = db_build_tree(list_depart)
        return { tree_depart }
    }

    // 查询-部门角色
    async find_depart_role(depart_id: string) {
        // 使用 find 方法查询，然后手动提取 id 字段
        // const list_role_all = await db_typeorm.find(sys_depart, { where: { parent_id: depart_id }, select: { id: true, name: true, status: false, type: false } })
        let list_role: any = await db_typeorm.find(sys_depart, { where: { parent_id: depart_id } })
        list_role = list_role.map((o) => ({ id: o.id, name: o.name }))
        // console.log(`list_role111---`, list_role)
        let list = []
        for (let item of list_role) {
            const menu_ids = await db_typeorm.query(`SELECT DISTINCT menu_id FROM ref_depart_menu WHERE depart_id = $1`, [item.id])
            list.push({ ...item, menu_ids: menu_ids.map((m: any) => m.menu_id) })
        }
        return { list_role: list }
    }


    // 查询-菜单树-根据-用户ID
    async find_menu_tree_by_user_id(user_id: string) {
        const role_list = await this.find_role_by_user_id(user_id)
        const depart_ids = await db_find_ids_self_and_parent({ db: db_typeorm, table_name: "sys_depart", ids: role_list.map((item) => item.id) })
        const button_list = await db_typeorm.query(
            `SELECT DISTINCT m.* FROM sys_menu m 
             INNER JOIN ref_depart_menu rdm ON m.id = rdm.menu_id 
             WHERE rdm.depart_id = ANY($1)`,
            [depart_ids]
        )
        const menu_button_ids = await db_find_ids_self_and_parent({ db: db_typeorm, table_name: "sys_menu", ids: button_list.map((item) => item.id) })
        const menu_ids = menu_button_ids.filter((item: any) => !item.includes(':'))
        const button_ids = menu_button_ids.filter((item: any) => item.includes(':'))
        const menu_list = await db_typeorm.find(sys_menu, { where: { id: In(menu_ids) } })
        // console.log("menu_list", JSON.parse(JSON.stringify(menu_list)))
        const menu_tree = db_build_tree(menu_list)
        // console.log("menu_tree", JSON.parse(JSON.stringify(menu_tree)))
        return { menu_tree, button_ids }
    }



    async find_list_user(depart_id: string) {
        const depart_role_ids = await db_find_ids_self_and_children({ db: db_typeorm, table_name: "sys_depart", id: depart_id })
        console.log(`find_list_user---depart_role_ids:`, depart_role_ids)//结果 [ 'role_1001', 'role_1002', 'depart_1001' ]
        const ref_user = await db_typeorm.query(`SELECT DISTINCT user_id FROM ref_user_depart WHERE depart_id = ANY($1)`, [depart_role_ids])
        const list_user = await db_typeorm.find(sys_user, { where: { user_id: In(ref_user.map((item: any) => item.user_id)) } })
        // console.log(`find_list_user---list_user:`, list_user)
        return { list_user }
    }

}
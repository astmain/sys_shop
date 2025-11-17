import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'

// ================================== 数据库 ==================================
import { db_typeorm, In } from 'tool_typeorm'
import { sys_user } from 'tool_typeorm'
import { sys_menu } from 'tool_typeorm'
import { sys_depart } from 'tool_typeorm'

import { db_find_ids_self_and_parent } from '@src/plugins/db_find_ids_self_and_parent'
import { db_build_tree } from '@src/plugins/db_build_tree'


@Injectable()
export class auth_Service {
    async find_role_by_user_id(user_id: string) {
        const role_list = await db_typeorm.createQueryBuilder()
            .relation(sys_user, 'sys_depart')
            .of(user_id)
            .loadMany()
        return role_list
    }

    
    async find_depart_ids_by_role_id(role_id: string) {
        const role_list = await this.find_role_by_user_id(role_id)
        const depart_ids = await db_find_ids_self_and_parent({ db: db_typeorm, table_name: "sys_depart", ids: role_list.map((item) => item.id) })
        return depart_ids
    }


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

}
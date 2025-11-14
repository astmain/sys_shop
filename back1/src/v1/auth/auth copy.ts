// import { Controller, Module, Get, Post, Body, Query, Req, Inject } from '@nestjs/common'
// import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'
// import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger'
// import { Api_Get } from '@src/plugins/Api_Get'
// import { Api_Post } from '@src/plugins/Api_Post'
// import { Api_group } from '@src/plugins/Api_group'
// import { Api_public } from '@src/App_Auth'
// import { JwtService } from '@nestjs/jwt'

// // ================================== 数据库 ==================================
// import { db_typeorm } from 'tool_typeorm'
// import { sys_user } from 'tool_typeorm'
// import { sys_menu } from 'tool_typeorm'
// // ================================== dto ==================================
// import { login } from 'tool_typeorm'





// @Api_public()
// @Api_group('v1', '认证')
// export class auth {
//     @Api_Post('登陆')
//     async login(@Body() body: login, @Req() _req: any) {
//         console.log(`login---body:`, body)
//         const one = await db_typeorm.findOneBy(sys_user, { phone: body.phone, password: body.password })
//         if (!one) return { code: 400, msg: '失败:用户不存在', result: { token: '123456' } }
//         const payload = { id: one?.user_id, user: one.phone }
//         const my_jwt_service = new JwtService()
//         const token = my_jwt_service.sign(payload, { secret: process.env.VITE_jwt_secret })
//         return { code: 200, msg: '成功', result: { token } }
//     }




//     @Api_Post('初始化数据-菜单-部门-用户')
//     async init_data_sys_menu_depart_user(@Body() body: login, @Req() _req: any) {
//         await db_typeorm.clear(sys_user)
//         try {
//             // 用户
//             await db_typeorm.save(new sys_user({ user_id: "1", name: '许鹏', phone: '15160315110', password: '123456' }))
//             await db_typeorm.save(new sys_user({ user_id: "2", name: '二狗', phone: '15160315112', password: '123456' }))



//             db_typeorm.insert(sys_menu, [
//                 // 一级菜单
//                 { menu_id: 'menu_1', name: '首页', path: '/home' },
//                 { menu_id: 'menu_2', name: '商城管理', path: '/shop' },
//                 { menu_id: 'menu_3', name: '用户管理', path: '/system/user' },
//                 { menu_id: 'menu_4', name: '菜单管理', path: '/system/menu' },
//                 { menu_id: 'menu_5', name: '字典管理', path: '/dict' },
//                 // 商城管理-子菜单
//                 { menu_id: 'sub_2001', name: '订单管理', path: '/shop/order', parent_id: 'menu_2' },
//                 { menu_id: 'sub_2002', name: '商品管理', path: '/shop/product', parent_id: 'menu_2' },
//                 { menu_id: 'sub_2003', name: '财务管理', path: '/shop/finance', parent_id: 'menu_2' },
//             ])



//             // const     aaa=   






//             return { code: 200, msg: '成功:初始化数据', result: {} }
//         } catch (error) {
//             return { code: 400, msg: '失败:初始化数据', result: { error } }
//         }

//         return { code: 200, msg: '成功', result: {} }
//     }



// }

// @Module({
//     controllers: [auth],
//     providers: [],
// })
// export class auth_module { }

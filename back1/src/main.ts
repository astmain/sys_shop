import { NestFactory } from '@nestjs/core'
import { Module } from '@nestjs/common'
import { check_env } from '@src/plugins/check_env'
import { filter_cors } from '@src/plugins/filter_cors'
import { filter_dto } from '@src/plugins/filter_dto'
import { filter_request } from '@src/plugins/filter_request'
import { filter_response } from '@src/plugins/filter_response'

import { home_module } from '@src/home_module'
import { Api_doc_group_swagger_knife4j2 } from '@src/plugins/Api_doc_group_swagger_knife4j2'
import { v1_module } from '@src/v1_module'
import { v2_module } from '@src/v2_module'
import { test_module } from '@src/test_module'
import { App_auth_Module } from '@src/App_Auth'
import * as tool_typeorm from 'tool_typeorm'
// import { client_mq } from '@src/client_mq'

const list_module = [v1_module, v2_module, test_module, { title: 'common', description: '通用接口', imports: [home_module] },]
// console.log(`111---list_module:`, list_module)
@Module({
  imports: [App_auth_Module, ...list_module.flatMap((o) => o.imports)],
  controllers: [],
})
class App_Module { }

async function main() {
  const app = await NestFactory.create(App_Module)
  // ==================== 插件配置 ====================
  const { env_curr } = check_env() //检查环境变量
  await filter_cors(app) // CORS配置(跨域请求)
  await filter_dto(app) // dto配置(全局验证管道)
  await filter_request(app) // 请求拦截器
  await filter_response(app) // 响应拦截器
  await Api_doc_group_swagger_knife4j2(app, list_module)

  // 初始化数据库连接
  await tool_typeorm.tool_db_init_entity()

  // 监听端口
  await app.listen(Number(process.env.VITE_port))
  console.log(`env_curr.VITE_port---`, env_curr.VITE_port)
  console.log(`env_curr.VITE_url_app_run---`, env_curr.VITE_url_app_run)


  // 获取项目根目录
  let path_project1 = __dirname.replace('\\dist', '').replace(/\\/g, '/') //C:/AAA/sys_back_vue/back6
  console.log(`path_project1---`, path_project1)
  process['path_project'] = path_project1

  //  client_mq()









}

main()

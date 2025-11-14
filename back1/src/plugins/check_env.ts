import * as _ from 'lodash'
import * as dotenv from 'dotenv'
import * as path from 'path'

// 环境规则
let env_rule = [
  { name: '项目名称', value: '', doc: false, key: 'VITE_project_name' },
  { name: '项目备注', value: '', doc: false, key: 'VITE_project_remark' },
  { name: '数据pg链接', value: '', doc_url: '', doc: false, key: 'VITE_url_db_pg' },
  { name: '项目端口号', value: '', doc_url: '', doc: false, key: 'VITE_port' },
  { name: '正在运行', value: '', doc_url: '', doc: true, key: 'VITE_url_app_run' },
  { name: '应用开发', value: '', doc_url: '', doc: true, key: 'VITE_url_app_dev' },
  { name: '应用内网', value: '', doc: true, key: 'VITE_url_app_inner' },
  { name: '应用容器', value: '', doc: true, key: 'VITE_url_app_docker' },
  { name: '应用正式发布', value: '', doc: true, key: 'VITE_url_app_prod' },
  { name: 'jwt密钥', value: '', doc: false, key: 'VITE_jwt_secret' },
  { name: 'jwt过期时间', value: '', doc: false, key: 'VITE_jwt_time_exp' },
  { name: 'jwttoken方便swagger调试', value: '', doc: false, key: 'VITE_jwt_token_swagger' },
]

// ()公共正则匹配npm运行的脚本指令
const env_file_path = process.env.npm_lifecycle_script
  .match(/dotenv.*?(?=\s*--)/)[0]
  .replace('dotenv', '')
  .replace('-e', '')
  .replace(/\s+/g, '')

export function check_env() {
  let env_curr = dotenv.config({ path: path.join(process.cwd(), env_file_path) }).parsed
  let env_err_list = []
  for (let i = 0; i < env_rule.length; i++) {
    let rule = env_rule[i]
    if (env_curr[rule.key]) {
    } else {
      let err = { key: rule.key, name: rule.name, err: '环境变量未配置' }
      env_err_list.push(err)
    }
  }

  if (env_err_list.length > 0) {
    const msg_err = `缺少环境变量---请检查文件[${env_file_path}]` + JSON.stringify(env_err_list, null, 2)
    throw new Error(msg_err)
  }

  return { env_curr }
}

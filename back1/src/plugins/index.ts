import { filter_cors } from './filter_cors'
import { filter_dto } from './filter_dto'
// import { Api_swagger_knife4j2 } from './Api_swagger_knife4j2'
import { check_env } from './check_env'
import { filter_request } from './filter_request'
import { filter_response } from './filter_response'

// 配置:函数
export const plugins = {
  // Api_swagger_knife4j2,
  filter_cors,
  filter_dto,
  check_env,
  filter_request,
  filter_response,
}

import { HttpException, HttpStatus } from '@nestjs/common'

/**
 * 返回API响应数据,考虑一下以后如何封装,既可以返回成功,又可以返回错误,还可以校验user_id是不是当前用户,还要获取用户权限
 * @param res 响应对象
 * @returns 响应对象
 */
export function Api_return(res: { code: number; msg: string; result: any }) {
  if (res.code === 200) {
    return { code: 200, msg: '成功', result: res.result }
  } else {
    throw new HttpException({ code: res.code, msg: res.msg, result: res.result }, res.code)
    // throw new HttpException({ code: res.code, msg: res.msg, result: res.result }, HttpStatus.BAD_REQUEST)
  }
}

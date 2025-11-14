import { /*接口*/ Controller, Get, Res } from '@nestjs/common'
import { /*文档*/ ApiTags, ApiOperation, ApiOkResponse, ApiProperty } from '@nestjs/swagger'
import { JwtService } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { /*环境变量*/ check_env } from '@src/plugins/check_env'
import dayjs from 'dayjs' // const dayjs = require('dayjs')
import { Api_public } from './App_auth'

// 通用响应基础类
class Base_Response_Dto<T = any> {
  @ApiProperty({ description: '状态码', example: 200 })
  code: number

  @ApiProperty({ description: '响应消息', example: '操作成功' })
  msg: string

  @ApiProperty({ description: '响应数据' })
  result: T

  constructor(code: number = 200, msg: string = '操作成功', result: T = null as T) {
    this.code = code
    this.msg = msg
    this.result = result
  }
}

@Api_public()
@ApiTags('首页')
@Controller()
export class home {
  @ApiOperation({ summary: '首页文档', description: '首页文档:' + process.env.VITE_url_app_run })
  @Get()
  async api(@Res() res: any) {
    return res.redirect(process.env.VITE_url_app_run + '/doc.html')
  }

  @ApiOperation({ summary: 'token生成' })
  @Get('token_make')
  token_make() {
    const payload2 = {
      // 基础数据
      username: '15160315110',
      phone: '15160315110',
      id: 1,
      user_id: 1,
      roleIds: [],
      department: [{ id: 2 }],
      iat: dayjs().unix(),
      exp: dayjs().add(9999, 'day').unix(),
      roles: [],
      extra: { checked: true },
      // 额外
      iat_time: dayjs(dayjs().unix() * 1000).format('YYYY-MM-DD HH:mm:ss'),
      exp_time: dayjs(dayjs().add(9999, 'day').unix() * 1000).format('YYYY-MM-DD HH:mm:ss'),
    }
    // console.log(`payload2:`, payload2)
    const my_jwt_service = new JwtService()
    const token = my_jwt_service.sign(payload2, { secret: process.env.VITE_jwt_secret })
    return new Base_Response_Dto(200, 'payload2:目前固定写数据', { VITE_jwt_secret: process.env.VITE_jwt_secret, token, payload2 })
  }

  @ApiOperation({ summary: 'token解析' })
  @Get('token_parse')
  token_parse() {
    const my_jwt_service = new JwtService()
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtrLTNEMiIsInBob25lIjoiMTM1OTk1NDE3MzAiLCJpZCI6Mywicm9sZUlkcyI6WzEsMTJdLCJpYXQiOjE3NjA1NzczNjksImV4cCI6MTc2MDY2Mzc2OX0.NF7mFlMRH0pPXp_sx3_az2ydsa4kMzpC2-BQefYnr-4'
    const payload = my_jwt_service.verify(token, { secret: process.env.VITE_jwt_secret })
    console.log(`解析---payload:`, payload)
    return new Base_Response_Dto(200, 'payload2:目前固定写数据', { VITE_jwt_secret: process.env.VITE_jwt_secret, token, payload })
  }
}
@Module({
  imports: [],
  controllers: [home],
  providers: [],
})
export class home_module {}

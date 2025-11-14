import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common'
import { NestApplication } from '@nestjs/core'

// 拦截过滤器-dto验证
export async function filter_dto(app) {
  let config_dto = new ValidationPipe({
    transform: true,
    whitelist: true,
  })

  app.useGlobalPipes(config_dto)
}

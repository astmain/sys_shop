import { Module, Global, DynamicModule } from '@nestjs/common'
// import { PrismaClient, Prisma } from '@prisma/client'
import { PrismaClient, Prisma } from '@prisma_v1_client'
import _ from 'lodash'

// 虚拟字段扩展
const virtual_field_extension = Prisma.defineExtension({
  result: {},
})

export const prisma_instance = new PrismaClient().$extends(virtual_field_extension)
export const db1 = new PrismaClient().$extends(virtual_field_extension)

interface Opt {
  path: string
}

@Global()
@Module({
  imports: [],
  providers: [{ provide: 'App_prisma_Module', useValue: { App_prisma_Module: prisma_instance } }],
  exports: [{ provide: 'App_prisma_Module', useValue: { baseUrl: '/v1' } }],
})
export class App_prisma_Module {
  static make_path(opt: Opt): DynamicModule {
    // console.log('my_prisma---opt:', opt)
    const result = {
      module: App_prisma_Module,
      providers: [{ provide: 'App_Prisma', useValue: prisma_instance }],
    }
    return result
  }
}

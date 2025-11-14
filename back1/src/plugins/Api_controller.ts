import { applyDecorators } from '@nestjs/common'
import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

const dict_class = new Set()

export function Api_Controller(description?: string) {
  return function <T extends { new (...args: any[]): {} }>(target: T) {
    // 获取类名
    const class_name = target.name
    if (!dict_class.has(class_name)) {
      dict_class.add(class_name)
    } else {
      throw new Error(`类  ${class_name}   已经存在`)
    }

    // 使用applyDecorators组合多个装饰器
    const decorators = applyDecorators(
      Controller(class_name), // 使用类名作为控制器路径
      ApiTags(description || class_name), // 使用描述或类名作为API标签
    )

    // 应用装饰器到目标类
    return decorators(target)
  }
}

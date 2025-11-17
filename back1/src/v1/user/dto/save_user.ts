import { ApiProperty } from '@nestjs/swagger'

import { IsString, IsNotEmpty, IsArray } from 'class-validator'



export class save_user {
    @ApiProperty({ description: '用户ID', example: '1' })
    @IsString()
    @IsNotEmpty()
    user_id: string

    @ApiProperty({ description: '用户姓名', example: '张三' })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ description: '用户电话', example: '15160315110' })
    @IsString()
    @IsNotEmpty()
    phone: string

    @ApiProperty({ description: '用户性别', example: '男' })
    @IsString()
    @IsNotEmpty()
    gender: string

    @ApiProperty({ description: '用户备注', example: '备注' })
    @IsString()
    remark: string

    @ApiProperty({ description: '角色ID', example: ['1', '2', '3'] })
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    role_ids: string[]
}
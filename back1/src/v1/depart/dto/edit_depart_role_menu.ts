import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsIn, IsNotEmpty, IsString } from 'class-validator'
import { Transform } from 'class-transformer'


export class edit_depart_role_menu {
  @ApiProperty({ description: '部门id', example: 'id1' })
  @IsString()
  depart_id?: string

  @ApiProperty({ description: '部门名称', example: '名称' })
  @IsString()
  @IsNotEmpty()
  depart_name: string

  @ApiProperty({ description: '角色名称', example: [] })
  @IsArray()
  role_list: any[]
}

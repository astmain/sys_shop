import { sys_user } from 'tool_typeorm'
// ================================== dto ==================================
import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsNotEmptyObject, IsString, Min, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'
export class login extends PickType(sys_user, ['phone', 'password']) { }
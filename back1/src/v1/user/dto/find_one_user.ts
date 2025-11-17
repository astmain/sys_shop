import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class find_one_user {
    @ApiProperty({ description: '用户ID', example: '1' })
    @IsString()
    @IsNotEmpty()
    user_id: string
}


import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class find_list_user {
    @ApiProperty({ description: '部门ID' ,example:'role_1001' })
    @IsString()
    @IsNotEmpty()
    depart_id: string
}





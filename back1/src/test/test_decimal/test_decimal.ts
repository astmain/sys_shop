import { Controller, Module, Get, Post, Body, Query, Req, Inject } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger'
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger'
import { Api_Get } from '@src/plugins/Api_Get'
import { Api_group } from '@src/plugins/Api_group'

// dto
import { ApiProperty, PickType } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsNotEmptyObject, IsString, Min, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

import Decimal from 'decimal.js' 





// http://127.0.0.1:3002/doc.html
// http://127.0.0.1:3004/test/test_oss?name1=111
@Api_group('test', '测试计算')
export class test_decimal {
    @Api_Get('相加')
    async plus() {

        const res_num0 = 0.1 + 0.2
        // const  res_num1 = new Decimal(0.1)+ new Decimal(0.2)

        let a = new Decimal(0.1);
        let b = new Decimal(0.2);
        console.log(a.plus(b)); // "0.3"




        let res_num2 = a.plus(b)
        let res_num3 = a.plus(b).toNumber()


        return { code: 200, msg: '成功:test', result: { res_num0, res_num2, res_num3 } }
    }
}

@Module({
    controllers: [test_decimal],
    providers: [],
})
export class test_decimal_module { }

import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/response/response';
import { CustomerService } from 'src/services/customer/customer.service';

@ApiTags('Customer')
@Controller('api/customer')
export class CustomerController {
    constructor(private customerService:CustomerService){}

    @ApiOperation(({summary:'Read data product'}))
    @Get("product")
    readProduct():Promise<BaseResponse<any>>{
        return this.customerService.readProduct();
    }
}

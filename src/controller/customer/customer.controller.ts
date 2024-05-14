import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/response/response';
import { CustomerService } from 'src/services/customer/customer.service';

@ApiTags('Customer')
@Controller('api/customer')
export class CustomerController {
    constructor(private customerService:CustomerService){}

    @ApiOperation({summary:'Read data product'})
    @Get("product")
    readProduct(){
        return this.customerService.readProduct();
    }

    @ApiOperation({summary:'Detail Product'})
    @Get('product/detai/:productId')
    detailProduct(@Param('productId') productId: string){
        return this.customerService.detailProduct(productId)
    }
}

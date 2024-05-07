import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Customer')
@Controller('api/customer')
export class CustomerController {

    @Get()
    test(){
        return ;
    }
}

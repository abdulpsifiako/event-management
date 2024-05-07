import { Controller, Get, Request } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Users } from 'src/model/users.model';
import { BaseResponse } from 'src/response/response';
import { UsersService } from 'src/services/users/users.service';


@ApiTags("Users")
@Controller('api/user')
export class UsersController {
    constructor(private userService: UsersService){}

    @ApiOperation({summary:"Detail User", description:'Show the detail user'})
    @ApiBearerAuth()
    @Get('/detail')
    detail(@Request() req:Request): Promise<BaseResponse<Users>>{
        return this.userService.detail(req['x-decodetoken']);
    }
}
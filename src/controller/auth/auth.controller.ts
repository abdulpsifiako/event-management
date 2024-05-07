import { Body, Controller,Post, Request} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUser, RegisterRequest } from 'src/model/register.model';
import { LoginResponse, Users } from 'src/model/users.model';
import { BaseResponse } from 'src/response/response';
import { AuthService } from 'src/services/auth/auth.service';


@ApiTags("Authentication And Authorization")
@Controller('api/user')
export class AuthController {

    constructor (private authServices:AuthService){}
    
    @ApiOperation({ summary: 'Create User', description: 'Sign up new user to app' })
    @Post("/create")
    create(@Body() body: RegisterRequest): Promise<BaseResponse<Users>>{
        return this.authServices.create(body);
    }
    
    @ApiOperation({summary:"Login User", description:'Sign in into app'})
    @Post('/login')
    login(@Body() body: LoginUser):Promise<BaseResponse<LoginResponse>>{
        return this.authServices.login(body);
    }

    @ApiOperation({summary:"Logout from app", description:"Delete login and update history login"})
    @ApiBearerAuth()
    @Post('/logout')
    logout(@Request() req:Request):Promise<BaseResponse<any>>{
        return this.authServices.logout(req['x-decodetoken']);
    }
}

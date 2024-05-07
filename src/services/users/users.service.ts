import { Injectable } from '@nestjs/common';
import { Users } from 'src/model/users.model';
import { BaseResponse } from 'src/response/response';

@Injectable()
export class UsersService {

    async detail(detail):Promise<BaseResponse<Users>>{
        return BaseResponse.ok([detail])
    }

}

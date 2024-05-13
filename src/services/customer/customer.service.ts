import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BaseResponse } from 'src/response/response';

@Injectable()
export class CustomerService {
    constructor(private prisma :PrismaClient){}

    async readProduct():Promise<BaseResponse<any>>{
        const data = await this.prisma.product.findMany({
            include: {
                photos: {
                    select:{
                        id:true,
                        url:true,
                        driveName:true
                    }
                },
                },
        })
        return BaseResponse.ok(data)
    }
}

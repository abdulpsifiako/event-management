import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Products } from 'src/model/product.model';
import { BaseResponse } from 'src/response/response';

@Injectable()
export class OrganizationService {
    constructor(private prisma :PrismaClient){}

    async create(product):Promise<BaseResponse<any>>{
        const data = await this.prisma.product.create({
            data:product
        })
        return BaseResponse.ok([data])
    }

    async uploadPhotos(file, detail):Promise<BaseResponse<any>>{
        return;
    }
}

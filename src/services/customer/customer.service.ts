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

    async detailProduct(productId):Promise<BaseResponse<any>>{
        const check = await this.prisma.product.findFirst({
            where:{
                AND:[
                    {
                        id:parseInt(productId)
                    },
                    {
                        isDeleted:false
                    }
                ]
            }
        })
        
        if(!check){
            return BaseResponse.notFoundResponse()
        }
        const data = await this.prisma.product.findFirstOrThrow({
            where:{
                AND:[
                    {
                        isActive:true
                    },
                    {
                        id:parseInt(productId)
                    },
                    {
                        isDeleted:false
                    }
                ]
            },
            include:{
                photos:{
                    select:{
                        id:true,
                        driveName:true,
                        url:true
                    }
                },
                locations:{
                    include:{
                        photos:{
                            select:{
                                id:true,
                                driveName:true,
                                url:true
                            }
                        },
                        showtimes:{
                            select:{
                                id:true,
                                time:true
                            }
                        }
                    }
                },
                tickets:{
                    select:{
                        id:true,
                        name:true,
                        price:true,
                    }
                }
            }
        })
        return BaseResponse.ok([JSON.parse(JSON.stringify(data, (key, value) => {
            return typeof value === 'bigint' ? value.toString() : value;
        }))])
    }
}

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { BaseResponse } from 'src/response/response';
import { GoogleDriveServices } from '../drive/drive.service';

@Injectable()
export class OrganizationService {
    constructor(private prisma :PrismaClient, private googleDrive:GoogleDriveServices){}

    async create(product):Promise<BaseResponse<any>>{
        const data = await this.prisma.product.create({
            data:product
        })
        return BaseResponse.ok([data])
    }

    async uploadPhotos(productId, file, detail):Promise<BaseResponse<any>>{
        if(!detail || detail.role !== "Organization"){
            BaseResponse.unauthorizedResponse();
        }
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
        const uploadPhoto = await this.googleDrive.updatePhoto(file) as UploadedPhoto;
        
        const result = await this.prisma.photos.create({
            data:{
                url:uploadPhoto.image,
                driveName:uploadPhoto.driveName,
                product:{
                    connect:{
                        id:parseInt(productId)
                    }
                }
            }
        })
        return BaseResponse.ok([result]);
    }
    async addLocation(productId, location):Promise<BaseResponse<any>>{
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
        const data = await this.prisma.locations.create({
            data: {
                name: location.name,
                address: location.address,
                description: location.description,
                product: { connect: { id: parseInt(productId) } }
            }
        })
        return BaseResponse.ok(data)
    }

    async addPhotosLocation(file, location):Promise<BaseResponse<any>>{
        const check= await this.prisma.locations.findFirst({
            where:{
                id:parseInt(location)
            }
        })

        if(!check){
            return BaseResponse.notFoundResponse()
        }

        const uploadPhoto = await this.googleDrive.updatePhoto(file) as UploadedPhoto
        const result = await this.prisma.photos.create({
            data:{
                url:uploadPhoto.image,
                driveName:uploadPhoto.driveName,
                locations:{
                    connect:{
                        id:parseInt(location)
                    }
                }
            }
        })
        return BaseResponse.ok([result])
    }

    async addShowtimeLocation(location, payload:{time:string}):Promise<BaseResponse<any>>{

        const check= await this.prisma.locations.findFirst({
            where:{
                id:parseInt(location)
            }
        })
        
        if(!check){
            return BaseResponse.notFoundResponse()
        }


        const result = await this.prisma.showTimes.create({
            data:{
                time:new Date(`1970-01-01T${payload.time}`),
                locationsId:parseInt(location)
            }
        })
        return BaseResponse.ok([result])
    }

    async addTicketProdutc(productId, payload:{name:string, price:number}):Promise<BaseResponse<any>>{
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
        await this.prisma.ticket.create({
            data:{
                name:payload.name,
                price:payload.price,
                productId:parseInt(productId)
            }
        })
        return BaseResponse.ok([payload])
    }
}

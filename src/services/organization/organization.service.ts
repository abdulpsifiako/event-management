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
}

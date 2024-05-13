import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { parse } from 'path';
import { Users } from 'src/model/users.model';
import { BaseResponse } from 'src/response/response';
import { GoogleDriveServices } from '../drive/drive.service';

@Injectable()
export class UsersService {

    constructor( private prisma :PrismaClient, private googleDrive : GoogleDriveServices){}

    async detail(detail):Promise<BaseResponse<Users>>{
        return BaseResponse.ok([detail])
    }
    async patch(id, payload):Promise<BaseResponse<Users>>{
        const save = await this.prisma.users.update({
            where:{
                id:id
            },
            data:{
                name:payload.name,
                gender:payload.gender,
                phone:payload.phone,
                profession:payload.profession,
                nationality:payload.nationality,
                dateofbirth:new Date(payload.dateofbirth)
            }
        })
        const result :Users={
            id:id,
            name:save.name,
            email:save.email,
            username:save.username,
            gender:save.gender,
            dateofbirth:new Intl.DateTimeFormat('en-Us', 
            { day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone
            }).format(new Date(save.dateofbirth)),
            profession:save.profession,
            phone:save.phone,
            nationality:save.nationality,
            image:save.image
        }as Users
        return BaseResponse.ok([result])
    }

    async updatePhotos(file, detail):Promise<BaseResponse<any>>{
        const uploadPhoto = await this.googleDrive.updatePhoto(file)
        await this.prisma.users.update({
            where:{
                id:detail.id
            },
            data:uploadPhoto
        })
        return BaseResponse.ok([uploadPhoto])
    }
}

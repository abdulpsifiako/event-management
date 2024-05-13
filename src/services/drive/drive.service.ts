import { Injectable } from '@nestjs/common';
import { GoogleDrive } from 'src/config/drive.config';
import { Buffer } from 'buffer';
import { Readable } from 'stream';
import { BaseResponse } from 'src/response/response';
import { drive_v3 } from 'googleapis';
import *  as crypto from 'crypto'
import { PrismaClient } from '@prisma/client';

@Injectable()
export class GoogleDriveServices {
  private drive: drive_v3.Drive;
  constructor(private driveGoogle : GoogleDrive, private prisma :PrismaClient){
    this.drive= this.driveGoogle.auth()
  }

  async updatePhoto(file):Promise<BaseResponse<any>>{
    try {
      const { buffer} = file
      const fileBuffer = Buffer.from(buffer)
      const media = {
        mimeType: file.mimetype,
        body: Readable.from([fileBuffer]),
      };
      const name = crypto.randomBytes(10).toString('base64')
      const result = await this.drive.files.create({
        requestBody: {
          name,
          mimeType: file.mimetype,
          parents: ['1yk0aBQaEXv97e61Nmc_zbb2031OHZ-1C'],
        },
        media: media,
        fields: 'id',
      })
      return {image:result.data.id, driveName:name}
    } catch (error) {
      return BaseResponse.errorResponse(error.message)
    }
  }
}

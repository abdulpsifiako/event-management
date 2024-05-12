import { Injectable } from '@nestjs/common';
import { GoogleDrive } from 'src/config/drive.config';
import { Buffer } from 'buffer';
import { Readable } from 'stream';
import { BaseResponse } from 'src/response/response';
import { drive_v3 } from 'googleapis';
import *  as crypto from 'crypto'

@Injectable()
export class GoogleDriveServices {
  private drive: drive_v3.Drive;
  constructor(private driveGoogle : GoogleDrive){
    this.drive= this.driveGoogle.auth()
  }

  async uploadFile(file):Promise<BaseResponse<any>>{
    try {
      const {originalname, buffer} = file
      const fileBuffer = Buffer.from(buffer)
      const media = {
        mimeType: file.mimetype,
        body: Readable.from([fileBuffer]),
      };

      const result = await this.drive.files.create({
        requestBody: {
          name: crypto.randomBytes(10).toString('hex'),
          mimeType: file.mimetype,
          parents: ['1yk0aBQaEXv97e61Nmc_zbb2031OHZ-1C'],
        },
        media: media,
        fields: 'id',
      })

      return BaseResponse.ok(result)
    } catch (error) {
      return BaseResponse.errorResponse(error.message)
    }
  }
}

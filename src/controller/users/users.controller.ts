import { Body, Controller, Get, Param, Patch, Post, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Users } from 'src/model/users.model';
import { BaseResponse } from 'src/response/response';
import { UsersService } from 'src/services/users/users.service';


@ApiTags("Users")
@Controller('api/user')
export class UsersController {
    constructor(private userService: UsersService){}

    @ApiOperation({summary:"Detail User"})
    @ApiBearerAuth()
    @Get('/detail')
    detail(@Request() req:Request): Promise<BaseResponse<Users>>{
        return this.userService.detail(req['x-decodetoken']);
    }

    @ApiOperation({summary:"Edit profile users"})
    @ApiBearerAuth()
    @Patch('/:id')
    patch(@Param('id') id : string, @Body() body:Users):Promise<BaseResponse<any>>{
        return this.userService.patch(id, body);
    }

    @ApiOperation({summary:"Update photo users"})
    @Post("upload")
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        required: true,
        schema: {
          type: "object",
          properties: {
            file: {
              type: "string",
              format: "binary",
            }
          }
        }
      })
      async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req:Request):Promise<BaseResponse<any>> {
        return this.userService.updatePhotos(file, req['x-decodetoken']);
    }
}
import { Controller ,Post, Body, UseInterceptors, UploadedFile} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Products } from 'src/model/product.model';
import { BaseResponse } from 'src/response/response';
import { OrganizationService } from 'src/services/organization/organization.service';

@ApiTags("Organization")
@Controller('api/organization')
export class OrganizationController {
    constructor(private organization:OrganizationService){}

    @Post('/product/create')
    @ApiOperation({summary:'Create product'})
    @ApiBearerAuth()
    create(@Body() product:Products):Promise<BaseResponse<Products>>{
        return this.organization.create(product);
    }

    @ApiOperation({summary:"Update photo product"})
    @Post("/upload")
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
    uploadPhotos(@UploadedFile() file: Express.Multer.File):Promise<BaseResponse<any>>{
        console.log(file)
        return;
    }
}

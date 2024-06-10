import { Controller ,Post, Body, UseInterceptors, UploadedFile, Request, Param} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Products } from 'src/model/product.model';
import { OrganizationService } from 'src/services/organization/organization.service';
import { Locations } from 'src/model/location.model';
import { ShowTimes } from 'src/model/showtime.model';
import { Ticket } from 'src/model/ticket.model';

@ApiTags("Organization")
@Controller('api/organization')
export class OrganizationController {
    constructor(private organization:OrganizationService){}

    @Post('/product/create')
    @ApiOperation({summary:'Create product'})
    @ApiBearerAuth()
    create(@Body() product:Products){
        return this.organization.create(product);
    }

    @ApiOperation({summary:"Update photo product"})
    @Post("/upload/:productId")
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
    uploadPhotos(@Param("productId") productId :string,@UploadedFile() file: Express.Multer.File, @Request() req:Request){
        return this.organization.uploadPhotos(productId, file, req['x-decodetoken'])
    }

    @ApiOperation({summary:'Add location to product'})
    @Post("/product/location/:productId")
    @ApiBearerAuth()
    addLocation(@Param('productId')productId:string , @Body() payload:Locations){
      return this.organization.addLocation(productId, payload)
    }

    @ApiOperation({summary:'Add photo to location'})
    @Post('/product/:location/photos')
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
    uploadPhotoLocations(@UploadedFile() file: Express.Multer.File, @Param('location') location:number){
      return this.organization.addPhotosLocation(file, location)
    }

    @ApiOperation({summary:'Add show times to some locations'})
    @Post('product/:location/showtimes')
    @ApiBearerAuth()
    addShowtimes(@Body() payload:ShowTimes, @Param('location') location:string){
      return this.organization.addShowtimeLocation(location, payload)
    }

    @ApiOperation({summary:'Add show times to some locations'})
    @Post('product/:productId/ticket')
    @ApiBearerAuth()
    addTicket(@Body() payload:Ticket, @Param('productId') productId:string){
      return this.organization.addTicketProdutc(productId, payload)
    }
}

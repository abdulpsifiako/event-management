import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controller/users/users.controller';
import { PrismaClient } from '@prisma/client';
import { AuthController } from './controller/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { OrganizationController } from './controller/organization/organization.controller';
import { EoController } from './controller/eo/eo.controller';
import { VmController } from './controller/vm/vm.controller';
import { CustomerController } from './controller/customer/customer.controller';
import { CustomerService } from './services/customer/customer.service';
import { OrganizationService } from './services/organization/organization.service';
import { EoService } from './services/eo/eo.service';
import { VmService } from './services/vm/vm.service';
import { GoogleDriveServices } from './services/drive/drive.service';
import { GoogleDrive } from './config/drive.config';

@Module({
  imports: [],
  providers:[UsersService, PrismaClient, AuthService, CustomerService, OrganizationService, EoService, VmService, GoogleDriveServices, GoogleDrive],
  controllers: [UsersController, AuthController, OrganizationController, EoController, VmController, CustomerController]
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(
    {path:'api/user/detail', method:RequestMethod.GET},
    {path:'api/user/:id', method:RequestMethod.PATCH},
    {path:'api/user/logout', method:RequestMethod.POST},
    {path:'api/user/upload', method:RequestMethod.POST},
    {path:'api/organization/product/create', method:RequestMethod.POST},
    {path:'api/organization/upload/:productId', method:RequestMethod.POST},
    {path:'api/organization/product/location/:productId', method:RequestMethod.POST},
    {path:'api/organization/product/:location/photos', method:RequestMethod.POST},
    {path:'api/organization/product/:location/showtimes', method:RequestMethod.POST},
    {path:'api/organization/product/:productId/ticket', method:RequestMethod.POST}
    );
  }
}

import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv'
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Even Management By Psifiako')
    .setDescription('event management untuk APIs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  dotenv.config();
  app.enableCors()
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('swagger-ui', app, document);;
  await app.listen(3001);
}
bootstrap();
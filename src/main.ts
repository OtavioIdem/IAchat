import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParse from 'cookie-parser';
import * as session from 'express-session';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe())

  app.use(cookieParse())
  app.use(
    session({
      name: '',
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 3600000
      }
    })
  )

  app.enableCors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    allowedHeaders: 'Content-type, Accept, Authorization',
    credentials: true
  })

  const swagger = new DocumentBuilder()
  .setTitle('API chatbot - Homologação')
  .setDescription('Ambiente de teste para chatbot')
  .setVersion(process.env.VERSION ?? '0.0.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'Bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Insira o token JWT',
      in: 'header'
    },
    'JWT-auth'
  )
  .build();

  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('swagger/v1', app, document)

  await app.listen(process.env.PORT ?? 3000);
  console.log(`link servidor: localhost:${process.env.PORT ?? 3000}/swagger/v1`)
}
bootstrap();

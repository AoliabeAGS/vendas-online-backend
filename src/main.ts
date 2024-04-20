import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: true, // ou um array com os domínios permitidos ['http://frontend.com', 'https://frontend.com']
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  app.enableCors(corsOptions);
  const config = new DocumentBuilder()
    .setTitle('User example')
    .setDescription('The user API description')
    .setVersion('1.0')
    .addTag('user')
    .addTag('auth')
    .addTag('address')
    .addTag('state')
    .addTag('city')
    .addTag('category')
    .addTag('product')
    .addTag('cart')
    .addTag('order')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();

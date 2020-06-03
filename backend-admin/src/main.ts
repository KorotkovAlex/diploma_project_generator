import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { UI } from 'bull-board';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('GenMobApi')
    .setDescription('Api of the GenMob project')
    .setVersion('1.0')
    .addTag('GenMobApi')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use('/admin/queues', UI);

  await app.listen(3000);
}
bootstrap();

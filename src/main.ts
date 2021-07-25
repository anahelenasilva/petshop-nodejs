import { NestFactory } from '@nestjs/core'
import * as compression from 'compression'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from 'src/app.module'
import { CustomLogger } from './shared/services/logger.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger()
  })

  app.use(compression())

  //Open API
  const options = new DocumentBuilder()
    .setTitle('Petshop API')
    .setDescription('API Petshop curso 7180 Balta.io')
    .setVersion('1.0.0')
    .addTag('Petsop')
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3000)
}

bootstrap()

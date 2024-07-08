import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {

  const logger = new Logger('MainGateway');
  const reset = '\x1b[33m'; //Pone en color tierra el N° del Puerto donde la aplicacion Arranca.

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  await app.listen(envs.port);

  logger.log(`Cateway running on port: ${reset}${envs.port}`);
}
bootstrap();

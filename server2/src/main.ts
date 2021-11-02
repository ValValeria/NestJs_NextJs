import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import * as passport from 'passport';
import { NotFoundFilter } from './not-found.filter';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new NotFoundFilter());
  app.use(
    session({
      secret: 'you secret key',
      saveUninitialized: true,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.json());

  await app.listen(8080);
}

bootstrap();

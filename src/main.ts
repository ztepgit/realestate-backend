import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import { Pool } from 'pg';git

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const isProd = process.env.NODE_ENV === 'production';

  // trust proxy (จำเป็นเมื่ออยู่หลัง Railway / Vercel)
  const server = app.getHttpAdapter().getInstance();
  server.set('trust proxy', 1);

  if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET is not defined');
  }

  const dbPool = new Pool({
    connectionString: process.env.DIRECT_URL,
  });

  const PGStore = pgSession(session);

  const allowedOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',')
    : ['http://localhost:3000'];

  app.enableCors({
    origin:'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: '*',
  });


  app.use(
    session({
      store: new PGStore({
        pool: dbPool,
        tableName: 'session',
        createTableIfMissing: true,
      }),
      name: 'connect.sid',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? 'none' : 'lax',
      },
    }),
  );

  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`Server running on ${isProd ? 'production' : 'local'} port ${port}`);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});

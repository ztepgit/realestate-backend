import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import pgSession from 'connect-pg-simple'; // 1. import ตัวนี้มา
import { Pool } from 'pg'; // 2. import pg pool

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const isProd = process.env.NODE_ENV === 'production';

  // 3. เตรียม Pool สำหรับ connect Database
  const dbPool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const PGStore = pgSession(session); // 4. สร้าง Store

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.set('trust proxy', 1);

  


  app.use(
    session({
      // 5. เพิ่มบรรทัดนี้: บอกให้เก็บใน Database แทน RAM
      store: new PGStore({
        pool: dbPool,
        tableName: 'session', // ชื่อตารางที่เราเพิ่งสร้าง
        createTableIfMissing: true, // สร้างตารางให้อัตโนมัติถ้ายังไม่มี
      }),
      name: 'connect.sid',
      secret: process.env.SESSION_SECRET || 'my-secret-key',
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: isProd,                     //  prod = true
        sameSite: isProd ? 'none' : 'lax',  //  cross-domain

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

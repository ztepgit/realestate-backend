import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import pgSession from 'connect-pg-simple'; // 1. import ตัวนี้มา
import { Pool } from 'pg'; // 2. import pg pool

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 3. เตรียม Pool สำหรับ connect Database
  // เอาค่า connectionString มาจาก .env ของคุณ
  const dbPool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const PGStore = pgSession(session); // 4. สร้าง Store

  app.enableCors({
    origin:'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.use(
    session({
      // ✅ 5. เพิ่มบรรทัดนี้: บอกให้เก็บใน Database แทน RAM
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
        secure: false,
        sameSite: 'lax', // OK ถ้า origin เป๊ะ
      },
    }),
  );

  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});

import { NestFactory } from '@nestjs/core';
//import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // 2. ✅ ตั้งค่า Session และเวลาหมดอายุ
  app.use(
    session({
      secret: 'my-secret-key', // เปลี่ยนเป็นรหัสลับของคุณ
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 👈 7 วัน (หน่วยเป็น Millisecond)
        httpOnly: true, // ปลอดภัย JS แอบอ่านไม่ได้
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

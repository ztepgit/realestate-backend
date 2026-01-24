import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { PrismaModule } from '../prisma/prisma.module'; // <--- 1. ต้อง import ไฟล์นี้

@Module({
  imports: [PrismaModule], // <--- 2. ต้องใส่บรรทัดนี้ ไม่งั้น Service จะพังและ Server จะดับ
  controllers: [PropertiesController],
  providers: [PropertiesService],
})
export class PropertiesModule {}
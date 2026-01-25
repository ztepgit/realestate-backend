import { Module } from '@nestjs/common';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // ต้องใส่บรรทัดนี้ ไม่งั้น Service จะพังและ Server จะดับ
  controllers: [PropertiesController],
  providers: [PropertiesService],
})
export class PropertiesModule {}

import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  
  
  BadRequestException,
  
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';


@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  // ✅ 1. เพิ่ม endpoint นี้ไว้บนสุด! (สำคัญมากต้องอยู่ก่อน :userId)
  @Get('my-favorites') 
  async getMyFavorites(@Req() req: any) {
    // ดึง User ID จาก Session (Login อยู่ไหม?)
    const userId = req.session?.user?.id;

  if (!userId) {
    throw new UnauthorizedException('Please login');
  }

  return this.favoritesService.findByUser(Number(userId));
}

  @Post()
  async create(@Req() req: any, @Body() body: any) { // ใช้ any ชั่วคราวเพื่อให้รันผ่าน
    // 1.ดึง User ID จาก Session (ปลอดภัยกว่า)
    const userId = req.session?.user?.id; 
    if (!userId) {
      throw new UnauthorizedException('Please login first');
    }

    // 2. Validate Body (เอาแค่ propertyId)
    // หมายเหตุ: อาจต้องแก้ Zod Schema ให้ userId เป็น optional หรือไม่ต้องส่งมา
    if (!body.propertyId) {
        throw new BadRequestException('Property ID is required');
    }

    return this.favoritesService.create({ 
      userId: Number(userId), 
      propertyId: Number(body.propertyId) 
    });
  }

  

  @Delete()
  async remove(@Req() req: any, @Body() body: any) {
    const userId = req.session?.user?.id;
    if (!userId) {
      throw new UnauthorizedException('Please login first');
    }

    if (!body.propertyId) {
        throw new BadRequestException('Property ID is required');
    }

    return this.favoritesService.remove({ 
        userId: Number(userId), 
        propertyId: Number(body.propertyId) 
    });
  }
}
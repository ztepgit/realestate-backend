import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFavoriteDto, DeleteFavoriteDto } from './dto/favorite.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFavoriteDto) {
    // 1. เช็คว่ามี Property นี้จริงไหม
    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    // 2. เช็คว่าเคย Favorite ไปแล้วหรือยัง
    const existing = await this.prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId: dto.userId,
          propertyId: dto.propertyId,
        },
      },
    });

    // 3. ถ้ามีแล้ว "ให้ return ตัวเดิมไปเลย" (อย่า throw error)
    // Frontend จะได้เข้าใจว่า Save สำเร็จแล้ว ไม่ต้องเด้งกลับ
    if (existing) {
      return existing;
    }

    // 4. ถ้ายังไม่มี ค่อยสร้างใหม่
    return this.prisma.favorite.create({
      data: {
        userId: dto.userId,
        propertyId: dto.propertyId,
      },
      include: {
        property: true, // ถ้าอยากได้ข้อมูลบ้านกลับไปด้วย
      },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: {
        property: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(dto: DeleteFavoriteDto) {
    // ใช้ try-catch หรือ deleteMany เพื่อป้องกัน Error "Record not found"
    // ถ้า User รัวปุ่ม Delete แล้ว Record หายไปแล้ว ก็ให้ถือว่าสำเร็จ
    try {
      await this.prisma.favorite.delete({
        where: {
          userId_propertyId: {
            userId: dto.userId,
            propertyId: dto.propertyId,
          },
        },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code !== 'P2025'
      ) {
        throw error;
      }
    }

    return { message: 'Favorite removed successfully' };
  }
}

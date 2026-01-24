import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFavoriteDto, DeleteFavoriteDto } from './dto/favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateFavoriteDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const property = await this.prisma.property.findUnique({
      where: { id: dto.propertyId },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    const existing = await this.prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId: dto.userId,
          propertyId: dto.propertyId,
        },
      },
    });

    if (existing) {
      throw new ConflictException('Property already favorited');
    }

    return this.prisma.favorite.create({
      data: {
        userId: dto.userId,
        propertyId: dto.propertyId,
      },
      include: {
        property: true,
      },
    });
  }

  async findByUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.favorite.findMany({
      where: { userId },
      include: {
        property: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(dto: DeleteFavoriteDto) {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId: dto.userId,
          propertyId: dto.propertyId,
        },
      },
    });

    if (!favorite) {
      throw new NotFoundException('Favorite not found');
    }

    await this.prisma.favorite.delete({
      where: {
        userId_propertyId: {
          userId: dto.userId,
          propertyId: dto.propertyId,
        },
      },
    });

    return { message: 'Favorite removed successfully' };
  }
}

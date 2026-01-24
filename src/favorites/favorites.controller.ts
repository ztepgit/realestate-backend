import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteSchema, DeleteFavoriteSchema } from './dto/favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Post()
  async create(@Body() body: unknown) {
    const result = CreateFavoriteSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(result.error.issues[0].message);
    }

    return this.favoritesService.create(result.data);
  }

  @Get(':userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.favoritesService.findByUser(userId);
  }

  @Delete()
  async remove(@Body() body: unknown) {
    const result = DeleteFavoriteSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(result.error.issues[0].message);
    }

    return this.favoritesService.remove(result.data);
  }
}

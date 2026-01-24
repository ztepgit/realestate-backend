import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PropertiesModule } from './properties/properties.module';
import { FavoritesModule } from './favorites/favorites.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule, PropertiesModule, FavoritesModule],
})
export class AppModule {}

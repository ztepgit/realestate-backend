"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let FavoritesService = class FavoritesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const property = await this.prisma.property.findUnique({
            where: { id: dto.propertyId },
        });
        if (!property) {
            throw new common_1.NotFoundException('Property not found');
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
            return existing;
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
    async findByUser(userId) {
        return this.prisma.favorite.findMany({
            where: { userId },
            include: {
                property: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async remove(dto) {
        try {
            await this.prisma.favorite.delete({
                where: {
                    userId_propertyId: {
                        userId: dto.userId,
                        propertyId: dto.propertyId,
                    },
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                error.code !== 'P2025') {
                throw error;
            }
        }
        return { message: 'Favorite removed successfully' };
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map
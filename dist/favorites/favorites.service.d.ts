import { PrismaService } from '../prisma/prisma.service';
import { CreateFavoriteDto, DeleteFavoriteDto } from './dto/favorite.dto';
export declare class FavoritesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateFavoriteDto): Promise<{
        property: {
            id: number;
            createdAt: Date;
            title: string;
            location: string;
            price: number;
            description: string;
            image: string;
            agentName: string;
            agentCompany: string;
            agentPhone: string;
            agentAvatar: string;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        propertyId: number;
    }>;
    findByUser(userId: number): Promise<({
        property: {
            id: number;
            createdAt: Date;
            title: string;
            location: string;
            price: number;
            description: string;
            image: string;
            agentName: string;
            agentCompany: string;
            agentPhone: string;
            agentAvatar: string;
        };
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        propertyId: number;
    })[]>;
    remove(dto: DeleteFavoriteDto): Promise<{
        message: string;
    }>;
}

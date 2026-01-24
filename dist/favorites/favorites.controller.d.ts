import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private favoritesService;
    constructor(favoritesService: FavoritesService);
    create(body: unknown): Promise<{
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
    remove(body: unknown): Promise<{
        message: string;
    }>;
}

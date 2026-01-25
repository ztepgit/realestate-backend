import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private favoritesService;
    constructor(favoritesService: FavoritesService);
    getMyFavorites(req: any): Promise<({
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
    create(req: any, body: any): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        propertyId: number;
    }>;
    remove(req: any, body: any): Promise<{
        message: string;
    }>;
}

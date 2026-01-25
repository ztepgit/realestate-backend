import { PropertiesService } from './properties.service';
export declare class PropertiesController {
    private propertiesService;
    constructor(propertiesService: PropertiesService);
    findAll(): Promise<{
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
    }[]>;
    findOne(id: number): Promise<{
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
    } | null>;
}

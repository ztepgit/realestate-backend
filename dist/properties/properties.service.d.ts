import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
export declare class PropertiesService implements OnModuleInit {
    private prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    seedProperties(): Promise<void>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        location: string;
        price: number;
        description: string;
        image: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        title: string;
        location: string;
        price: number;
        description: string;
        image: string;
    } | null>;
}

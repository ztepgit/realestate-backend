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
exports.PropertiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PropertiesService = class PropertiesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        await this.seedProperties();
    }
    async seedProperties() {
        const mockProperties = [
            {
                title: 'Modern Downtown Apartment',
                location: 'New York, NY',
                price: 850000,
                description: 'Luxurious 2BR apartment with city views',
                image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
                agentName: 'Sarah Jenkins',
                agentCompany: 'Urban Living Realty',
                agentPhone: '(212) 555-0123',
                agentAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
            },
            {
                title: 'Beachfront Villa',
                location: 'Miami, FL',
                price: 1200000,
                description: 'Stunning oceanfront property with private beach',
                image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
                agentName: 'Michael Chen',
                agentCompany: 'Coastal Dreams Real Estate',
                agentPhone: '(305) 555-0199',
                agentAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
            },
            {
                title: 'Suburban Family Home',
                location: 'Austin, TX',
                price: 450000,
                description: 'Spacious 4BR home with large backyard',
                image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
                agentName: 'Emily Rodriguez',
                agentCompany: 'Family First Properties',
                agentPhone: '(512) 555-0144',
                agentAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
            },
            {
                title: 'Mountain Retreat',
                location: 'Denver, CO',
                price: 675000,
                description: 'Cozy cabin with mountain views',
                image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800',
                agentName: 'David Wilson',
                agentCompany: 'Peak Performance Realty',
                agentPhone: '(303) 555-0177',
                agentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
            },
            {
                title: 'Urban Loft',
                location: 'San Francisco, CA',
                price: 950000,
                description: 'Industrial-style loft in tech district',
                image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
                agentName: 'Jessica Kim',
                agentCompany: 'Tech City Homes',
                agentPhone: '(415) 555-0188',
                agentAvatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
            },
            {
                title: 'Historic Townhouse',
                location: 'Boston, MA',
                price: 775000,
                description: 'Charming 3BR in historic neighborhood',
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
                agentName: 'Robert Taylor',
                agentCompany: 'Heritage Homes',
                agentPhone: '(617) 555-0155',
                agentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
            },
            {
                title: 'Modern Luxury Villa',
                location: 'Los Angeles, CA',
                price: 2500000,
                description: 'Contemporary home with pool and floor-to-ceiling windows',
                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
                agentName: 'James Anderson',
                agentCompany: 'Elite Estates LA',
                agentPhone: '(310) 555-0122',
                agentAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
            },
            {
                title: 'Charming Cottage',
                location: 'Nashville, TN',
                price: 350000,
                description: 'Cozy blue cottage with white picket fence and garden',
                image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=800',
                agentName: 'Linda Martinez',
                agentCompany: 'Southern Charm Realty',
                agentPhone: '(615) 555-0133',
                agentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
            },
            {
                title: 'Classic Family Estate',
                location: 'Chicago, IL',
                price: 1100000,
                description: 'Grand colonial style home with manicured lawn',
                image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
                agentName: 'William Thompson',
                agentCompany: 'Prestige Properties',
                agentPhone: '(312) 555-0166',
                agentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
            },
        ];
        for (const prop of mockProperties) {
            const existing = await this.prisma.property.findFirst({
                where: { title: prop.title },
            });
            if (!existing) {
                await this.prisma.property.create({
                    data: prop,
                });
                console.log(`Seeded: ${prop.title}`);
            }
        }
        console.log('Seeding check complete (No duplicates created).');
    }
    async findAll() {
        return this.prisma.property.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        return this.prisma.property.findUnique({
            where: { id },
        });
    }
};
exports.PropertiesService = PropertiesService;
exports.PropertiesService = PropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PropertiesService);
//# sourceMappingURL=properties.service.js.map
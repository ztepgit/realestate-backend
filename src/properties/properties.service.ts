import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PropertiesService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    const count = await this.prisma.property.count();

    if (count === 0) {
      await this.seedProperties();
    }
  }

  async seedProperties() {
    const mockProperties = [
      {
        title: 'Modern Downtown Apartment',
        location: 'New York, NY',
        price: 850000,
        description: 'Luxurious 2BR apartment with city views',
        image:
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500',
      },
      {
        title: 'Beachfront Villa',
        location: 'Miami, FL',
        price: 1200000,
        description: 'Stunning oceanfront property with private beach',
        image:
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500',
      },
      {
        title: 'Suburban Family Home',
        location: 'Austin, TX',
        price: 450000,
        description: 'Spacious 4BR home with large backyard',
        image:
          'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500',
      },
      {
        title: 'Mountain Retreat',
        location: 'Denver, CO',
        price: 675000,
        description: 'Cozy cabin with mountain views',
        image:
          'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=500',
      },
      {
        title: 'Urban Loft',
        location: 'San Francisco, CA',
        price: 950000,
        description: 'Industrial-style loft in tech district',
        image:
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500',
      },
      {
        title: 'Historic Townhouse',
        location: 'Boston, MA',
        price: 775000,
        description: 'Charming 3BR in historic neighborhood',
        image:
          'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500',
      },
    ];

    await this.prisma.property.createMany({
      data: mockProperties,
    });
  }

  async findAll() {
    return this.prisma.property.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.property.findUnique({
      where: { id },
    });
  }
}

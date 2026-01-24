import { PrismaService } from '../prisma/prisma.service';
import { SignupDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    signup(dto: SignupDto): Promise<{
        email: string;
        id: number;
        createdAt: Date;
    }>;
    login(dto: LoginDto): Promise<{
        id: number;
        email: string;
        createdAt: Date;
    }>;
}

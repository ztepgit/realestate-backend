import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(body: unknown): Promise<{
        email: string;
        id: number;
        createdAt: Date;
    }>;
    login(body: unknown, req: Request): Promise<{
        id: number;
        email: string;
        createdAt: Date;
    }>;
    logout(req: any, res: Response): Promise<unknown>;
}

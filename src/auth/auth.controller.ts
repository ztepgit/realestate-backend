import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignupSchema, LoginSchema } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  async signup(@Body() body: unknown) {
    const result = SignupSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.issues[0].message);
    }
    return this.authService.signup(result.data);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: unknown,
    @Req() req: Request,
  ) {
    const result = LoginSchema.safeParse(body);
    if (!result.success) {
      throw new BadRequestException(result.error.issues[0].message);
    }

    const user = await this.authService.login(result.data);

    req.session.user = {
      id: user.id,
      email: user.email,
    };

    return user;
  }


  @Post('logout')
  @HttpCode(HttpStatus.OK)
  // passthrough: true ช่วยให้เรายัง return JSON แบบปกติได้ โดยไม่ต้องใช้ res.send() เอง
  logout(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err: any) => {
        if (err) {
          console.error('Session destruction error:', err);
          return reject(new BadRequestException('Logout failed'));
        }

        // 3. สั่งลบ Cookie ฝั่ง Browser ทิ้งตอน Logout
        res.clearCookie('connect.sid');

        resolve({ message: 'Logged out successfully' });
      });
    });
  }
}
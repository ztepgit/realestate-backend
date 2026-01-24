import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupSchema, LoginSchema } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
  async login(@Body() body: unknown) {
    const result = LoginSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(result.error.issues[0].message);
    }

    return this.authService.login(result.data);
  }
}

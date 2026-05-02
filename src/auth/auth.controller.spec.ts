import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Rol } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: { nombre: string; email: string; password: string; rol?: Rol }) {
    return this.authService.register(body.nombre, body.email, body.password, body.rol);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // REGISTER (CREATE)
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // LOGIN
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // READ ALL USERS
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  // READ ONE USER
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.authService.findOne(id);
  }

  // UPDATE USER
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.authService.update(id, dto);
  }

  // DELETE USER
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.authService.remove(id);
  }
}
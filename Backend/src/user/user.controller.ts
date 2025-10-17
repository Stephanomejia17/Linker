import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('registro')
  async register(@Body() dto: UserDto) {
    return this.userService.createUser(dto);
  }  

  @Post('login')
  async login(@Body() dto: UserDto) {
    return this.userService.loginUser(dto);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreatePostulanteDto } from './dto/create-postulante.dto';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('postulante')
  createPostulante(@Body() CreatePostulanteDto: CreatePostulanteDto) {
    return this.userService.createPostulante(CreatePostulanteDto);
  }

  @Post('empresa')
  createEmpresa(@Body() CreateEmpresaDto: CreateEmpresaDto) {
    return this.userService.createEmpresa(CreateEmpresaDto);
  }

  @Get('postulantes')
  findAllPostulantes() {
    return this.userService.findAllPostulantes();
  }

  @Get('empresas')
  findAllEmpresas() {
    return this.userService.findAllEmpresas();
  }
}

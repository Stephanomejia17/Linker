import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostulanteService } from './postulante.service';
import { CreatePostulanteDto } from './dto/create-postulante.dto';
import { UpdatePostulanteDto } from './dto/update-postulante.dto';

@Controller('postulante')
export class PostulanteController {
  constructor(private readonly postulanteService: PostulanteService) {}

  @Post('registro')
  async register(@Body() dto: CreatePostulanteDto) {
    return this.postulanteService.createPostulante(dto);
  }

  @Get()
  findAll() {
    return this.postulanteService.findAll();
  }

  @Get('postulantes/:id')
  async getPostulante(@Param('id') empresaId: string) {
    return this.postulanteService.getPostulantes(empresaId);
  }

}

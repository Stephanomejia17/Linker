import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstudiosService } from './estudios.service';
import { CreateEstudioDto } from './dto/create-estudio.dto';
import { UpdateEstudioDto } from './dto/update-estudio.dto';

@Controller('estudios')
export class EstudiosController {
  constructor(private readonly estudiosService: EstudiosService) {}

  @Post()
  create(@Body() createEstudioDto: CreateEstudioDto) {
    return this.estudiosService.create(createEstudioDto);
  }

  @Get()
  findAll() {
    return this.estudiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudiosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEstudioDto: UpdateEstudioDto) {
    return this.estudiosService.update(+id, updateEstudioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudiosService.remove(+id);
  }
}

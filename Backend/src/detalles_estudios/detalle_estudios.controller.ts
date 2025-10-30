import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleEstudiosService } from './detalle_estudios.service';
import { CreateDetalleEstudioDto } from './dto/create-detalle_estudio.dto';
import { UpdateDetalleEstudioDto } from './dto/update-detalle_estudio.dto';

@Controller('detalle-estudios')
export class DetalleEstudiosController {
  constructor(private readonly detalleEstudiosService: DetalleEstudiosService) {}

  @Post()
  create(@Body() createDetalleEstudioDto: CreateDetalleEstudioDto) {
    return this.detalleEstudiosService.create(createDetalleEstudioDto);
  }

  @Get()
  findAll() {
    return this.detalleEstudiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.detalleEstudiosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDetalleEstudioDto: UpdateDetalleEstudioDto) {
    return this.detalleEstudiosService.update(+id, updateDetalleEstudioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.detalleEstudiosService.remove(+id);
  }
}

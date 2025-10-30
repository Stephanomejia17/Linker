import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VacantesIdiomasService } from './vacantes_idiomas.service';
import { CreateVacantesIdiomaDto } from './dto/create-vacantes_idioma.dto';
import { UpdateVacantesIdiomaDto } from './dto/update-vacantes_idioma.dto';

@Controller('vacantes-idiomas')
export class VacantesIdiomasController {
  constructor(private readonly vacantesIdiomasService: VacantesIdiomasService) {}

  @Post()
  create(@Body() createVacantesIdiomaDto: CreateVacantesIdiomaDto) {
    return this.vacantesIdiomasService.create(createVacantesIdiomaDto);
  }

  @Get()
  findAll() {
    return this.vacantesIdiomasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.vacantesIdiomasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVacantesIdiomaDto: UpdateVacantesIdiomaDto) {
    return this.vacantesIdiomasService.update(+id, updateVacantesIdiomaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.vacantesIdiomasService.remove(+id);
  }
}

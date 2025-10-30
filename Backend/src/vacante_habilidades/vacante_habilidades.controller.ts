import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VacanteHabilidadesService } from './vacante_habilidades.service';
import { CreateVacanteHabilidadeDto } from './dto/create-vacante_habilidade.dto';
import { UpdateVacanteHabilidadeDto } from './dto/update-vacante_habilidade.dto';

@Controller('vacante-habilidades')
export class VacanteHabilidadesController {
  constructor(private readonly vacanteHabilidadesService: VacanteHabilidadesService) {}

  @Post()
  create(@Body() createVacanteHabilidadeDto: CreateVacanteHabilidadeDto) {
    return this.vacanteHabilidadesService.create(createVacanteHabilidadeDto);
  }

  @Get()
  findAll() {
    return this.vacanteHabilidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.vacanteHabilidadesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVacanteHabilidadeDto: UpdateVacanteHabilidadeDto) {
    return this.vacanteHabilidadesService.update(+id, updateVacanteHabilidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.vacanteHabilidadesService.remove(+id);
  }
}

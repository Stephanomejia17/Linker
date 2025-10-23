import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabilidadesService } from './habilidades.service';
import { CreateHabilidadeDto } from './dto/create-habilidade.dto';
import { UpdateHabilidadeDto } from './dto/update-habilidade.dto';

@Controller('habilidades')
export class HabilidadesController {
  constructor(private readonly habilidadesService: HabilidadesService) {}

  @Post()
  create(@Body() createHabilidadeDto: CreateHabilidadeDto) {
    return this.habilidadesService.create(createHabilidadeDto);
  }

  @Get()
  findAll() {
    return this.habilidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habilidadesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabilidadeDto: UpdateHabilidadeDto) {
    return this.habilidadesService.update(+id, updateHabilidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habilidadesService.remove(+id);
  }
}

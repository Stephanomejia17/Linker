import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VacantesService } from './vacantes.service';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { UpdateVacanteDto } from './dto/update-vacante.dto';

@Controller('vacantes')
export class VacantesController {
  constructor(private readonly vacantesService: VacantesService) {}

  @Post()
  create(@Body() createVacanteDto: CreateVacanteDto) {
    return this.vacantesService.create(createVacanteDto);
  }

  @Get()
  findAll() {
    return this.vacantesService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVacanteDto: UpdateVacanteDto) {
    return this.vacantesService.update(+id, updateVacanteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacantesService.remove(+id);
  }

  @Get('vacantes/:id')
  getVacantes(@Param('id') postulanteId: string) {
    return this.vacantesService.getVacantes(postulanteId);
  }
}

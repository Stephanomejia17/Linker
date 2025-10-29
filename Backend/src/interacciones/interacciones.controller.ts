import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { InteraccionesService } from './interacciones.service';
import { CreateInteraccioneDto } from './dto/create-interaccione.dto';
import { UpdateInteraccioneDto } from './dto/update-interaccione.dto';

@Controller('interacciones')
export class InteraccionesController {
  constructor(private readonly interaccionesService: InteraccionesService) {}

  @Post()
  create(@Body() createInteraccioneDto: CreateInteraccioneDto) {
    return this.interaccionesService.createInteraction(createInteraccioneDto);
  }

  @Get('filter/vacantes/:id')
  findVacantesExcluidos(@Param('id') postulanteId: number) {
    return this.interaccionesService.isFilteredVacantes(postulanteId);
  }

  @Get('filter/postulantes/:id')
  findPostulantesExcluidos(@Param('id') vacanteId: number) {
    return this.interaccionesService.isFilteredPostulantes(vacanteId);
  }

  @Get('check-match/:postulanteId/:vacanteId')
  async checkMatch(
    @Param('postulanteId') postulanteId: number,
    @Param('vacanteId') vacanteId: number,
  ) {
    const interaccion = await this.interaccionesService.findOne(
      postulanteId,
      vacanteId,
    );

    return interaccion;
  }

  /*@Get(':id')
  findOne(@Param('id') id: string) {
    return this.interaccionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInteraccioneDto: UpdateInteraccioneDto) {
    return this.interaccionesService.update(+id, updateInteraccioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interaccionesService.remove(+id);
  }*/
}

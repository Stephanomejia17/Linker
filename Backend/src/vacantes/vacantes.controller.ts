import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { VacantesService } from './vacantes.service';
import { CreateVacanteDto } from './dto/create-vacante.dto';

@Controller('vacantes')
export class VacantesController {
  constructor(private readonly vacantesService: VacantesService) {}

  @Post()
  create(@Body() createVacanteDto: CreateVacanteDto) {
    return this.vacantesService.create(createVacanteDto);
  }

  // vacantes.controller.ts
  // @Post('recibirId')
  // recibirId(@Body() body: { idiomas: number[] }) {
  //   console.log('✅ IDs recibidos:', body.idiomas);
  //   this.vacantesService.guardarIdiomasSeleccionados(body.idiomas);

  //   return {
  //     message: 'IDs recibidos y almacenados correctamente',
  //     data: body.idiomas,
  //   };
  // }

  @Get()
  findAll() {
    return this.vacantesService.findAll();
  }

  @Get('empresaId/:empresa')
  findVacantesOfEmpresa(@Param('empresa') empresaId: number) {
    return this.vacantesService.findAllVacantesofEmpresa(empresaId);
  }

  /*@Get('vacante/:vacante')
  findEmpresaOfVacante(@Param('vacante') vacanteId :string) {
    return this.vacantesService.getEmpresaOfVacante(vacanteId);
  }*/

  @Get('vacantes/:id')
  getVacantes(@Param('id') postulanteId: number) {
    return this.vacantesService.getVacantes(postulanteId);
  }
}

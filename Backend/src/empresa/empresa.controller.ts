import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  /*@Post('registro')
  async register(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresaService.createEmpresa(createEmpresaDto);
  }*/
}

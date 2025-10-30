import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Controller('empresa')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Get()
  findAll() {
    return this.empresaService.findAll();
  }

  @Post('registro')
  async register(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresaService.createEmpresa(createEmpresaDto);
  }

  @Get(':id')
  async getEmpresa(@Param('id') id: number) {
    return this.empresaService.getEmpresaById(id);
  }

  @Get('isEmpresa/:id')
  async isEmpresa(@Param('id') id: number) {
    return this.empresaService.isEmpresa(id);
  }
}

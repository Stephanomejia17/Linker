import { Type } from 'class-transformer';
import { TipoModalidad, TipoTrabajo } from '../entities/vacante.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { IsEnum, IsNumber } from 'class-validator';

export class CreateVacanteDto {
  titulo: string;
  @IsEnum(TipoTrabajo)
  tipo_trabajo: TipoTrabajo;
  @IsEnum(TipoModalidad)
  tipo_modalidad: TipoModalidad;
  //@IsNumber()
  //@Type(() => Number)
  salario: number;
  ubicacion: string;
  empresa: Empresa;
}

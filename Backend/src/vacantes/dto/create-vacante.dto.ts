import { Type } from 'class-transformer';
import { TipoModalidad, TipoTrabajo } from '../entities/vacante.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { IsNumber } from 'class-validator';

export class CreateVacanteDto {
  titulo: string;
  tipo_trabajo: TipoTrabajo;
  tipo_modalidad: TipoModalidad;
  @IsNumber()
  @Type(() => Number)
  salario: number;
  ubicacion: string;
  empresa: Empresa;
}

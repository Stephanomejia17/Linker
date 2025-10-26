import { Postulante } from 'src/postulante/entities/postulante.entity';
import { Vacante } from 'src/vacantes/entities/vacante.entity';
import { Accion } from '../entities/match.entity';
import { Type } from 'class-transformer';
import { IsDate, IsEnum } from 'class-validator';

export class CreateMatchDto {
  postulante: Postulante;
  vacante: Vacante;
  @IsEnum(Accion)
  accion: Accion;
  @IsDate()
  @Type(() => Date)
  fecha: Date;
}

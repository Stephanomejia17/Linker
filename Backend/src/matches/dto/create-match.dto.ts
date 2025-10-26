import { Postulante } from 'src/postulante/entities/postulante.entity';
import { Vacante } from 'src/vacantes/entities/vacante.entity';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { Empresa } from 'src/empresa/entities/empresa.entity';

export class CreateMatchDto {
  empresa: Partial<Empresa>;
  vacante: Partial<Vacante>;
  postulante: Partial<Postulante>
  //accion: Accion;
  /*@IsDate()
  @Type(() => Date)
  fecha: Date;*/
}


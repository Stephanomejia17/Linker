import { IsEnum } from 'class-validator';
import { Niveles } from '../entities/estudio.entity';

export class CreateEstudioDto {
  titulo: string;
  //@IsEnum(Niveles)
  nivel: Niveles;
}

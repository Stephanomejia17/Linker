import { PartialType } from '@nestjs/mapped-types';
import { CreateVacantesIdiomaDto } from './create-vacantes_idioma.dto';

export class UpdateVacantesIdiomaDto extends PartialType(CreateVacantesIdiomaDto) {}

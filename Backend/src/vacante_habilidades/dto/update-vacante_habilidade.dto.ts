import { PartialType } from '@nestjs/mapped-types';
import { CreateVacanteHabilidadeDto } from './create-vacante_habilidade.dto';

export class UpdateVacanteHabilidadeDto extends PartialType(CreateVacanteHabilidadeDto) {}

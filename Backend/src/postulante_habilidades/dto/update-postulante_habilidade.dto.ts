import { PartialType } from '@nestjs/mapped-types';
import { CreatePostulanteHabilidadeDto } from './create-postulante_habilidade.dto';

export class UpdatePostulanteHabilidadeDto extends PartialType(CreatePostulanteHabilidadeDto) {}

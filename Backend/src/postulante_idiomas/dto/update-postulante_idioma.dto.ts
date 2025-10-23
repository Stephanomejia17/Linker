import { PartialType } from '@nestjs/mapped-types';
import { CreatePostulanteIdiomaDto } from './create-postulante_idioma.dto';

export class UpdatePostulanteIdiomaDto extends PartialType(CreatePostulanteIdiomaDto) {}

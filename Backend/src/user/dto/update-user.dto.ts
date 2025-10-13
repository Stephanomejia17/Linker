import { PartialType } from '@nestjs/mapped-types';
import { CreatePostulanteDto } from './create-postulante.dto';

export class UpdateUserDto extends PartialType(CreatePostulanteDto) {}

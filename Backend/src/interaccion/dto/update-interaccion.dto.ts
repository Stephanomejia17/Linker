import { PartialType } from '@nestjs/mapped-types';
import { CreateInteraccionDto } from './create-interaccion.dto';

export class UpdateInteraccionDto extends PartialType(CreateInteraccionDto) {}

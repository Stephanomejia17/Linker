import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleEstudioDto } from './create-detalle_estudio.dto';

export class UpdateDetalleEstudioDto extends PartialType(CreateDetalleEstudioDto) {}

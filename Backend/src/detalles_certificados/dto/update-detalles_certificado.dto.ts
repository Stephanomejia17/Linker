import { PartialType } from '@nestjs/mapped-types';
import { CreateDetallesCertificadoDto } from './create-detalles_certificado.dto';

export class UpdateDetallesCertificadoDto extends PartialType(CreateDetallesCertificadoDto) {}

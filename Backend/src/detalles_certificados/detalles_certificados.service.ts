import { Injectable } from '@nestjs/common';
import { CreateDetallesCertificadoDto } from './dto/create-detalles_certificado.dto';
import { UpdateDetallesCertificadoDto } from './dto/update-detalles_certificado.dto';

@Injectable()
export class DetallesCertificadosService {
  create(createDetallesCertificadoDto: CreateDetallesCertificadoDto) {
    return 'This action adds a new detallesCertificado';
  }

  findAll() {
    return `This action returns all detallesCertificados`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detallesCertificado`;
  }

  update(id: number, updateDetallesCertificadoDto: UpdateDetallesCertificadoDto) {
    return `This action updates a #${id} detallesCertificado`;
  }

  remove(id: number) {
    return `This action removes a #${id} detallesCertificado`;
  }
}

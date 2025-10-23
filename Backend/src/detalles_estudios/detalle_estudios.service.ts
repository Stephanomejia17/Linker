import { Injectable } from '@nestjs/common';
import { CreateDetalleEstudioDto } from './dto/create-detalle_estudio.dto';
import { UpdateDetalleEstudioDto } from './dto/update-detalle_estudio.dto';

@Injectable()
export class DetalleEstudiosService {
  create(createDetalleEstudioDto: CreateDetalleEstudioDto) {
    return 'This action adds a new detalleEstudio';
  }

  findAll() {
    return `This action returns all detalleEstudios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleEstudio`;
  }

  update(id: number, updateDetalleEstudioDto: UpdateDetalleEstudioDto) {
    return `This action updates a #${id} detalleEstudio`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleEstudio`;
  }
}

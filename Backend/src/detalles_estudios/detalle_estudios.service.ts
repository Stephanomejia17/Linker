import { Injectable } from '@nestjs/common';
import { CreateDetalleEstudioDto } from './dto/create-detalle_estudio.dto';
import { UpdateDetalleEstudioDto } from './dto/update-detalle_estudio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleEstudio } from './entities/detalle_estudio.entity';
import { Repository, DeepPartial } from 'typeorm';

@Injectable()
export class DetalleEstudiosService {
  constructor(
    @InjectRepository(DetalleEstudio)
    private detalleEstudioRepository: Repository<DetalleEstudio>,
  ) {}
  async create(
    createDetalleEstudioDto: CreateDetalleEstudioDto,
  ): Promise<DetalleEstudio> {
    const detalleEstudioEntity = this.detalleEstudioRepository.create(
      createDetalleEstudioDto,
    );
    return await this.detalleEstudioRepository.save(detalleEstudioEntity);
  }

  findAll() {
    return this.detalleEstudioRepository.find({
      relations: ['postulante', 'estudio'],
    });
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

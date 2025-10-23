import { Injectable } from '@nestjs/common';
import { CreateEstudioDto } from './dto/create-estudio.dto';
import { UpdateEstudioDto } from './dto/update-estudio.dto';

@Injectable()
export class EstudiosService {
  create(createEstudioDto: CreateEstudioDto) {
    return 'This action adds a new estudio';
  }

  findAll() {
    return `This action returns all estudios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} estudio`;
  }

  update(id: number, updateEstudioDto: UpdateEstudioDto) {
    return `This action updates a #${id} estudio`;
  }

  remove(id: number) {
    return `This action removes a #${id} estudio`;
  }
}

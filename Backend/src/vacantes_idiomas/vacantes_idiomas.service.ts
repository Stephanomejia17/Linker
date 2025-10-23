import { Injectable } from '@nestjs/common';
import { CreateVacantesIdiomaDto } from './dto/create-vacantes_idioma.dto';
import { UpdateVacantesIdiomaDto } from './dto/update-vacantes_idioma.dto';

@Injectable()
export class VacantesIdiomasService {
  create(createVacantesIdiomaDto: CreateVacantesIdiomaDto) {
    return 'This action adds a new vacantesIdioma';
  }

  findAll() {
    return `This action returns all vacantesIdiomas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vacantesIdioma`;
  }

  update(id: number, updateVacantesIdiomaDto: UpdateVacantesIdiomaDto) {
    return `This action updates a #${id} vacantesIdioma`;
  }

  remove(id: number) {
    return `This action removes a #${id} vacantesIdioma`;
  }
}

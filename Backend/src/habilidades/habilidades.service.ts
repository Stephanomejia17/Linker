import { Injectable } from '@nestjs/common';
import { CreateHabilidadeDto } from './dto/create-habilidade.dto';
import { UpdateHabilidadeDto } from './dto/update-habilidade.dto';

@Injectable()
export class HabilidadesService {
  create(createHabilidadeDto: CreateHabilidadeDto) {
    return 'This action adds a new habilidade';
  }

  findAll() {
    return `This action returns all habilidades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} habilidade`;
  }

  update(id: number, updateHabilidadeDto: UpdateHabilidadeDto) {
    return `This action updates a #${id} habilidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} habilidade`;
  }
}

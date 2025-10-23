import { Injectable } from '@nestjs/common';
import { CreateVacanteHabilidadeDto } from './dto/create-vacante_habilidade.dto';
import { UpdateVacanteHabilidadeDto } from './dto/update-vacante_habilidade.dto';

@Injectable()
export class VacanteHabilidadesService {
  create(createVacanteHabilidadeDto: CreateVacanteHabilidadeDto) {
    return 'This action adds a new vacanteHabilidade';
  }

  findAll() {
    return `This action returns all vacanteHabilidades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vacanteHabilidade`;
  }

  update(id: number, updateVacanteHabilidadeDto: UpdateVacanteHabilidadeDto) {
    return `This action updates a #${id} vacanteHabilidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} vacanteHabilidade`;
  }
}

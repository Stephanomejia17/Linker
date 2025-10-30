import { Injectable } from '@nestjs/common';
import { CreateVacanteHabilidadeDto } from './dto/create-vacante_habilidade.dto';
import { UpdateVacanteHabilidadeDto } from './dto/update-vacante_habilidade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VacanteHabilidade } from './entities/vacante_habilidade.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VacanteHabilidadesService {
  constructor(
    @InjectRepository(VacanteHabilidade)
    private vacanteHabilidadesRepository: Repository<VacanteHabilidade>,

    @InjectRepository(VacanteHabilidade, 'oracleConnection')
    private vacanteHabilidadesOracleRepository: Repository<VacanteHabilidade>,
  ) {}

  /*async create(createVacanteHabilidadeDto: CreateVacanteHabilidadeDto) {
    const vacanteHabilidadesEntity = this.vacanteHabilidadesRepository.create(
      createVacanteHabilidadeDto,
    );
    await this.vacanteHabilidadesRepository.save(vacanteHabilidadesEntity);
    return vacanteHabilidadesEntity;
  }

  findAll() {
    return this.vacanteHabilidadesRepository.find({
      relations: ['vacante', 'habilidades'],
    });
  }*/

  async create(createVacanteHabilidadeDto: CreateVacanteHabilidadeDto) {
    const vacanteHabilidadesEntity = this.vacanteHabilidadesOracleRepository.create(
      createVacanteHabilidadeDto,
    );
    await this.vacanteHabilidadesOracleRepository.save(vacanteHabilidadesEntity);
    return vacanteHabilidadesEntity;
  }

  findAll() {
    return this.vacanteHabilidadesOracleRepository.find({
      relations: ['vacante', 'habilidades'],
    });
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

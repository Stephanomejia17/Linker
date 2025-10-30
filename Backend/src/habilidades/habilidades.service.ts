import { Injectable } from '@nestjs/common';
import { CreateHabilidadeDto } from './dto/create-habilidade.dto';
import { UpdateHabilidadeDto } from './dto/update-habilidade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Habilidades } from './entities/habilidades.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HabilidadesService {
  constructor(
    @InjectRepository(Habilidades, 'postgresConnection')
    private habilidadesRepository: Repository<Habilidades>,
    @InjectRepository(Habilidades, 'oracleConnection')
    private habilidadesOracleRepository: Repository<Habilidades>,
  ) {}

  create(createHabilidadeDto: CreateHabilidadeDto) {
    const habilidadEntity =
      this.habilidadesRepository.create(createHabilidadeDto);

    const habilidadOracleEntity =
      this.habilidadesOracleRepository.create(createHabilidadeDto);

    this.habilidadesRepository.insert(habilidadEntity);
    this.habilidadesOracleRepository.insert(habilidadOracleEntity);

    return habilidadEntity;
  }

  async findAll() {
    const response = await this.habilidadesOracleRepository.find();
    console.log('🧠 HABILIDADES DESDE ORACLE:', response);
    return response;
  }

  findAllOracle() {
    return this.habilidadesOracleRepository.find();
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

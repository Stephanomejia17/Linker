import { Injectable } from '@nestjs/common';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { UpdateVacanteDto } from './dto/update-vacante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacante } from './entities/vacante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VacantesService {
  constructor(
    @InjectRepository(Vacante, 'postgresConnection')
    private vacanteRepository: Repository<Vacante>,
    @InjectRepository(Vacante, 'oracleConnection')
    private vacanteOracleRepository: Repository<Vacante>,
  ) {}

  async create(createVacanteDto: CreateVacanteDto) {
    const vacanteEntity = this.vacanteRepository.create({
      ...createVacanteDto,
      empresa: { id: createVacanteDto.empresa.id },
    });

    const vacanteOracleEntity = this.vacanteOracleRepository.create({
      ...createVacanteDto,
      empresa: { id: createVacanteDto.empresa.id },
    });

    await this.vacanteRepository.insert(vacanteEntity);
    await this.vacanteOracleRepository.insert(vacanteOracleEntity);
    return vacanteEntity;
  }

  findAll() {
    return this.vacanteRepository.find({
      relations: ['empresa'],
    });
  }

  findAllOracle() {
    return this.vacanteOracleRepository.find({
      relations: ['empresa'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} vacante`;
  }

  update(id: number, updateVacanteDto: UpdateVacanteDto) {
    return `This action updates a #${id} vacante`;
  }

  remove(id: number) {
    return `This action removes a #${id} vacante`;
  }
}

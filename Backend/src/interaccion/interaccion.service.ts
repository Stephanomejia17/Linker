import { Injectable } from '@nestjs/common';
import { CreateInteraccionDto } from './dto/create-interaccion.dto';
import { UpdateInteraccionDto } from './dto/update-interaccion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Interaccion } from './entities/interaccion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InteraccionService {
  constructor(
    @InjectRepository(Interaccion, 'postgresConnection')
    private interaccionRepository: Repository<Interaccion>,
    @InjectRepository(Interaccion, 'oracleConnection')
    private interaccionOracleRepository: Repository<Interaccion>,
  ) {}

  async create(createInteraccionDto: CreateInteraccionDto) {
    const interaccionEntity =
      this.interaccionRepository.create(createInteraccionDto);
    const interaccionOracleEntity =
      this.interaccionOracleRepository.create(createInteraccionDto);

    await this.interaccionRepository.insert(interaccionEntity);
    await this.interaccionOracleRepository.insert(interaccionOracleEntity);

    return interaccionEntity;
  }

  findAll() {
    return this.interaccionRepository.find({
      relations: ['vacante', 'postulante'],
    });
  }

  findAllOracle() {
    return this.interaccionOracleRepository.find({
      relations: ['vacante', 'postulante'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} interaccion`;
  }

  update(id: number, updateInteraccionDto: UpdateInteraccionDto) {
    return `This action updates a #${id} interaccion`;
  }

  remove(id: number) {
    return `This action removes a #${id} interaccion`;
  }
}

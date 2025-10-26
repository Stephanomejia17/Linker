import { Injectable } from '@nestjs/common';
import { CreateIdiomaDto } from './dto/create-idioma.dto';
import { UpdateIdiomaDto } from './dto/update-idioma.dto';
import { Idioma } from './entities/idioma.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IdiomasService {
  constructor(
    @InjectRepository(Idioma, 'postgresConnection')
    private idiomasRepository: Repository<Idioma>,
    @InjectRepository(Idioma, 'oracleConnection')
    private idiomasOracleRepository: Repository<Idioma>,
  ) {}

  async create(createIdiomaDto: CreateIdiomaDto) {
    const idiomaEntity = this.idiomasRepository.create(createIdiomaDto);
    const idiomaOracleEntity =
      this.idiomasOracleRepository.create(createIdiomaDto);

    await this.idiomasRepository.insert(idiomaEntity);
    await this.idiomasOracleRepository.insert(idiomaOracleEntity);
    return idiomaEntity;
  }

  findAll() {
    return this.idiomasRepository.find();
  }

  findAllOracle() {
    return this.idiomasOracleRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} idioma`;
  }

  update(id: number, updateIdiomaDto: UpdateIdiomaDto) {
    return `This action updates a #${id} idioma`;
  }

  remove(id: number) {
    return `This action removes a #${id} idioma`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match, 'postgresConnection')
    private matchRepository: Repository<Match>,
    @InjectRepository(Match, 'oracleConnection')
    private matchOracleRepository: Repository<Match>,
  ) {}

  async create(createMatchDto: CreateMatchDto) {
    const matchEntity = this.matchRepository.create(createMatchDto);
    const matchOracleEntity = this.matchOracleRepository.create(createMatchDto);
    await this.matchRepository.insert(matchEntity);
    await this.matchOracleRepository.insert(matchOracleEntity);
    return matchEntity;
  }

  findAll() {
    return this.matchRepository.find({ relations: ['postulante', 'vacante'] });
  }

  findAllOracle() {
    return this.matchOracleRepository.find({
      relations: ['postulante', 'vacante'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} match`;
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { CreatePostulanteHabilidadeDto } from './dto/create-postulante_habilidade.dto';
import { UpdatePostulanteHabilidadeDto } from './dto/update-postulante_habilidade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostulanteHabilidades } from './entities/postulante_habilidades.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostulanteHabilidadesService {
  constructor(
    @InjectRepository(PostulanteHabilidades, 'postgresConnection')
    private postulanteHabilidadesRepository: Repository<PostulanteHabilidades>,
    @InjectRepository(PostulanteHabilidades, 'oracleConnection')
    private postulanteHabilidadesOracleRepository: Repository<PostulanteHabilidades>,
  ) {}

  create(createPostulanteHabilidadeDto: CreatePostulanteHabilidadeDto) {
    const postulanteHabilidadesEntity =
      this.postulanteHabilidadesRepository.create(
        createPostulanteHabilidadeDto,
      );
    const postulanteHabilidadesOracleEntity =
      this.postulanteHabilidadesOracleRepository.create(
        createPostulanteHabilidadeDto,
      );
    this.postulanteHabilidadesRepository.insert(postulanteHabilidadesEntity);
    this.postulanteHabilidadesOracleRepository.insert(
      postulanteHabilidadesOracleEntity,
    );
    return postulanteHabilidadesEntity;
  }

  findAll() {
    return this.postulanteHabilidadesRepository.find({
      relations: ['postulante', 'habilidades'],
    });
  }

  findAllOracle() {
    return this.postulanteHabilidadesOracleRepository.find({
      relations: ['postulante', 'habilidades'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} postulanteHabilidade`;
  }

  update(
    id: number,
    updatePostulanteHabilidadeDto: UpdatePostulanteHabilidadeDto,
  ) {
    return `This action updates a #${id} postulanteHabilidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} postulanteHabilidade`;
  }
}

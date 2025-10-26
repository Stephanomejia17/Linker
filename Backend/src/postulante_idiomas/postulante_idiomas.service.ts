import { Injectable } from '@nestjs/common';
import { CreatePostulanteIdiomaDto } from './dto/create-postulante_idioma.dto';
import { UpdatePostulanteIdiomaDto } from './dto/update-postulante_idioma.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Postulante } from 'src/postulante/entities/postulante.entity';
import { Repository } from 'typeorm';
import { Idioma } from 'src/idiomas/entities/idioma.entity';
import { PostulanteIdioma } from './entities/postulante_idioma.entity';

@Injectable()
export class PostulanteIdiomasService {
  constructor(
    @InjectRepository(Postulante, 'postgresConnection')
    private postulanteRepository: Repository<Postulante>,
    @InjectRepository(Idioma, 'postgresConnection')
    private idiomaRepository: Repository<Idioma>,
    @InjectRepository(PostulanteIdioma, 'postgresConnection')
    private postulanteIdiomaRepository: Repository<PostulanteIdioma>,
    @InjectRepository(Postulante, 'oracleConnection')
    private postulanteOracleRepository: Repository<Postulante>,
    @InjectRepository(Idioma, 'oracleConnection')
    private idiomaOracleRepository: Repository<Idioma>,
    @InjectRepository(PostulanteIdioma, 'oracleConnection')
    private postulanteIdiomaOracleRepository: Repository<PostulanteIdioma>,
  ) {}

  async create(createPostulanteIdiomaDto: CreatePostulanteIdiomaDto) {
    const postulanteIdiomaEntity = this.postulanteIdiomaRepository.create(
      createPostulanteIdiomaDto,
    );
    const postulanteIdiomaOracleEntity =
      this.postulanteIdiomaOracleRepository.create(createPostulanteIdiomaDto);

    await this.postulanteIdiomaRepository.insert(postulanteIdiomaEntity);
    await this.postulanteIdiomaOracleRepository.insert(
      postulanteIdiomaOracleEntity,
    );

    return postulanteIdiomaEntity;
  }

  findAll() {
    return this.postulanteIdiomaRepository.find({
      relations: ['postulante', 'idioma'],
    });
  }

  findAllOracle() {
    return this.postulanteIdiomaOracleRepository.find({
      relations: ['postulante', 'idioma'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} postulanteIdioma`;
  }

  update(id: number, updatePostulanteIdiomaDto: UpdatePostulanteIdiomaDto) {
    return `This action updates a #${id} postulanteIdioma`;
  }

  remove(id: number) {
    return `This action removes a #${id} postulanteIdioma`;
  }
}

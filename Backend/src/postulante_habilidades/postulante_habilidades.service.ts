import { Inject, Injectable } from '@nestjs/common';
import { CreatePostulanteHabilidadeDto } from './dto/create-postulante_habilidade.dto';
import { UpdatePostulanteHabilidadeDto } from './dto/update-postulante_habilidade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostulanteHabilidades } from './entities/postulante_habilidades.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostulanteHabilidadesService {
  constructor(
    @InjectRepository(PostulanteHabilidades)
    private postulanteHabilidadesRepository: Repository<PostulanteHabilidades>,
  ) {}

  create(createPostulanteHabilidadeDto: CreatePostulanteHabilidadeDto) {
    const postulanteHabilidadesEntity =
      this.postulanteHabilidadesRepository.create(
        createPostulanteHabilidadeDto,
      );
    this.postulanteHabilidadesRepository.save(postulanteHabilidadesEntity);
    return postulanteHabilidadesEntity;
  }

  findAll() {
    return this.postulanteHabilidadesRepository.find({
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

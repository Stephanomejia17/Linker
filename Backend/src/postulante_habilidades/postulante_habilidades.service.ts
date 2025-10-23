import { Injectable } from '@nestjs/common';
import { CreatePostulanteHabilidadeDto } from './dto/create-postulante_habilidade.dto';
import { UpdatePostulanteHabilidadeDto } from './dto/update-postulante_habilidade.dto';

@Injectable()
export class PostulanteHabilidadesService {
  create(createPostulanteHabilidadeDto: CreatePostulanteHabilidadeDto) {
    return 'This action adds a new postulanteHabilidade';
  }

  findAll() {
    return `This action returns all postulanteHabilidades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} postulanteHabilidade`;
  }

  update(id: number, updatePostulanteHabilidadeDto: UpdatePostulanteHabilidadeDto) {
    return `This action updates a #${id} postulanteHabilidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} postulanteHabilidade`;
  }
}

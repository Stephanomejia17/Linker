import { Injectable } from '@nestjs/common';
import { CreatePostulanteIdiomaDto } from './dto/create-postulante_idioma.dto';
import { UpdatePostulanteIdiomaDto } from './dto/update-postulante_idioma.dto';

@Injectable()
export class PostulanteIdiomasService {
  create(createPostulanteIdiomaDto: CreatePostulanteIdiomaDto) {
    return 'This action adds a new postulanteIdioma';
  }

  findAll() {
    return `This action returns all postulanteIdiomas`;
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

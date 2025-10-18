import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostulanteDto } from './dto/create-postulante.dto';
import { UpdatePostulanteDto } from './dto/update-postulante.dto';
import { Postulante } from './entities/postulante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Console } from 'console';

@Injectable()
export class PostulanteService {
  constructor(
    @InjectRepository(Postulante)
    private readonly postulanteRepository: Repository<Postulante>,
    @InjectRepository(User)
    private readonly usuarioRepository: Repository<User>,
  ) {}

  async createPostulante(dto: CreatePostulanteDto) {
    const user = await this.usuarioRepository.findOne({
      where: { id: dto.id_perfil },
    });
    console.log(user);

    if (!user) {
      throw new NotFoundException(
        'No se encontró el perfil de usuario asociado.',
      );
    }
    console.log('DTO recibido:', dto);
    console.log('Usuario encontrado:', user?.id);

    const postulante = this.postulanteRepository.create({
      ...dto,
      user,
    });

    const registroPostulante = await this.postulanteRepository.save(postulante);
    return {
      message: 'Postulante registrado con éxito',
      postulante: registroPostulante,
    };
  }

  async getPostulanteById(id: string) {
    const postulante = await this.postulanteRepository.findOne({
      where: { user: { id } },
      relations: ['user'],
    });
    if (!postulante) {
      throw new NotFoundException('Postulante no encontrado');
    }
    return postulante;
  }
}

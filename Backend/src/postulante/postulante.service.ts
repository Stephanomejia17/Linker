import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostulanteDto } from './dto/create-postulante.dto';
import { UpdatePostulanteDto } from './dto/update-postulante.dto';
import { Postulante } from './entities/postulante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostulanteService {
  constructor(
    @InjectRepository(Postulante)
    private readonly postulanteRepository: Repository<Postulante>,
    @InjectRepository(User)
    private readonly usuarioRepository: Repository<User>,
  ) {}

  /*async createPostulante(dto: CreatePostulanteDto) {
    const user = await this.usuarioRepository.findOne({ where: { id: dto.id_perfil } });

    if (!user) {
      throw new NotFoundException('No se encontró el perfil de usuario asociado.');
    }

    const postulante = this.postulanteRepository.create ({
      name: dto.name ||null,
      lastname: dto.lastname,
      años_experiencia: dto.años_experiencia || null,
      curriculum: dto.curriculum || null,
      foto: dto.foto || null,
      ubicacion: dto.ubicacion,
      user: user,
    });

    const registroPostulante = await this.postulanteRepository.save(postulante);
    return { message: 'Postulante registrado con éxito', postulante: registroPostulante };
  }*/
}

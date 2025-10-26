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
    @InjectRepository(Postulante, 'postgresConnection')
    private readonly postulanteRepository: Repository<Postulante>,
    @InjectRepository(Postulante, 'oracleConnection')
    private readonly postulanteOracleRepository: Repository<Postulante>,
    @InjectRepository(User, 'postgresConnection')
    private readonly usuarioRepository: Repository<User>,
    @InjectRepository(User, 'oracleConnection')
    private readonly usuarioOracleRepository: Repository<User>,
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

    const postulanteOracle = this.postulanteOracleRepository.create({
      ...dto,
      user,
    });

    const registroPostulante =
      await this.postulanteRepository.insert(postulante);
    await this.postulanteOracleRepository.insert(postulanteOracle);
    return {
      message: 'Postulante registrado con éxito',
      postulante: registroPostulante,
    };
  }

  async getPostulanteById(id: number) {
    const postulante = await this.postulanteRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!postulante) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return {
      name: postulante.name,
      lastname: postulante.lastname,
    };
  }

  findAll() {
    return this.postulanteRepository.find({
      relations: ['user'],
    });
  }

  findAllOracle() {
    return this.postulanteOracleRepository.find({
      relations: ['user'],
    });
  }
}

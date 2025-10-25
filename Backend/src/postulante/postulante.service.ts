import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostulanteDto } from './dto/create-postulante.dto';
import { Postulante } from './entities/postulante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { In, Not, Repository } from 'typeorm';
import { InteraccionesService } from 'src/interacciones/interacciones.service';

@Injectable()
export class PostulanteService {
  constructor(
    @InjectRepository(Postulante)
    private readonly postulanteRepository: Repository<Postulante>,

    @InjectRepository(User)
    private readonly usuarioRepository: Repository<User>,

    private readonly interaccionesService: InteraccionesService,
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

  async getPostulantes(empresaId: string) {
    const postulantesExcluidos =
      await this.interaccionesService.isFilteredPostulantes(empresaId);
    const postulantes = await this.postulanteRepository.find({
      where: {
        id: Not(In(postulantesExcluidos)),
      },
    });

    return postulantes;
  }

  /*async getPostulantesNoInteraction(empresaId:string){  
    console.log('hola desde sevice',empresaId)

    const vacantes_empresa= await this.vacanteService.vacantesEmpresa(empresaId)
    console.log(vacantes_empresa)
  }*/
}

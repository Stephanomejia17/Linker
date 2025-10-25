import { Injectable } from '@nestjs/common';
import { CreateInteraccioneDto } from './dto/create-interaccione.dto';
import { Interaccion, TipoInteraccion } from './entities/interacciones.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InteraccionesService {
  constructor(
    @InjectRepository(Interaccion)
    private interaccionRepository: Repository<Interaccion>,
  ) {}

 async createInteraction(createInteraccioneDto: CreateInteraccioneDto) {
  
    const interaccion = this.interaccionRepository.create({
      ...createInteraccioneDto,
      accionEmpresa: createInteraccioneDto.accion_empresa,
      accionPostulante: createInteraccioneDto.accion_postulante,
      vacante: { id_vacante: createInteraccioneDto.vacante_id },
      postulante: { id: createInteraccioneDto.postulante_id },
    });
    //console.log(interaccion)
    await this.interaccionRepository.save(interaccion);
    return interaccion;
  }

  async findOne(empresaId:string , postulanteId:string ){
    const interaccion = await this.interaccionRepository.findOne({
      where:{
        vacante: { id_vacante: postulanteId },
        postulante: { id: empresaId },
      }
    }
    )
    console.log(interaccion)
    if (!interaccion){
      console.log('no existe')
    }else{
      console.log('hay relacion')
    }

  }



  async isFilteredVacantes(postulanteId: string) {
    const filter = await this.interaccionRepository.find({
      where: [
        {
          accionEmpresa: TipoInteraccion.LIKE,
          accionPostulante: TipoInteraccion.LIKE,
          postulante: { id: postulanteId },
        },
        {
          accionEmpresa: TipoInteraccion.DISLIKE,
          accionPostulante: TipoInteraccion.DISLIKE,
          postulante: { id: postulanteId },
        },
        {
          accionEmpresa: TipoInteraccion.LIKE,
          accionPostulante: TipoInteraccion.DISLIKE,
          postulante: { id: postulanteId },
        },
        {
          accionEmpresa: TipoInteraccion.DISLIKE,
          accionPostulante: TipoInteraccion.LIKE,
          postulante: { id: postulanteId },
        },
        {
          accionEmpresa: TipoInteraccion.NO_INTERACCION,
          accionPostulante: TipoInteraccion.DISLIKE,
          postulante: { id: postulanteId },
        },
        {
          accionEmpresa: TipoInteraccion.NO_INTERACCION,
          accionPostulante: TipoInteraccion.LIKE,
          postulante: { id: postulanteId },
        },
      ],
      relations: ['vacante', 'postulante'],
    });
    const vacantesExcluidas = Array.from(
      new Set(filter.map((i) => i.vacante.id_vacante)),
    );
    console.log(vacantesExcluidas)
    return vacantesExcluidas;
  }

  async isFilteredPostulantes(vacanteId: string) {
    const filter = await this.interaccionRepository.find({
      where: [
        {
          accionEmpresa: TipoInteraccion.LIKE,
          accionPostulante: TipoInteraccion.LIKE,
          vacante: { id_vacante: vacanteId },
        },
        {
          accionEmpresa: TipoInteraccion.DISLIKE,
          accionPostulante: TipoInteraccion.DISLIKE,
          vacante: { id_vacante: vacanteId },
        },
        {
          accionEmpresa: TipoInteraccion.LIKE,
          accionPostulante: TipoInteraccion.DISLIKE,
          vacante: { id_vacante: vacanteId },
        },
        {
          accionEmpresa: TipoInteraccion.DISLIKE,
          accionPostulante: TipoInteraccion.LIKE,
          vacante: { id_vacante: vacanteId },
        },
        {
          accionEmpresa: TipoInteraccion.DISLIKE,
          accionPostulante: TipoInteraccion.NO_INTERACCION,
          vacante: { id_vacante: vacanteId },
        },
        {
          accionEmpresa: TipoInteraccion.LIKE,
          accionPostulante: TipoInteraccion.NO_INTERACCION,
          vacante: { id_vacante: vacanteId },
        },
      ],
      relations: ['vacante', 'postulante'],
    });

    const postulantesExcluidos = Array.from(
      new Set(filter.map((i) => i.postulante.id)),
    );
    return postulantesExcluidos;
  }
}

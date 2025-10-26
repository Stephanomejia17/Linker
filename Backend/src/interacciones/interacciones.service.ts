import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateInteraccioneDto } from './dto/create-interaccione.dto';
import { Interaccion, TipoInteraccion } from './entities/interacciones.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchesService } from 'src/matches/matches.service';
import { Vacante } from 'src/vacantes/entities/vacante.entity';
import { VacantesService } from 'src/vacantes/vacantes.service';
import { CreateMatchDto } from 'src/matches/dto/create-match.dto';
import { Empresa } from 'src/empresa/entities/empresa.entity';

@Injectable()
export class InteraccionesService {
  constructor(
    @InjectRepository(Interaccion)
    private readonly interaccionRepository: Repository<Interaccion>,
    @Inject(forwardRef(() => InteraccionesService))
    private readonly vacantesService : VacantesService,
    private readonly matchService: MatchesService,
  ) {}

  async createInteraction(createInteraccioneDto: CreateInteraccioneDto) {
    const { postulante_id, vacante_id, accion_empresa, accion_postulante , } =
      createInteraccioneDto;

    console.log(postulante_id);
    console.log(accion_empresa);
    console.log(vacante_id);
    console.log(accion_postulante);

    const interaccionExistente = await this.findOne(vacante_id, postulante_id);
    console.log(interaccionExistente)

    
    if (!interaccionExistente) {
      const interaccion = this.interaccionRepository.create({
        ...createInteraccioneDto,
        accionEmpresa: accion_empresa,
        accionPostulante: accion_postulante,
        vacante: { id_vacante: vacante_id },
        postulante: { id: postulante_id },
      });

      await this.interaccionRepository.save(interaccion);
      return interaccion;
    } else {
      // 2. Aplicar la nueva acción SOLO si está definida en el DTO (es decir, fue enviada)
      if (accion_empresa !== undefined) {
        interaccionExistente.accionEmpresa = accion_empresa;
      }

      if (accion_postulante !== undefined) {
        interaccionExistente.accionPostulante = accion_postulante;
      }

      await this.interaccionRepository.save(interaccionExistente);

      if (
        interaccionExistente.accionEmpresa === 'like' &&
        interaccionExistente.accionPostulante === 'like'
      ) {
        const empresa = await this.vacantesService.getEmpresaOfVacante(vacante_id)
        const match: CreateMatchDto ={
          empresa:{id: empresa?.empresa.id},
          vacante:{id_vacante: vacante_id},
          postulante:{id:postulante_id}
        }
        await this.matchService.create(match)
        console.log('es un match')
        //await this.matchService.create(createInteraccioneDto);
      }
    }
  }

  async findOne(vacanteId: string, postulanteId: string) {
    const interaccion = await this.interaccionRepository.findOne({
      where: {
        vacante: { id_vacante: vacanteId },
        postulante: { id: postulanteId },
      },
    });
    console.log(interaccion);
    if (!interaccion) {
      console.log('no existe');
    } else {
      console.log('hay relacion');
    }
    return interaccion;
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
    console.log(vacantesExcluidas);
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

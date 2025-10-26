import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interaccion } from 'src/interacciones/entities/interacciones.entity';
import { Vacante } from 'src/vacantes/entities/vacante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RelationsService {

  constructor(
    @InjectRepository(Vacante)
    private readonly vacanteRepo: Repository<Vacante>,

    @InjectRepository(Interaccion)
    private readonly interaccionRepo: Repository<Interaccion>,
  ) {}

  async getEmpresaOfVacante(vacanteId: string) {
    return this.vacanteRepo.findOne({
      select: { empresa: { id: true } },
      where: { id_vacante: vacanteId },
      relations: ['empresa'],
    });
  }

  async getVacantesFiltradasPorPostulante(postulanteId: string) {
    const interacciones = await this.interaccionRepo.find({
      where: { postulante: { id: postulanteId } },
      relations: ['vacante'],
    });
    return interacciones.map((i) => i.vacante.id_vacante);
  }
}



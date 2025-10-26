import { Injectable } from '@nestjs/common';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { UpdateVacanteDto } from './dto/update-vacante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vacante } from './entities/vacante.entity';
import { In, Not, Repository } from 'typeorm';
import { InteraccionesService } from 'src/interacciones/interacciones.service';

@Injectable()
export class VacantesService {
  constructor(
    @InjectRepository(Vacante)
    private vacanteRepository: Repository<Vacante>,

    private interaccionService: InteraccionesService,
  ) {}

  async create(createVacanteDto: CreateVacanteDto) {
    const vacanteEntity = this.vacanteRepository.create({
      ...createVacanteDto,
      empresa: { id: createVacanteDto.empresa.id },
    });
    await this.vacanteRepository.save(vacanteEntity);
    return vacanteEntity;
  }

  findAll() {
    return this.vacanteRepository.find({
      relations: ['empresa'],
    });
  }

  findAllVacantesofEmpresa(empresaid: string) {
    return this.vacanteRepository.find({
      where: {
        empresa: { id: empresaid },
      },
      relations: ['empresa'],
    });
  }

  async getVacantes(postulanteId: string) {
    const vacantesExcluidas =
      await this.interaccionService.isFilteredVacantes(postulanteId);
    console.log('desde vacante', vacantesExcluidas);
    const vacantes = this.vacanteRepository.find({
      where: {
        id_vacante: Not(In(vacantesExcluidas)),
      },
    });
    return vacantes;
  }

  /*sync getEmpresaOfVacante(vacanteId: string){
    return this.vacanteRepository.findOne({
      select:{empresa:{id:true}},
      where:{
        id_vacante:vacanteId
      },
      relations: ['empresa'],
    })
  }*/

  update(id: number, updateVacanteDto: UpdateVacanteDto) {
    return `This action updates a #${id} vacante`;
  }

  remove(id: number) {
    return `This action removes a #${id} vacante`;
  }
}

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
    @InjectRepository(Vacante, 'postgresConnection')
    private vacanteRepository: Repository<Vacante>,
    @InjectRepository(Vacante, 'oracleConnection')
    private vacanteOracleRepository: Repository<Vacante>,
    private interaccionService: InteraccionesService,
  ) {}

  async create(createVacanteDto: CreateVacanteDto) {
    const vacanteEntity = this.vacanteRepository.create({
      ...createVacanteDto,
      empresa: { id: createVacanteDto.empresa.id },
    });

    const vacanteOracleEntity = this.vacanteOracleRepository.create({
      ...createVacanteDto,
      empresa: { id: createVacanteDto.empresa.id },
    });

    await this.vacanteRepository.insert(vacanteEntity);
    await this.vacanteOracleRepository.insert(vacanteOracleEntity);
    return vacanteEntity;
  }

  findAll() {
    return this.vacanteRepository.find({
      relations: ['empresa'],
    });
  }

  findAllOracle() {
    return this.vacanteOracleRepository.find({
      relations: ['empresa'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} vacante`;
  }

  update(id: number, updateVacanteDto: UpdateVacanteDto) {
    return `This action updates a #${id} vacante`;
  }

  remove(id: number) {
    return `This action removes a #${id} vacante`;
  }

  findAllVacantesofEmpresa(empresaid: number) {
    return this.vacanteRepository.find({
      where: {
        empresa: { id: empresaid },
      },
      relations: ['empresa'],
    });
  }

  async getVacantes(postulanteId: number) {
    const vacantesExcluidas =
      await this.interaccionService.isFilteredVacantes(postulanteId);
    console.log('desde vacante', vacantesExcluidas);
    const vacantes = this.vacanteRepository.find({
      select: {
        empresa: {
          name_empresa: true,
          id: true,
        },
      },
      where: {
        id_vacante: Not(In(vacantesExcluidas)),
      },
      relations: ['empresa', 'vacanteHabilidades', 'vacantesIdiomas'],
      take: 5,
    });
    return vacantes;
  }
}

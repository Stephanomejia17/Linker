import { Injectable } from '@nestjs/common';
import { CreateDetallesCertificadoDto } from './dto/create-detalles_certificado.dto';
import { UpdateDetallesCertificadoDto } from './dto/update-detalles_certificado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetallesCertificado } from './entities/detalles_certificado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DetallesCertificadosService {
  constructor(
    @InjectRepository(DetallesCertificado)
    private detallesCertificadoRepository: Repository<DetallesCertificado>,
    @InjectRepository(DetallesCertificado, 'oracleConnection')
    private detallesCertificadoOracleRepository: Repository<DetallesCertificado>,
  ) {}

  /*create(createDetallesCertificadoDto: CreateDetallesCertificadoDto) {
    const detallesCertificadoEntity = this.detallesCertificadoRepository.create(
      createDetallesCertificadoDto,
    );

    this.detallesCertificadoRepository.save(detallesCertificadoEntity);
    return detallesCertificadoEntity;
  }*/

  create(createDetallesCertificadoDto: CreateDetallesCertificadoDto) {
    const detallesCertificadoEntity = this.detallesCertificadoOracleRepository.create(
      createDetallesCertificadoDto,
    );

    this.detallesCertificadoOracleRepository.save(detallesCertificadoEntity);
    return detallesCertificadoEntity;
  }

  /*findAll() {
    return this.detallesCertificadoRepository.find({
      relations: ['empresa', 'certificado'],
    });
  }*/

  findAll() {
    return this.detallesCertificadoOracleRepository.find({
      relations: ['empresa', 'certificado'],
    });
  }

  /*findOne(id: number) {
    return `This action returns a #${id} detallesCertificado`;
  }*/

  update(
    id: number,
    updateDetallesCertificadoDto: UpdateDetallesCertificadoDto,
  ) {
    return `This action updates a #${id} detallesCertificado`;
  }

  remove(id: number) {
    return `This action removes a #${id} detallesCertificado`;
  }

  /*async findAllByEmpresa(id_empresa: string) {
  return await this.detallesCertificadoRepository.find({
    where: { empresa: { id: id_empresa } },
    relations: ['certificado'], 
  });
  }*/

  async findAllByEmpresa(id_empresa: number) {
  return await this.detallesCertificadoOracleRepository.find({
    where: { empresa: { id: id_empresa } },
    relations: ['certificado'], 
  });
  }

}

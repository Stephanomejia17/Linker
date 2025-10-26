import { Injectable } from '@nestjs/common';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificado } from './entities/certificado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CertificadosService {
  constructor(
    @InjectRepository(Certificado, 'postgresConnection')
    private certificadoRepository: Repository<Certificado>,

    @InjectRepository(Certificado, 'oracleConnection')
    private certificadoOracleRepository: Repository<Certificado>,
  ) {}

  create(createCertificadoDto: CreateCertificadoDto) {
    const certificadoEntity =
      this.certificadoRepository.create(createCertificadoDto);

    const certificadoEntityOracle =
      this.certificadoOracleRepository.create(createCertificadoDto);

    this.certificadoRepository.insert(certificadoEntity);
    this.certificadoOracleRepository.insert(certificadoEntityOracle);
    return certificadoEntity;
  }

  findAll() {
    return this.certificadoRepository.find();
  }

  findAllOracle() {
    return this.certificadoOracleRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} certificado`;
  }

  update(id: number, updateCertificadoDto: UpdateCertificadoDto) {
    return `This action updates a #${id} certificado`;
  }

  remove(id: number) {
    return `This action removes a #${id} certificado`;
  }
}

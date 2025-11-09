import { Injectable } from '@nestjs/common';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificado } from './entities/certificado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CertificadosService {
  constructor(
    @InjectRepository(Certificado)
    private certificadoRepository: Repository<Certificado>,
  ) {}

  create(createCertificadoDto: CreateCertificadoDto) {
    const certificadoEntity =
      this.certificadoRepository.create(createCertificadoDto);
    this.certificadoRepository.save(certificadoEntity);
    return certificadoEntity;
  }

  findAll() {
    return this.certificadoRepository.find();
  }

  findOne(id: number) {
    return this.certificadoRepository.findOne({
      where: { id_certificado: id.toString() },
    });
  }

  update(id: number, updateCertificadoDto: UpdateCertificadoDto) {
    return this.certificadoRepository.update(
      { id_certificado: id.toString() },
      updateCertificadoDto,
    );
  }

  remove(id: number) {
    return this.certificadoRepository.delete({
      id_certificado: id.toString(),
    });
  }
}

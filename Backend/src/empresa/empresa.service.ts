import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { Empresa } from './entities/empresa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa, 'postgresConnection')
    private empresaRepository: Repository<Empresa>,
    @InjectRepository(Empresa, 'oracleConnection')
    private empresaOracleRepository: Repository<Empresa>,

    @InjectRepository(User, 'postgresConnection')
    private usuarioRepository: Repository<User>,
    @InjectRepository(User, 'oracleConnection')
    private usuarioOracleRepository: Repository<User>,
  ) {}

  findAll() {
    return this.empresaRepository.find({
      relations: ['user'],
    });
  }

  findAllOracle() {
    return this.empresaOracleRepository.find({
      relations: ['user'],
    });
  }

  async createEmpresa(dto: CreateEmpresaDto) {
    const user = await this.usuarioRepository.findOne({
      where: { id: dto.id_perfil },
    });

    if (!user) {
      throw new NotFoundException(
        'No se encontró el perfil de usuario asociado.',
      );
    }

    console.log('DTO recibido:', dto);
    console.log('Usuario encontrado:', user?.id);

    const empresa = this.empresaRepository.create({
      ...dto,
      user,
    });

    const empresaOracle = this.empresaOracleRepository.create({
      ...dto,
      user,
    });

    const registroEmpresa = await this.empresaRepository.insert(empresa);
    await this.empresaOracleRepository.insert(empresaOracle);
    return {
      message: 'Empresa registrada con éxito',
      empresa: registroEmpresa,
    };
  }

  async getEmpresaById(id: number) {
    const empresa = await this.empresaRepository.findOne({
      where: { user: { id } },
      relations: ['user'],
    });
    if (!empresa) {
      return null;
    }
    return {
      name_empresa: empresa.name_empresa,
    };
  }

  async isEmpresa(id: number) {
    const empresa = await this.empresaRepository.findOne({
      where: { user: { id } },
    });
    return empresa ? true : false;
  }
}

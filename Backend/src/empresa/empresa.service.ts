import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Empresa } from './entities/empresa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class EmpresaService {
  /*constructor(
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
    private usuarioRepository: Repository<User>,
  ) {}

  /*async createEmpresa(dto: CreateEmpresaDto) {
    const user = await this.usuarioRepository.findOne({ where: { id: dto.id_perfil } });

    if (!user) {
      throw new NotFoundException('No se encontró el perfil de usuario asociado.');
    }

    const empresa = this.empresaRepository.create ({
      name_empresa: dto.name_empresa,
      descripcion: dto.descripcion || null,
      foto: dto.foto || null,
      NIT: dto.NIT,
      user: user,
    });

    const registroEmpresa = await this.empresaRepository.save(empresa);
    return { message: 'Empresa registrada con éxito', empresa: registroEmpresa };
  }*/
}

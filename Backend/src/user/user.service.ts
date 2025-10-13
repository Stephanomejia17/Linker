import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePostulanteDto } from './dto/create-postulante.dto';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { Postulante } from './entities/user.postulante';
import { Empresa } from './entities/user.empresa';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from "bcryptjs";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Postulante)
    private postulanteRepository: Repository<Postulante>,

    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
  ) { }

  async createPostulante(dto: CreatePostulanteDto) {
    if (dto.password !== dto.repassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(dto.password, salt);

    try {
      const postulanteEntity = this.postulanteRepository.create({
        ...dto,
        password: hash,
      });

      await this.postulanteRepository.save(postulanteEntity);

      return {
        success: true,
        message: 'Postulante registrado correctamente',
        token: 'fbsj4guw3wgjfwegjgyfhVJSFGKUFUGKS',
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('No se pudo crear el postulante');
    }
  }

  async createEmpresa(dto: CreateEmpresaDto) {
    if (dto.password !== dto.repassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(dto.password, salt);

    try {
      const empresaEntity = this.empresaRepository.create({
        ...dto,
        password: hash,
      });

      await this.empresaRepository.save(empresaEntity);

      return {
        success: true,
        message: 'Empresa registrada correctamente',
        token: 'fbsj4guw3wgjfwegjgyfhVJSFGKUFUGKS',
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('No se pudo crear la empresa');
    }
  }

  findAllPostulantes() {
    return this.postulanteRepository.find();
  }

  findAllEmpresas() {
    return this.empresaRepository.find();
  }
}
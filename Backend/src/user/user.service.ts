import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from "bcryptjs";
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usuarioRepository: Repository<User>,
  ) { }

  async createUser(dto: CreateUserDto) {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(dto.password, salt);

    try {
      const userEntity = this.usuarioRepository.create({
        ...dto,
        password: hash,
      });

      await this.usuarioRepository.save(userEntity);

      return {
        success: true,
        message: 'Postulante registrado correctamente',
        token: 'fbsj4guw3wgjfwegjgyfhVJSFGKUFUGKS',
      };
    } catch (error) {
      console.error(error);
      throw new BadRequestException('No se pudo crear');
    }
  }
}
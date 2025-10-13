import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postulante } from './entities/user.postulante';
import { Empresa } from './entities/user.empresa';

@Module({
  imports: [TypeOrmModule.forFeature([Postulante, Empresa])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { PostulanteService } from './postulante.service';
import { PostulanteController } from './postulante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postulante } from './entities/postulante.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Postulante])],
  controllers: [PostulanteController],
  providers: [PostulanteService],
})
export class PostulanteModule {}

import { Module } from '@nestjs/common';
import { EstudiosService } from './estudios.service';
import { EstudiosController } from './estudios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleEstudio } from 'src/detalle_estudios/entities/detalle_estudio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleEstudio])],
  controllers: [EstudiosController],
  providers: [EstudiosService],
})
export class EstudiosModule {}

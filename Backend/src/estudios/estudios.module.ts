import { Module } from '@nestjs/common';
import { EstudiosService } from './estudios.service';
import { EstudiosController } from './estudios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleEstudio } from 'src/detalles_estudios/entities/detalle_estudio.entity';
import { Estudio } from './entities/estudio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetalleEstudio, Estudio], 'postgresConnection'),
    TypeOrmModule.forFeature([DetalleEstudio, Estudio], 'oracleConnection'),
  ],
  controllers: [EstudiosController],
  providers: [EstudiosService],
})
export class EstudiosModule {}

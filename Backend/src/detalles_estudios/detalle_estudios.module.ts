import { Module } from '@nestjs/common';
import { DetalleEstudiosService } from './detalle_estudios.service';
import { DetalleEstudiosController } from './detalle_estudios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleEstudio } from './entities/detalle_estudio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleEstudio])],
  controllers: [DetalleEstudiosController],
  providers: [DetalleEstudiosService],
})
export class DetalleEstudiosModule {}

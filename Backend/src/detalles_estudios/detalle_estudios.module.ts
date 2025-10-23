import { Module } from '@nestjs/common';
import { DetalleEstudiosService } from './detalle_estudios.service';
import { DetalleEstudiosController } from './detalle_estudios.controller';

@Module({
  controllers: [DetalleEstudiosController],
  providers: [DetalleEstudiosService],
})
export class DetalleEstudiosModule {}

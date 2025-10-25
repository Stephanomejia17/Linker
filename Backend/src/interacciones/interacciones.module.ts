import { Module } from '@nestjs/common';
import { InteraccionesService } from './interacciones.service';
import { InteraccionesController } from './interacciones.controller';
import { Interaccion } from './entities/interacciones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Interaccion])],
  controllers: [InteraccionesController],
  providers: [InteraccionesService],
  exports:[InteraccionesService]
})
export class InteraccionesModule {}

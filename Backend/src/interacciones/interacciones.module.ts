import { forwardRef, Module } from '@nestjs/common';
import { InteraccionesService } from './interacciones.service';
import { InteraccionesController } from './interacciones.controller';
import { Interaccion } from './entities/interacciones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchesModule } from 'src/matches/matches.module';
import { Vacante } from 'src/vacantes/entities/vacante.entity';
import { VacantesModule } from 'src/vacantes/vacantes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Interaccion]),
    MatchesModule /*VacantesModule*/,
    forwardRef(() => VacantesModule)
  ],
  controllers: [InteraccionesController],
  providers: [InteraccionesService],
  exports: [InteraccionesService],
})
export class InteraccionesModule {}

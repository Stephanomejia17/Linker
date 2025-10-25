import { Module } from '@nestjs/common';
import { VacantesService } from './vacantes.service';
import { VacantesController } from './vacantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacantesIdioma } from 'src/vacantes_idiomas/entities/vacantes_idioma.entity';
import { VacanteHabilidade } from 'src/vacante_habilidades/entities/vacante_habilidade.entity';
import { Match } from 'src/matches/entities/match.entity';
import { Vacante } from './entities/vacante.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VacantesIdioma,
      VacanteHabilidade,
      Match,
      Vacante,
    ]),
  ],
  controllers: [VacantesController],
  providers: [VacantesService],
  exports: [TypeOrmModule], 
})
export class VacantesModule {}

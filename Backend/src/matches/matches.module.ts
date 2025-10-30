import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Vacante } from '../vacantes/entities/vacante.entity';
import { Empresa } from '../empresa/entities/empresa.entity';
import { Postulante } from '../postulante/entities/postulante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Vacante, Empresa, Postulante])],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports:[MatchesService]
})
export class MatchesModule {}

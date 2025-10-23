import { Module } from '@nestjs/common';
import { VacantesService } from './vacantes.service';
import { VacantesController } from './vacantes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacantesIdioma } from 'src/vacantes_idiomas/entities/vacantes_idioma.entity';
import { VacanteHabilidade } from 'src/vacante_habilidades/entities/vacante_habilidade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VacantesIdioma, VacanteHabilidade])],
  controllers: [VacantesController],
  providers: [VacantesService],
})
export class VacantesModule {}

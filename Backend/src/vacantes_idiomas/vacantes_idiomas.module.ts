import { Module } from '@nestjs/common';
import { VacantesIdiomasService } from './vacantes_idiomas.service';
import { VacantesIdiomasController } from './vacantes_idiomas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacantesIdioma } from './entities/vacantes_idioma.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VacantesIdioma])],
  controllers: [VacantesIdiomasController],
  providers: [VacantesIdiomasService],
})
export class VacantesIdiomasModule {}

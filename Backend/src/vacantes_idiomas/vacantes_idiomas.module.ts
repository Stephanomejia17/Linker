import { Module } from '@nestjs/common';
import { VacantesIdiomasService } from './vacantes_idiomas.service';
import { VacantesIdiomasController } from './vacantes_idiomas.controller';

@Module({
  controllers: [VacantesIdiomasController],
  providers: [VacantesIdiomasService],
})
export class VacantesIdiomasModule {}

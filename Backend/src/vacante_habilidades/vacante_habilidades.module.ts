import { Module } from '@nestjs/common';
import { VacanteHabilidadesService } from './vacante_habilidades.service';
import { VacanteHabilidadesController } from './vacante_habilidades.controller';

@Module({
  controllers: [VacanteHabilidadesController],
  providers: [VacanteHabilidadesService],
})
export class VacanteHabilidadesModule {}

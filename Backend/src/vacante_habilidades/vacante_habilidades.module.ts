import { Module } from '@nestjs/common';
import { VacanteHabilidadesService } from './vacante_habilidades.service';
import { VacanteHabilidadesController } from './vacante_habilidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VacanteHabilidade } from './entities/vacante_habilidade.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VacanteHabilidade], 'postgresConnection'),
    TypeOrmModule.forFeature([VacanteHabilidade], 'oracleConnection'),
  ],
  controllers: [VacanteHabilidadesController],
  providers: [VacanteHabilidadesService],
})
export class VacanteHabilidadesModule {}

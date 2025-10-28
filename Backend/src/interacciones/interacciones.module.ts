import { Module } from '@nestjs/common';
import { InteraccionesService } from './interacciones.service';
import { InteraccionesController } from './interacciones.controller';
import { Interaccion } from './entities/interacciones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchesModule } from 'src/matches/matches.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Interaccion]),
    MatchesModule,
  ],
  controllers: [InteraccionesController],
  providers: [InteraccionesService],
  exports: [InteraccionesService],
})
export class InteraccionesModule {}

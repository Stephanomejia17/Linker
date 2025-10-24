import { Module } from '@nestjs/common';
import { DetallesCertificadosService } from './detalles_certificados.service';
import { DetallesCertificadosController } from './detalles_certificados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificado } from 'src/certificados/entities/certificado.entity';
import { DetallesCertificado } from './entities/detalles_certificado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Certificado, DetallesCertificado])],
  controllers: [DetallesCertificadosController],
  providers: [DetallesCertificadosService],
})
export class DetallesCertificadosModule {}

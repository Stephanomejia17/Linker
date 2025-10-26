import { Module } from '@nestjs/common';
import { CertificadosService } from './certificados.service';
import { CertificadosController } from './certificados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Certificado } from './entities/certificado.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Certificado], 'postgresConnection'),
    TypeOrmModule.forFeature([Certificado], 'oracleConnection'),
  ],
  controllers: [CertificadosController],
  providers: [CertificadosService],
})
export class CertificadosModule {}

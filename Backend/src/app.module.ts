import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EmpresaModule } from './empresa/empresa.module';
import { PostulanteModule } from './postulante/postulante.module';
import { EstudiosModule } from './estudios/estudios.module';
import { DetalleEstudiosModule } from './detalles_estudios/detalle_estudios.module';
import { HabilidadesModule } from './habilidades/habilidades.module';
import { PostulanteHabilidadesModule } from './postulante_habilidades/postulante_habilidades.module';
import { IdiomasModule } from './idiomas/idiomas.module';
import { PostulanteIdiomasModule } from './postulante_idiomas/postulante_idiomas.module';
import { CertificadosModule } from './certificados/certificados.module';
import { DetallesCertificadosModule } from './detalles_certificados/detalles_certificados.module';
import { VacantesModule } from './vacantes/vacantes.module';
import { VacantesIdiomasModule } from './vacantes_idiomas/vacantes_idiomas.module';
import { VacanteHabilidadesModule } from './vacante_habilidades/vacante_habilidades.module';
import { MatchesModule } from './matches/matches.module';
import { InteraccionModule } from './interaccion/interaccion.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      name: 'postgresConnection',
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: false, // FALSOOOO
    }),

    TypeOrmModule.forRoot({
      name: 'oracleConnection',
      type: 'oracle',
      host: process.env.DB_HOST_ORACLE,
      port: +process.env.DB_PORT_ORACLE!,
      username: process.env.DB_USERNAME_ORACLE,
      password: process.env.DB_PASSWORD_ORACLE,
      serviceName: process.env.DB_SERVICE_ORACLE,
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      logging: true,
      extra: {
        schema: 'XE_LINKER',
      },
    }),
    EmpresaModule,
    PostulanteModule,
    UserModule,
    EstudiosModule,
    DetalleEstudiosModule,
    HabilidadesModule,
    PostulanteHabilidadesModule,
    IdiomasModule,
    PostulanteIdiomasModule,
    CertificadosModule,
    DetallesCertificadosModule,
    VacantesModule,
    VacantesIdiomasModule,
    VacanteHabilidadesModule,
    MatchesModule,
    InteraccionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

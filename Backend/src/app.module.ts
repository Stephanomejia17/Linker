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
import { DetalleEstudiosModule } from './detalle_estudios/detalle_estudios.module';
import { HabilidadesModule } from './habilidades/habilidades.module';
import { PostulanteHabilidadesModule } from './postulante_habilidades/postulante_habilidades.module';
import { IdiomasModule } from './idiomas/idiomas.module';
import { PostulanteIdiomasModule } from './postulante_idiomas/postulante_idiomas.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

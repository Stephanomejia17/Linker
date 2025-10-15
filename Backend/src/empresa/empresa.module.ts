import { Module } from '@nestjs/common';
import { EmpresaService } from './empresa.service';
import { EmpresaController } from './empresa.controller';
import { UserModule } from 'src/user/user.module';
import { Empresa } from './entities/empresa.entity';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa, User]), UserModule],
  controllers: [EmpresaController],
  providers: [EmpresaService],
})
export class EmpresaModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { Vacante } from 'src/vacantes/entities/vacante.entity';
import { Postulante } from 'src/postulante/entities/postulante.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { StreamChat } from 'stream-chat';

@Injectable()
export class MatchesService {
  private streamClient: StreamChat;

  constructor(
    @InjectRepository(Match) private matchRepo: Repository<Match>,
    @InjectRepository(Vacante) private vacanteRepo: Repository<Vacante>,
    @InjectRepository(Empresa) private empresaRepo: Repository<Empresa>,
    @InjectRepository(Postulante) private postulanteRepo: Repository<Postulante>,
  ) {
    this.streamClient = StreamChat.getInstance(
      'ykgddvxenb23',
      '3wfnhef3xte3437m5ekngmrjxaa7ybcnxgu68sppnhpa8zsc5v3afv3fpfn33yp4',
    );
  }

  async findMatchesByUser(idUsuario: string) {
    const empresa = await this.empresaRepo
      .createQueryBuilder('e')
      .innerJoin('e.user', 'u')
      .where('u.id = :idUsuario', { idUsuario })
      .getOne();

    const postulante = await this.postulanteRepo
      .createQueryBuilder('p')
      .innerJoin('p.user', 'u')
      .where('u.id = :idUsuario', { idUsuario })
      .getOne();

    if (postulante) {
      return this.matchRepo
        .createQueryBuilder('m')
        .innerJoin('m.vacante', 'v')
        .innerJoin('v.empresa', 'e')
        .innerJoin('e.user', 'ue')
        .innerJoin('m.postulante', 'p')
        .innerJoin('p.user', 'up')
        .select('m.id_match', 'id_match')
        .addSelect('v.id_vacante', 'id_vacante')
        .addSelect('p.id', 'id_postulante')
        .addSelect('e.id', 'id_empresa')
        .addSelect('up.id', 'id_usuario_postulante')
        .addSelect('ue.id', 'id_usuario_empresa')
        .addSelect('m.fecha', 'fecha')
        .addSelect('m.accion', 'accion')
        .where('p.id = :idPostulante', { idPostulante: postulante.id })
        .getRawMany();
    }

    if (empresa) {
      return this.vacanteRepo
        .createQueryBuilder('v')
        .innerJoin('v.matches', 'm')
        .innerJoin('m.postulante', 'p')
        .innerJoin('p.user', 'up')
        .innerJoin('v.empresa', 'e')
        .innerJoin('e.user', 'ue')
        .select('m.id_match', 'id_match')
        .addSelect('v.id_vacante', 'id_vacante')
        .addSelect('p.id', 'id_postulante')
        .addSelect('e.id', 'id_empresa')
        .addSelect('up.id', 'id_usuario_postulante')
        .addSelect('ue.id', 'id_usuario_empresa')
        .addSelect('m.fecha', 'fecha')
        .addSelect('m.accion', 'accion')
        .where('e.id = :idEmpresa', { idEmpresa: empresa.id })
        .getRawMany();
    }

    return [];
  }

  async findNewMatchesSince(idUsuario: string, sinceDate: Date) {
    const allMatches = await this.findMatchesByUser(idUsuario);
    return allMatches.filter(match => 
      new Date(match.fecha) > sinceDate
    );
  }

  async createChatForMatch(matchData: {
    id_usuario_postulante: string;
    id_usuario_empresa: string;
    id_match: string;
  }) {
    try {
      const channelId = `match-${matchData.id_match}`;
      
      const channel = this.streamClient.channel('messaging', channelId, {
        members: [matchData.id_usuario_postulante, matchData.id_usuario_empresa],
        created_by_id: matchData.id_usuario_postulante,
      });

      await channel.create();

      return { success: true, channelId };
    } catch (error) {
      console.error('Error creando canal de chat:', error);
      throw error;
    }
  }
}
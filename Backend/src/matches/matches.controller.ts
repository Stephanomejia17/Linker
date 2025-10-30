import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get('usuario/:id/nuevos')
  async getNewMatches(
    @Param('id') id: string,
    @Query('desde') desde?: string
  ) {
    const sinceDate = desde ? new Date(desde) : new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this.matchesService.findNewMatchesSince(id, sinceDate);
  }

  @Get('usuario/:id')
  async getAllMatches(@Param('id') id: string) {
    return this.matchesService.findMatchesByUser(id);
  }
}
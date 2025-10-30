import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostulanteHabilidadesService } from './postulante_habilidades.service';
import { CreatePostulanteHabilidadeDto } from './dto/create-postulante_habilidade.dto';
import { UpdatePostulanteHabilidadeDto } from './dto/update-postulante_habilidade.dto';

@Controller('postulante-habilidades')
export class PostulanteHabilidadesController {
  constructor(
    private readonly postulanteHabilidadesService: PostulanteHabilidadesService,
  ) {}

  @Post()
  create(@Body() createPostulanteHabilidadeDto: CreatePostulanteHabilidadeDto) {
    return this.postulanteHabilidadesService.create(
      createPostulanteHabilidadeDto,
    );
  }

  @Get()
  findAll() {
    return this.postulanteHabilidadesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postulanteHabilidadesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePostulanteHabilidadeDto: UpdatePostulanteHabilidadeDto,
  ) {
    return this.postulanteHabilidadesService.update(
      +id,
      updatePostulanteHabilidadeDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postulanteHabilidadesService.remove(+id);
  }
}

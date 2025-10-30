import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostulanteIdiomasService } from './postulante_idiomas.service';
import { CreatePostulanteIdiomaDto } from './dto/create-postulante_idioma.dto';
import { UpdatePostulanteIdiomaDto } from './dto/update-postulante_idioma.dto';

@Controller('postulante-idiomas')
export class PostulanteIdiomasController {
  constructor(private readonly postulanteIdiomasService: PostulanteIdiomasService) {}

  @Post()
  create(@Body() createPostulanteIdiomaDto: CreatePostulanteIdiomaDto) {
    return this.postulanteIdiomasService.create(createPostulanteIdiomaDto);
  }

  @Get()
  findAll() {
    return this.postulanteIdiomasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postulanteIdiomasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePostulanteIdiomaDto: UpdatePostulanteIdiomaDto) {
    return this.postulanteIdiomasService.update(+id, updatePostulanteIdiomaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.postulanteIdiomasService.remove(+id);
  }
}

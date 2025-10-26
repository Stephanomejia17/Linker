import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InteraccionService } from './interaccion.service';
import { CreateInteraccionDto } from './dto/create-interaccion.dto';
import { UpdateInteraccionDto } from './dto/update-interaccion.dto';

@Controller('interaccion')
export class InteraccionController {
  constructor(private readonly interaccionService: InteraccionService) {}

  @Post()
  create(@Body() createInteraccionDto: CreateInteraccionDto) {
    return this.interaccionService.create(createInteraccionDto);
  }

  @Get()
  findAll() {
    return this.interaccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.interaccionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInteraccionDto: UpdateInteraccionDto) {
    return this.interaccionService.update(+id, updateInteraccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.interaccionService.remove(+id);
  }
}

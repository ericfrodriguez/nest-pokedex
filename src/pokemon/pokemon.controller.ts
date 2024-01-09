import { Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';

import { PokemonService } from './pokemon.service';
import { CreatePokemonDTO } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Post()
  // @HttpCode(HttpStatus.CREATED)
  create(@Body() createPokemonDTO: CreatePokemonDTO) {
    return this.pokemonService.create(createPokemonDTO);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDTO ) {

    return this.pokemonService.findAll(paginationDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id);
  }
}

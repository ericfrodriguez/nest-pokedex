import { Injectable } from '@nestjs/common';
import { CreatePokemonDTO } from 'src/pokemon/dto/create-pokemon.dto';
import { PokemonService } from 'src/pokemon/pokemon.service';


@Injectable()
export class SeedService {

  constructor(
    private readonly pokemonService: PokemonService,
  ) {}


  async executeSeed() {
    await this.pokemonService.removeAll();

    const pokemons: CreatePokemonDTO[] = await this.pokemonService.getPokemons();
    await this.pokemonService.createMany(pokemons);
  }

}

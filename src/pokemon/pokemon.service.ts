import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { Pokemon, PokemonDocument } from './entities/pokemon.entity';
import { CreatePokemonDTO } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokeResponse, SimplePokemon } from './interfaces/pokemon-response.interfaces';
import { HttpAdapter } from 'src/libs/http/http.adapter';
import { PaginationDTO } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {


  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<PokemonDocument>,
    private readonly http: HttpAdapter,
  ) { }

  async create(createPokemonDTO: CreatePokemonDTO) {

    createPokemonDTO.name = createPokemonDTO.name.toLowerCase();

    try {
      const newPokemon: Pokemon = await this.pokemonModel.create(createPokemonDTO);

      return newPokemon;
    } catch (error) {
      this.HandleExceptions(error, {
        methodName: this.create.name,
      });
    }
  }

  findAll(paginationDTO: PaginationDTO) {

    const { limit = 10, offset = 0 } = paginationDTO;

    const pokemons = this.pokemonModel.find()
    .skip(offset)
    .limit(limit)
    .sort({
      no: 1
    })
    .select('-__v')

    return pokemons;
  }

  async findOne(term: string) {

    const termIsNumber: boolean = !isNaN(Number(term));

    let pokemon: Pokemon | null;

    if (termIsNumber) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() });
    }

    if (pokemon) {
      return pokemon;
    }

    throw new NotFoundException(`Pokemon with "id", "name" or "no" ${term} not found`);

  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    try {
      const pokemon: Pokemon = await this.findOne(term);

      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      }

      await pokemon.updateOne(updatePokemonDto, { new: true });

      return {
        ...pokemon.toJSON(),
        ...updatePokemonDto,
      };
    } catch (error) {
      this.HandleExceptions(error, {
        methodName: this.update.name,
      });
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0) {
      throw new NotFoundException(`Pokemon with id "${id}" not found`);
    }

    return 'Pokemon deleted'
  }

  async getPokemons() {
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const pokemons = data.results.map(({ name, url }: SimplePokemon) => {

      const segments: string[] = url.split('/');
      const no: string = segments.at(-2);

      return {
        name,
        no
      }
    });

    return pokemons;
  }

  async createMany(pokemons: CreatePokemonDTO[]) {
    try {
      await this.pokemonModel.insertMany(pokemons);
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Some pokemons already exists in DB`);
      }

      throw new InternalServerErrorException(`Something wents wrong trying bulk insert Pokemons - Check server logs`);
    }
  }

  async removeAll() {
    const { deletedCount } = await this.pokemonModel.deleteMany();

    if (deletedCount === 0) {
      throw new BadRequestException(`No pokemons were deleted`);
    }
  }

  private HandleExceptions(error: any, { methodName }: { methodName: string }) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon with ${JSON.stringify(error.keyValue)} already exists in DB`);
    }

    throw new InternalServerErrorException(`Something wents wrong trying ${methodName} Pokemon - Check server logs`);
  }
}

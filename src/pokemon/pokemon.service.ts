import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { Pokemon, PokemonDocument } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: Model<PokemonDocument>,
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {

    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const newPokemon: Pokemon = await this.pokemonModel.create(createPokemonDto);

      return newPokemon;
    } catch (error) {
      this.HandleExceptions(error, {
        methodName: this.create.name,
      });
    }
  }

  findAll() {
    return `This action returns all pokemon`;
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
    const pokemon = await this.findOne(id);

    await pokemon.deleteOne();
  }

  private HandleExceptions(error: any, { methodName }: { methodName: string }) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon with ${JSON.stringify(error.keyValue)} already exists in DB`);
    }

    throw new InternalServerErrorException(`Something wents wrong trying ${methodName} Pokemon - Check server logs`);
  }
}

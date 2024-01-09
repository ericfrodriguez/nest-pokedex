import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDTO } from './create-pokemon.dto';

export class UpdatePokemonDto extends PartialType(CreatePokemonDTO) {}

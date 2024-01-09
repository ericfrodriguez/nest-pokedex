import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDTO {

    @IsInt()
    @IsPositive()
    @Min(1)
    no: string;

    @IsString()
    @MinLength(1)
    name: string;
}

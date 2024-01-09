import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDTO {

    @IsNumber()
    @IsOptional()
    @IsPositive()
    @Min(1)
    limit?: number;

    @IsNumber()
    @IsOptional()
    @Min(0)
    offset?: number;
}
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;

    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    page?: number;

}
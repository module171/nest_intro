import { CreateUserDto } from "./create-user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateManyUsersDto {
    @ApiProperty({ description: 'Danh sách người dùng', type: 'array',
        items: { type: 'User' },required : true })
    @IsArray()
    @IsNotEmpty({ message: 'Danh sách người dùng không được để trống' })
    @ValidateNested({ each: true })
    @Type(() => CreateUserDto)
    users: CreateUserDto[];
}
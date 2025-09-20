import { Body, ClassSerializerInterceptor, Controller, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './provider/users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
@Controller('users')
@ApiTags('Users')
export class UsersController {

    constructor(private usersService: UsersService){}

    // @UseGuards(AccessTokenGuard)
    @Post('create')
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 201, description: 'User created successfully' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    @ApiBody({ type: CreateUserDto })
    @HttpCode(HttpStatus.CREATED)
    @Auth(AuthType.None)
    @UseInterceptors(ClassSerializerInterceptor)
    createUser(@Body() user: CreateUserDto): Promise<User>{
        return this.usersService.createUser(user);
    }   
    
    // @UseGuards(AccessTokenGuard)
    @Post('create-many')
    @ApiOperation({ summary: 'Create many users' })
    @ApiResponse({ status: 201, description: 'Users created successfully' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    @ApiBody({ type: CreateManyUsersDto })
    @HttpCode(HttpStatus.CREATED)
    createManyUsers(@Body() users: CreateManyUsersDto): Promise<User[]>{
        return this.usersService.createMany(users);
    }
}

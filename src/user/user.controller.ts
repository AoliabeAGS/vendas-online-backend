import {
  Controller,
  Post,
  Body,
  Get,
  UsePipes,
  ValidationPipe,
  Param,
  Patch,
} from '@nestjs/common';
import { createUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UserId } from '../decorators/user-id.decarator';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createUser(@Body() createUser: createUserDto): Promise<UserEntity> {
    return this.userService.createUser(createUser);
  }

  @Roles(UserType.Admin)
  @Get()
  async getAllUsers(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAllUsers()).map(
      (userEntity) => new ReturnUserDto(userEntity),
    );
  }

  @Roles(UserType.Admin)
  @Get('/:userId')
  async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.getUserByUsingRelations(userId),
    );
  }

  @Roles(UserType.Admin, UserType.User)
  @Patch()
  @UsePipes(ValidationPipe)
  async updatePasswordUser(
    @Body() updatePasswordDTO: UpdatePasswordDto,
    @UserId() userId: number,
  ): Promise<UserEntity> {
    return this.userService.updatePasswordUser(updatePasswordDTO, userId);
  }
}

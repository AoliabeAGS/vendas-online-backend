import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnLogin } from './dtos/return.dto';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayLoad.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<ReturnLogin> {
    const user: UserEntity | undefined = await this.userService
      .findUserByEmail(loginDto.email)
      .catch(() => undefined);
    const passwordMatch = await compare(
      loginDto.password,
      user?.password || '',
    );
    if (!user || !passwordMatch) {
      throw new NotFoundException(`Email or password incorrect`);
    }
    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDto(user),
    };
  }
}

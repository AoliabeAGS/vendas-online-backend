import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { createPasswordHash, validatePassword } from '../utils/password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: createUserDto): Promise<UserEntity> {
    const user = await this.findUserByEmail(createUserDto.email).catch(
      () => undefined,
    );
    if (user) {
      throw new BadRequestException('Email already exists');
    }

    try {
      const passwordHash = await createPasswordHash(createUserDto.password);

      return this.userRepository.save({
        ...createUserDto,
        typeUser: UserType.User,
        password: passwordHash,
      });
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
  }
  async getUserByUsingRelations(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id: userId },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }
  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
  async findUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`UserId ${userId} not found`);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`Email ${email} not found`);
    }
    return user;
  }

  async updatePasswordUser(
    updatePasswordDTO: UpdatePasswordDto,
    userId: number,
  ): Promise<UserEntity> {
    const user = await this.findUserById(userId);

    const passwordHash = await createPasswordHash(
      updatePasswordDTO.newPassword,
    );

    const passwordMatch = await validatePassword(
      updatePasswordDTO.lastPassword,
      user.password || '',
    );
    if (!passwordMatch) {
      throw new BadRequestException('Password does not match');
    }

    return this.userRepository.save({
      ...user,
      password: passwordHash,
    });
  }
}

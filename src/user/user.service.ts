import { Injectable, NotFoundException } from '@nestjs/common';
import { createUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(createUserDto: createUserDto): Promise<UserEntity> {
    const saltRounds = 10;
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash(createUserDto.password, salt);

      return this.userRepository.save({
        ...createUserDto,
        typeUser: 1,
        password: passwordHash,
      });
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error;
    }
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
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  repository = null;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findAll(): Promise<User[]> {
    return [];
  }

  public async findOne({ login }: { login: string }): Promise<User> {
    return this.userRepository.findOne({ login });
  }

  public async createUser(user: User): Promise<User> {
    const findedUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.login = :login', { login: user.login })
      .orWhere('user.email = :email', { email: user.email })
      .getOne();

    if (!findedUser) {
      return await this.userRepository.save(user);
    }

    throw new HttpException(
      {
        status: HttpStatus.CONFLICT,
        message: 'User data already exist',
        data: {
          login: findedUser.login === user.login,
          email: findedUser.email === user.email,
        },
      },
      HttpStatus.CONFLICT,
    );
  }
}

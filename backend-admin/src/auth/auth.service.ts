import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({
    login,
    password,
  }: {
    login: string;
    password: string;
  }): Promise<any> {
    const user: User = await this.usersService.findOne({ login });

    if (!user) {
      return null;
    }

    const isSamePassword = await user.comparePassword(password);

    if (!isSamePassword) {
      return null;
    }

    return user.toResponseObject();
  }

  async validateUserToken({ login }: { login: string }) {
    return await this.usersService.findOne({ login });
  }

  async login(user: User) {
    const payload = { login: user.login };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user,
    };
  }

  async signUp(user: User) {
    const accessToken = this.usersService.createUser(user);

    return {
      accessToken,
      user,
    };
  }
}

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'login',
      passwordField: 'password',
    });
  }

  async validate(login: string, password: string): Promise<any> {
    if (login.trim() === '' || password.trim() === '') {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const user = await this.authService.validateUser({ login, password });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}

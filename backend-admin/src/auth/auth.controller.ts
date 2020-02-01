import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { SignInUserDto } from '../users/dto/sign-in-user.dto';
import { UserExistDto } from '../users/dto/user-exist.dto';
import { UserEmptyFieldsDto } from '../users/dto/user-empty-fields.dto';
import { CreateUserResponseDto } from '../users/dto/create-user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login is success',
    type: CreateUserResponseDto,
  })
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req, @Body() signInUserDto: SignInUserDto) {
    const user = new User();
    user.login = signInUserDto.login;
    user.password = signInUserDto.password;

    const userToken = await this.authService.login(user);

    return {
      status: HttpStatus.OK,
      message: 'Authorized',
      data: {
        ...userToken,
        user: req.user,
      },
    };
  }

  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User data already exist.',
    type: UserExistDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Fields are required.',
    type: UserEmptyFieldsDto,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully created.',
    type: CreateUserResponseDto,
  })
  @Post('sign_up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const newUser = new User();
    const { login, password, email } = createUserDto;
    let emptyField = false;
    if (!login || !password || !email) {
      emptyField = true;
    }

    if (
      !emptyField &&
      (login.trim() === '' || email.trim() === '' || password.trim() === '')
    ) {
      emptyField = true;
    }

    if (emptyField) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Fields are required',
          data: {
            login: login ? true : false,
            password: password ? true : false,
            email: email ? true : false,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    newUser.login = login;
    newUser.password = password;
    newUser.email = email;

    try {
      const createdUser = await this.usersService.createUser(newUser);

      const userToken = await this.authService.login(createdUser);
      return {
        status: HttpStatus.CREATED,
        message: 'The record has been successfully created.',
        data: {
          ...userToken,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

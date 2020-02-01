import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @ApiProperty()
  readonly login: string;

  @ApiProperty()
  readonly password: string;
}

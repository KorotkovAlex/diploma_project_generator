import { ApiProperty, ApiResponse, ApiResponseProperty } from '@nestjs/swagger';
import { ResultDto } from './result.dto';
import { User } from '../../users/user.entity';

export class CreateUserDto extends ResultDto {
  @ApiProperty()
  readonly login: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

  @ApiResponseProperty({
    example: {
      user: {},
      accessToken: 'accessToken',
    },
  })
  readonly data: {
    user: User;
  };
}

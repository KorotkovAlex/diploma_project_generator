import { ApiResponseProperty } from '@nestjs/swagger';
import { ResultDto } from './result.dto';

export class CreateUserResponseDto extends ResultDto {
  @ApiResponseProperty({
    example: {
      user: {},
      accessToken: 'accessToken',
    },
  })
  readonly data: object;
}

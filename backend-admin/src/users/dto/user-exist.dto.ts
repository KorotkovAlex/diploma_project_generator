import { ApiResponseProperty } from '@nestjs/swagger';
import { ResultDto } from './result.dto';

export class UserExistDto extends ResultDto {
  @ApiResponseProperty({
    type: 'object',
    example: {
      login: true,
      email: true,
    },
  })
  readonly data: object;
}

import { ApiResponseProperty } from '@nestjs/swagger';
import { ResultDto } from './result.dto';

export class UserEmptyFieldsDto extends ResultDto {
  @ApiResponseProperty({
    example: {
      login: true,
      email: true,
      password: true,
    },
  })
  data: object;
}

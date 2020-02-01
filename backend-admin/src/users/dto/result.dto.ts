import { ApiResponseProperty } from '@nestjs/swagger';

export class ResultDto {
  @ApiResponseProperty()
  status: number;

  @ApiResponseProperty()
  message: string;
}

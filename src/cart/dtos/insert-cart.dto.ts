import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class InsertCartDTO {
  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNumber()
  amount: number;
}

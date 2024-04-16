import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDTO {
  @ApiProperty()
  @IsNumber()
  addressId: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  amountPayments?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  codePix?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  datePayment?: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty()
  @IsString()
  lastPassword: string;

  @ApiProperty()
  @IsString()
  newPassword: string;
}

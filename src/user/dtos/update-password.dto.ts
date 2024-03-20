import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  lastPassword: string;

  @IsString()
  newPassword: string;
}

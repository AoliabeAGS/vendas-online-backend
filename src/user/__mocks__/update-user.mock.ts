import { UpdatePasswordDto } from '../dtos/update-password.dto';

export const updatePasswordMock: UpdatePasswordDto = {
  lastPassword: 'abc',
  newPassword: 'def',
};

export const updatePasswordInvalidMock: UpdatePasswordDto = {
  lastPassword: 'abc123',
  newPassword: 'def123',
};

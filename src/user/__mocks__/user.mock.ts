import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '12345678900',
  createdAt: new Date(),
  email: 'emailmock@email.com',
  id: 1654,
  name: 'User Mock',
  password: 'passwordmock',
  phone: '12345678900',
  typeUser: UserType.User,
  updatedAt: new Date(),
};

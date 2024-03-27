import { userEntityMock } from '../../user/__mocks__/user.mock';
import { CartEntity } from '../entities/cart.entity';

export const cartMock: CartEntity = {
  active: true,
  id: 119687,
  updatedAt: new Date(),
  createdAt: new Date(),
  userId: userEntityMock.id,
};

import { cityMock } from '../../city/__mocks__/city.mock';
import { AddressEntity } from '../entities/address.entity';
import { userEntityMock } from '../../user/__mocks__/user.mock';

export const addressMock: AddressEntity = {
  cep: '00000-000',
  cityId: cityMock.id,
  complement: 'complement',
  id: 1215,
  numberAddress: 1567,
  userId: userEntityMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

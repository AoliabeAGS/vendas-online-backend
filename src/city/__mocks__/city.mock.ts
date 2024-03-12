import { stateMock } from '../../state/__mocks__/state.mock';
import { CityEntity } from '../entities/city.entity';

export const cityMock: CityEntity = {
  createdAt: new Date(),
  updatedAt: new Date(),
  id: 12475,
  name: 'City Name Mock',
  stateId: stateMock.id,
};

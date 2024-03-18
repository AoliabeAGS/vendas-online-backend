import { categoryMock } from '../../category/__mocks__/category.mock';
import { ProductEntity } from '../entities/product.entity';

export const productMock: ProductEntity = {
  categoryId: categoryMock.id,
  createdAt: new Date(),
  id: 7435,
  image: 'https://image.com',
  name: 'Product Name mock',
  price: 35.5,
  updatedAt: new Date(),
};

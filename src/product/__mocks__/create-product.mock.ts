import { categoryMock } from '../../category/__mocks__/category.mock';
import { CreateProductDTO } from '../dtos/create-product.dto';

export const createProduct: CreateProductDTO = {
  name: 'Product 1',
  image: 'image.png',
  price: 100,
  categoryId: categoryMock.id,
};

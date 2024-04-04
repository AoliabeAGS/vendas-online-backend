import { categoryMock } from '../../category/__mocks__/category.mock';
import { UpdateProductDTO } from '../dtos/update-product.dto';

export const updateProductMock: UpdateProductDTO = {
  name: 'Product updated',
  image: 'image.png2',
  price: 500,
  categoryId: categoryMock.id,
};

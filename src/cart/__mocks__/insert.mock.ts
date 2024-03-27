import { productMock } from '../../product/__mocks__/product.mock';
import { InsertCartDTO } from '../dtos/insert-cart.dto';

export const insertCartMock: InsertCartDTO = {
  amount: 647,
  productId: productMock.id,
};

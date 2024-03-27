import { cartMock } from '../../cart/__mocks__/cart.mock';
import { CartProductEntity } from '../entities/cart-product.entity';
import { productMock } from '../../product/__mocks__/product.mock';

export const cartProductMock: CartProductEntity = {
  amount: 647,
  cartId: cartMock.id,
  productId: productMock.id,
  id: 11547,
  created_at: new Date(),
  updated_at: new Date(),
};

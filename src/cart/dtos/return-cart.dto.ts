import { ReturnCartProductDTO } from 'src/cart-product/dtos/return-cart-product.dto';
import { CartEntity } from '../entities/cart.entity';

export class ReturnCartDTO {
  id: number;
  cartProducts?: ReturnCartProductDTO[];

  constructor(cart: CartEntity) {
    this.id = cart.id;
    this.cartProducts = cart.cartProducts
      ? cart.cartProducts.map((product) => new ReturnCartProductDTO(product)) // Map each cart product to ReturnCartProductDTO
      : undefined;
  }
}

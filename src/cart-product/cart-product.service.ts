import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { CartProductEntity } from './entities/cart-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertCartDTO } from 'src/cart/dtos/insert-cart.dto';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { ProductService } from 'src/product/product.service';
import { UpdateCartDTO } from 'src/cart/dtos/update-cart.dto';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProductEntity)
    private readonly cartProductRepository: Repository<CartProductEntity>,
    private readonly productService: ProductService,
  ) {}

  async verifyProductInCart(
    productId: number,
    cartId: number,
  ): Promise<CartProductEntity> {
    const cartProduct = await this.cartProductRepository.findOne({
      where: {
        productId,
        cartId,
      },
    });
    if (!cartProduct) {
      throw new NotFoundException('Product not found in cart');
    }
    return cartProduct;
  }

  async createProductInCart(
    insertCartDTO: InsertCartDTO,
    cartId: number,
  ): Promise<CartProductEntity> {
    return this.cartProductRepository.save({
      amount: insertCartDTO.amount,
      productId: insertCartDTO.productId,
      cartId,
    });
  }

  async insertProductCart(
    insertCartDTO: InsertCartDTO,
    cart: CartEntity,
  ): Promise<CartProductEntity> {
    await this.productService.findProductById(insertCartDTO.productId);
    const cartProduct = await this.verifyProductInCart(
      insertCartDTO.productId,
      cart.id,
    ).catch(() => undefined);

    if (!cartProduct) {
      return this.createProductInCart(insertCartDTO, cart.id);
    }

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: insertCartDTO.amount + insertCartDTO.amount,
    });
  }
  async updateProductInCart(
    updateCartDTO: UpdateCartDTO,
    cart: CartEntity,
  ): Promise<CartProductEntity> {
    await this.productService.findProductById(updateCartDTO.productId);
    const cartProduct = await this.verifyProductInCart(
      updateCartDTO.productId,
      cart.id,
    );

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: updateCartDTO.amount,
    });
  }

  async deleteProductCart(
    productId: number,
    cartId: number,
  ): Promise<DeleteResult> {
    return await this.cartProductRepository.delete({
      productId,
      cartId,
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertCartDTO } from './dtos/insert-cart.dto';
import { CartProductService } from '../cart-product/cart-product.service';
import { UpdateCartDTO } from './dtos/update-cart.dto';

const LINE_AFFECTED = 1;

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    private readonly cartProductService: CartProductService,
  ) {}

  async clearCart(userId: number): Promise<DeleteResult> {
    const cart = await this.findCartByUserId(userId);
    await this.cartRepository.save({
      ...cart,
      active: false,
    });

    return {
      raw: [],
      affected: LINE_AFFECTED,
    };
  }

  async findCartByUserId(
    userId: number,
    isRelations?: boolean,
  ): Promise<CartEntity> {
    let query = this.cartRepository
      .createQueryBuilder('cart')
      .where('cart.userId = :userId', { userId })
      .andWhere('cart.active = :active', { active: true });

    if (isRelations) {
      query = query
        .leftJoinAndSelect('cart.cartProducts', 'cartProducts')
        .leftJoinAndSelect('cartProducts.product', 'product');
    }

    const cart = await query.getOne();

    if (!cart) {
      throw new NotFoundException('Cart active not found');
    }
    return cart;
  }
  async createCart(userId: number): Promise<CartEntity> {
    return await this.cartRepository.save({
      userId,
      active: true,
    });
  }

  async insertProductInCart(
    insertCartDTO: InsertCartDTO,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.findCartByUserId(userId).catch(async () => {
      return await this.createCart(userId);
    });

    await this.cartProductService.insertProductCart(insertCartDTO, cart);

    return cart;
  }

  async deleteProductCart(
    productId: number,
    userId: number,
  ): Promise<DeleteResult> {
    const cart = await this.findCartByUserId(userId);

    return await this.cartProductService.deleteProductCart(productId, cart.id);
  }

  async updateProductInCart(
    upadateCartDTO: UpdateCartDTO,
    userId: number,
  ): Promise<CartEntity> {
    const cart = await this.findCartByUserId(userId).catch(async () => {
      return await this.createCart(userId);
    });

    await this.cartProductService.updateProductInCart(upadateCartDTO, cart);

    return cart;
  }
}

import { CartProductEntity } from 'src/cart-product/entities/cart-product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'cart' })
export class CartEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'created_at' })
  updated_at: Date;

  @OneToMany(
    () => CartProductEntity,
    (cartProduct: CartProductEntity) => cartProduct.cart,
  )
  cartProducts?: CartProductEntity[];
}

// import { ProductEntity } from 'src/products/entities/product.entity';
// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   JoinColumn,
//   ManyToOne,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';

// @Entity({ name: 'cart_product' })
// export class CartProductEntity {
//   @PrimaryGeneratedColumn('rowid')
//   id: number;

//   @Column({ name: 'id_cart', nullable: false })
//   cartId: number;

//   @Column({ name: 'id_product', nullable: false })
//   productId: string;

//   @Column({ name: 'amount', nullable: false })
//   amount: number;

//   @CreateDateColumn({ name: 'created_at' })
//   createdAt: Date;

//   @UpdateDateColumn({ name: 'updated_at' })
//   updatedAt: Date;

//   @ManyToOne(
//     () => ProductEntity,
//     (productEntity: ProductEntity) => productEntity.cartProduct,
//   )
//   @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
//   product?: ProductEntity;
// }

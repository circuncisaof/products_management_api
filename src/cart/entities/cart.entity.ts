import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'id_product', nullable: false })
  id_product: string;
  @Column({ name: 'amount', nullable: false })
  amount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

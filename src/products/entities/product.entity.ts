import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 100, name: 'description' })
  name: string;

  @Column({ nullable: false, length: 200, name: 'description' })
  description: string;

  @Column({ nullable: false, name: 'product_value' })
  product_value: string;

  @Column({ nullable: false, name: 'category' })
  category: string;

  @Column({ nullable: false, name: 'product_value' })
  department: string;
}

import { DepartmenttEntity } from 'src/departments/entities/department.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'id_department', nullable: false })
  id_department: string;

  @Column({ nullable: false, length: 100, name: 'name' })
  name: string;

  @Column({ nullable: false, length: 200, name: 'description' })
  description: string;

  @Column({ nullable: false, name: 'product_value' })
  product_value: string;

  @Column({ nullable: false, name: 'amount' })
  amount: number;

  @Column({ nullable: false, name: 'category' })
  category?: string;

  @ManyToOne(
    () => DepartmenttEntity,
    (department: DepartmenttEntity) => department.product,
  )
  @JoinColumn({ name: 'id_department', referencedColumnName: 'id' })
  department?: DepartmenttEntity[];
}

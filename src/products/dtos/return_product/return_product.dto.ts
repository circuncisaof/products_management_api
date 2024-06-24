import { ReturnDepartment } from 'src/departments/dtos/return_department/return_department.dto';
import { ProductEntity } from 'src/products/entities/product.entity';

export class ReturnProductDto {
  id: string;
  name: string;
  description: string;
  amount: number;
  product_value: string;
  categories?: string;
  departments?: ReturnDepartment[];
  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id;
    this.name = productEntity.name;
    this.product_value = productEntity.product_value;
    this.categories = productEntity.category;
    this.amount = productEntity.amount;

    this.departments = productEntity.department.map(
      (department) => new ReturnDepartment(department),
    )
      ? productEntity.department.map(
          (department) => new ReturnDepartment(department),
        )
      : undefined;
  }
}

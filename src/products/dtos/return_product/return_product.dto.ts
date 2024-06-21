import { ProductEntity } from 'src/products/entities/product.entity';

export class ReturnProductDto {
  id: string;
  name: string;
  description: string;
  product_value: string;
  category: string;
  department: string;

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id;
    this.name = productEntity.name;
    this.description = productEntity.department;
    this.product_value = productEntity.product_value;
    this.category = productEntity.category;
    this.department = productEntity.department;
  }
}

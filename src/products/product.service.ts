import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { FilterProduct } from './dtos/filter_product.dto';
import { ProductDto } from './dtos/product.dto';
import { ReturnProductDto } from './dtos/return_product/return_product.dto';
import { updateProduct } from './dtos/update.product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private product_repository: Repository<ProductEntity>,
  ) {}

  async create_produt(data: ProductDto) {
    await this.existName(data.name);
    const product_new = await this.product_repository.create(data);
    const data_product = this.product_repository.save(product_new);
    return data_product;
  }
  async get_product_id(id: string): Promise<ProductDto> {
    return this.product_repository.findOneBy({ id });
  }

  async get_product_all(): Promise<ReturnProductDto[]> {
    const data = await this.product_repository.find({ order: { name: 'ASC' } });
    return data;
  }

  async filter(filterTasks: FilterProduct): Promise<ProductEntity[]> {
    const { id, name, category } = filterTasks;
    const conditions:
      | FindOptionsWhere<ProductEntity>
      | FindOptionsWhere<ProductEntity>[] = {
      ...(id ? { id } : {}),
      ...(name ? { name } : {}),
      ...(category ? { category } : {}),
    };

    const data_re = await this.product_repository.find({
      where: conditions,
    });
    if (!data_re) {
      return this.get_product_all();
    }
    return data_re;
  }

  async update_product(id: string, data: updateProduct) {
    return `UPdate Product ${id}, ${data} `;
  }

  async delete_product(id: string) {
    return this.product_repository.delete(id);
  }

  async existProduct(id: string) {
    const product = this.get_product_id(id);
    if (product) {
      throw new NotFoundException('Dont exist');
    }

    return product;
  }

  async existName(name: string) {
    const name_exist = await this.product_repository.findOneBy({ name });
    if (name_exist) {
      throw new NotFoundException('Dont exist');
    }
    return name_exist;
  }
}

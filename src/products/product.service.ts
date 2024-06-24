import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentService } from 'src/departments/department.service';
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
    private department_service: DepartmentService,
  ) {}

  async create_produt(data: ProductDto): Promise<ProductEntity> {
    try {
      await this.department_service.exist_department(data.id_department);
      await this.existName(data.name);

      const product_new = this.product_repository.create(data);
      const data_product = await this.product_repository.save(product_new);
      return data_product;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async get_product_id(id: string): Promise<ProductEntity> {
    try {
      return await this.product_repository.findOne({
        where: { id },
        relations: { department: true },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async get_product_all(): Promise<ReturnProductDto[]> {
    try {
      const datas = await this.product_repository.find({
        order: { name: 'ASC' },
      });
      console.log(datas);
      return datas;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async filter(filterTasks: FilterProduct): Promise<ProductEntity[]> {
    try {
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

      return data_re;
    } catch (error) {
      throw new BadRequestException(`Something wrong! ${error}`);
    }
  }

  async update_product(id: string, data: updateProduct) {
    try {
      await this.existProduct(id);
      await this.existName(data.name);

      if (!data.name.trim()) throw new BadRequestException('Product not null');
      if (!data.category.trim())
        throw new BadRequestException('Product not null');
      if (!data.product_value.trim())
        throw new BadRequestException('Product not null');
      if (!data.description.trim())
        throw new BadRequestException('Product not null');

      await this.product_repository.update(id, data);
      return this.existProduct(id);
    } catch (error) {
      throw new BadRequestException(`Something wrong! ${error}`);
    }
  }

  async delete_product(id: string) {
    try {
      await this.existProduct(id);
      return this.product_repository.delete(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async existProduct(id: string) {
    const product = this.get_product_id(id);
    if (!product) {
      throw new NotFoundException('this product does not exist!');
    }

    return product;
  }

  async existName(name: string) {
    const name_exist = await this.product_repository.findOneBy({ name });
    console.log(name_exist);

    if (name_exist) {
      throw new NotFoundException('Exist');
    }
    return name_exist;
  }
}

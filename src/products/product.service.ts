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
      const { name, category, product_value, description } = data;
      const isBlank =
        !name.trim() ||
        !category.trim() ||
        !product_value.trim() ||
        !description.trim();

      if (isBlank === true)
        throw new BadRequestException('Product fields cannot be null');

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
        order: { name: 'ASC' },
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

      if (datas.length === 0) throw new NotFoundException('Not found!');

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

      if (data_re.length === 0) throw new NotFoundException('Not found!');
      return data_re;
    } catch (error) {
      throw new BadRequestException(`Something wrong! ${error}`);
    }
  }

  async update_product(id: string, data: updateProduct) {
    try {
      await this.existProduct(id);
      await this.existName(data.name);

      const { name, category, product_value, description } = data;
      const isBlank =
        !name.trim() ||
        !category.trim() ||
        !product_value.trim() ||
        !description.trim();

      if (isBlank === true)
        throw new BadRequestException('Product fields cannot be null');

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
      throw new BadRequestException(`Something wrong! ${error}`);
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

    if (name_exist) {
      throw new NotFoundException('Exist');
    }
    return name_exist;
  }
}

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

  async create_produt(data: ProductDto): Promise<ProductDto> {
    await this.department_service.exist_department(data.id_department);
    await this.existName(data.name);

    const product_new = this.product_repository.create(data);
    const data_product = await this.product_repository.save(product_new);
    return data_product;
  }

  async get_product_id(id: string): Promise<ProductDto> {
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
      throw new BadRequestException('Not found/not exist this product!');
    }
    return data_re;
  }

  async update_product(id: string, data: updateProduct) {
    const exist_product = await this.existProduct(id);
    if (!exist_product) throw new BadRequestException('Product not exist');
    await this.product_repository.update(id, data);
    return this.existProduct(id);
  }

  async delete_product(id: string) {
    await this.existProduct(id);
    return this.product_repository.delete(id);
  }

  async existProduct(id: string) {
    const product = this.get_product_id(id);
    if (!product) {
      throw new NotFoundException('Exist product!');
    }

    return product;
  }

  async existName(name: string) {
    const name_exist = await this.product_repository.findOneBy({ name });
    console.log(name_exist);

    //     if (!name_exist) {
    //       throw new NotFoundException('Product not found');
    //     }
    //     return name_exist;
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FilterProduct } from './dtos/filter_product.dto';
import { ProductDto } from './dtos/product.dto';
import { updateProduct } from './dtos/update.product.dto';
import { ProductEntity } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly product_service: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create_produt(@Body() data: ProductDto) {
    return this.product_service.create_produt(data);
  }

  @Get('filter')
  @HttpCode(HttpStatus.OK)
  async filter(@Query() filterTasks: FilterProduct): Promise<ProductEntity[]> {
    if (Object.keys(filterTasks).length) {
      return await this.product_service.filter(filterTasks);
    } else {
      this.product_service.get_product_all();
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async get_product_id(@Param('id') id: string) {
    return this.product_service.get_product_id(id);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async get_product_all() {
    return await this.product_service.get_product_all();
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update_product(@Param('id') id: string, @Body() data: updateProduct) {
    return this.product_service.update_product(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete_product(@Param('id') id: string) {
    return this.product_service.delete_product(id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { FilterProduct } from './dtos/filter_product.dto';
import { ProductDto } from './dtos/product.dto';
import { updateProduct } from './dtos/update.product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly product_service: ProductService) {}

  @Post()
  async create_produt(@Body() data: ProductDto) {
    return this.product_service.create_produt(data);
  }
  @Get(':id')
  async get_product_id(@Param('id') id: string) {
    return this.product_service.get_product_id(id);
  }

  @Get()
  async get_product_all() {
    return this.product_service.get_product_all();
  }

  @Get('filter')
  async filter(@Query() filterTasks: FilterProduct): Promise<ProductDto[]> {
    console.log(filterTasks);
    if (Object.keys(filterTasks).length) {
      return await this.product_service.filter(filterTasks);
    } else {
      this.product_service.get_product_all();
    }
  }

  @Patch(':id')
  async update_product(@Param('id') id: string, data: updateProduct) {
    return this.product_service.update_product(id, data);
  }

  @Delete(':id')
  async delete_product(@Param('id') id: string) {
    return this.product_service.delete_product(id);
  }
}

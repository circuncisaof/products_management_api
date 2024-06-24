import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { InsertCart } from './dtos/cart.dto';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create_card(@Body() data: InsertCart) {
    return this.cartService.create_card(data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete_cart(@Param('id') id: string) {
    return await this.cartService.delete_cart(id);
  }
}

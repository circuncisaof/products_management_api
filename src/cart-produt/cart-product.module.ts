import { Module } from '@nestjs/common';
import { CartProductService } from './cart-product.service';

@Module({
  imports: [],
  providers: [CartProductService],
})
export class CartProduct {}

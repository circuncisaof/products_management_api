import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/products/product.service';
import { Repository } from 'typeorm';
import { InsertCart } from './dtos/cart.dto';
import { CartEntity } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cart_repo: Repository<CartEntity>,
    private product_repo: ProductService,
  ) {}

  async create_card(data: InsertCart): Promise<InsertCart> {
    try {
      const cart_product = await this.product_repo.existProduct(
        data.id_product,
      );

      if (data.amount >= cart_product.amount)
        throw new BadRequestException('Higher value as we do not have stock');

      await this.cart_repo.create(data);
      return await this.cart_repo.save(data);
    } catch (error) {
      throw new BadRequestException(`Something wrong! ${error} `);
    }
  }

  async delete_cart(id: string) {
    try {
      await this.existCart(id);
      return await this.cart_repo.delete(id);
    } catch (error) {
      throw new BadRequestException(`Something wrong! ${error} `);
    }
  }

  async existCart(id: string) {
    const cart = this.cart_repo.findOneBy({ id });
    if (!cart) {
      throw new NotFoundException('This cart does not exist!');
    }

    return cart;
  }
}

import { IsNotEmpty, IsString } from 'class-validator';

export class ProductDto {
  @IsNotEmpty({ message: 'name field cannot be null' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'description field cannot be null' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'product_value field cannot be null' })
  @IsString()
  product_value: string;
}

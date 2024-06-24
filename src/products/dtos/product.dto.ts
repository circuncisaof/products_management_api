import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsNotEmpty({ message: 'department field cannot be null' })
  @IsString()
  id_department: string;

  @IsNotEmpty({ message: 'name field cannot be null' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'description field cannot be null' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'amount field cannot be null' })
  @IsNumber()
  amount: number;

  @IsNotEmpty({ message: 'product_value field cannot be null' })
  @IsString()
  product_value: string;

  @IsNotEmpty({ message: 'Category field cannot be null' })
  @IsString()
  category: string;
}

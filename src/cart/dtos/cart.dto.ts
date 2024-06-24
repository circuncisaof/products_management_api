import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InsertCart {
  @IsNotEmpty({ message: 'id field cannot be null' })
  @IsString()
  id_product: string;
  @IsNotEmpty({ message: 'Amount field cannot be null' })
  @IsNumber()
  amount: number;
}

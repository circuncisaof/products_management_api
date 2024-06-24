import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDepartment {
  @IsNotEmpty({ message: 'Name description cannot be empty' })
  @IsString()
  name: string;
}

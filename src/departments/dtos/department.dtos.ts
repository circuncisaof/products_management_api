import { IsString } from 'class-validator';

export class CreateDepartment {
  @IsString()
  name: string;
}

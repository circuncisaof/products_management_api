import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartment } from './dtos/department.dtos';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly department: DepartmentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create_department(@Body() data: CreateDepartment) {
    return this.department.create_department(data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete_department(@Param('id') id: string) {
    return this.department.delete_department(id);
  }
}

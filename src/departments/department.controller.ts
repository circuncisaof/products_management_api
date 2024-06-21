import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
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
}

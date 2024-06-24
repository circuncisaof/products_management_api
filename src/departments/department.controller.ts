import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartment } from './dtos/department.dtos';
import { DepartmentUpdate } from './dtos/department.update.dto';
import { ReturnDepartment } from './dtos/return_department/return_department.dto';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly department: DepartmentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create_department(@Body() data: CreateDepartment) {
    return this.department.create_department(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async get_department_all() {
    return this.department.get_department_all();
  }
  @Get(':id')
  async get_department_id(@Param('id') id: string): Promise<ReturnDepartment> {
    return this.department.get_department_id(id);
  }
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update_department(
    @Param('id') id: string,
    @Body() data: DepartmentUpdate,
  ) {
    return await this.department.update_department(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete_department(@Param('id') id: string) {
    return this.department.delete_department(id);
  }
}

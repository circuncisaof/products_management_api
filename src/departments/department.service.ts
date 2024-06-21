import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartment } from './dtos/department.dtos';
import { DepartmenttEntity } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(DepartmenttEntity)
    private department_repo: Repository<DepartmenttEntity>,
  ) {}

  async create_department(data: CreateDepartment) {
    const new_data_dep = await this.department_repo.create(data);
    return this.department_repo.save(new_data_dep);
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDepartment } from './dtos/department.dtos';
import { DepartmentUpdate } from './dtos/department.update.dto';
import { ReturnDepartment } from './dtos/return_department/return_department.dto';
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

  async get_department_all(): Promise<ReturnDepartment[]> {
    try {
      return await this.department_repo.find({ order: { name: 'ASC' } });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async get_department_id(id: string): Promise<CreateDepartment> {
    try {
      return this.department_repo.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update_department(id: string, data: DepartmentUpdate) {
    return `UPdate Product ${id}, ${data} `;
  }

  async delete_department(id: string) {
    return this.department_repo.delete(id);
  }

  async exist_department(id: string) {
    const dep = await this.get_department_id(id);

    if (!dep) throw new BadRequestException('Department its not exist');

    return dep;
  }
}

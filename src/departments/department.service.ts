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

  async create_department(data: CreateDepartment): Promise<CreateDepartment> {
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

  async get_department_id(id: string): Promise<ReturnDepartment> {
    try {
      return await this.department_repo.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException(`Something happened! ${error}`);
    }
  }

  async update_department(id: string, data: DepartmentUpdate) {
    try {
      await this.exist_department('id');
      await this.department_repo.update(id, data);
      const new_data = await this.get_department_id(id);
      return new_data;
    } catch (error) {
      throw new BadRequestException(`Something happened! ${error} ${id}`);
    }
  }

  async delete_department(id: string) {
    try {
      await this.exist_department(id);
      return this.department_repo.delete(id);
    } catch (error) {
      throw new BadRequestException(`Something happened! ${id} invalid`);
    }
  }

  async exist_department(id: string) {
    const dep = await this.get_department_id(id);
    if (!dep)
      throw new BadRequestException(
        `Type ${id} invalid or Department its not exist`,
      );

    return dep;
  }
}

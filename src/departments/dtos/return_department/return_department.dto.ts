import { DepartmenttEntity } from 'src/departments/entities/department.entity';

export class ReturnDepartment {
  name: string;
  constructor(department_entity: DepartmenttEntity) {
    this.name = department_entity.name;
  }
}

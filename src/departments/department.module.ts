import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { DepartmenttEntity } from './entities/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmenttEntity])],
  controllers: [DepartmentController],
  providers: [DepartmentService],
})
export class DepartmentModule {}

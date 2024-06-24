import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/product.module';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { DepartmenttEntity } from './entities/department.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DepartmenttEntity]),
    forwardRef(() => ProductsModule),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [DepartmentService],
})
export class DepartmentModule {}

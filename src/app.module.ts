import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from './departments/department.module';
import { DepartmenttEntity } from './departments/entities/department.entity';
import { ProductEntity } from './products/entities/product.entity';
import { ProductsModule } from './products/product.module';

@Module({
  imports: [
    ProductsModule,
    DepartmentModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'mari0001',
      database: 'postgres',
      entities: [ProductEntity, DepartmenttEntity],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

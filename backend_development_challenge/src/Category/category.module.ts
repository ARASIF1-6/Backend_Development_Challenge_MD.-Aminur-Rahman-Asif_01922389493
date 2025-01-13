import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './category.controller';
import { Category, CategorySchema } from './category.schema';
import { CategoryService } from './category.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]), CategoryService], // Export CategryService for use another module
})
export class CategoryModule {}

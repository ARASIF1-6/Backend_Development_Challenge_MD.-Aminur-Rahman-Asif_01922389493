import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.schema';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async addCategory(category: Category): Promise<Category | string> {
    try{
      const exist_category = await this.categoryModel.findOne({name:category.name});
      if(exist_category){
        return 'Category name is already existing into database';
      }
      else{
        const createdCategory = new this.categoryModel(category);
        return createdCategory.save();
      }
    }
    catch{
      throw new BadRequestException("Failed to category registration");
    }
  }
}

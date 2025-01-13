import { Body, Controller, Get, Post, InternalServerErrorException, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './category.dto';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('addcategory')
  @UsePipes(new ValidationPipe)
  addCategory(@Body() myobj: CategoryDTO): object {
    try{
        return this.categoryService.addCategory(myobj);
    }
    catch{
        throw new InternalServerErrorException("Failed to add category");
    }
}
}

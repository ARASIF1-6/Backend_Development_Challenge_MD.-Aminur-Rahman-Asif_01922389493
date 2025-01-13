import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Category } from 'src/Category/category.schema';
import { generateProductCode } from "./product.generate_code";
import { ProductFilterDTO, UpdateProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>, @InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async addProduct(product: Product): Promise<Product | string> {
    try{
      const category = await this.categoryModel.findOne({name:product.category});
      if(category){
        product.category = category.name;
        product.productCode = generateProductCode(product.name)
        const createdProduct = new this.productModel(product);
        return createdProduct.save();
      }
      else{
        return 'Category is not valid';
      }
    }
    catch{
      throw new BadRequestException("Failed to product registration");
    }
  }

  async updateProduct(product_code:string, UpdateProduct:UpdateProductDTO):Promise<Product>{
    try{
      await this.productModel.updateOne({ productCode: product_code }, { $set: UpdateProduct });
      return await this.productModel.findOne({productCode:product_code});
    }
    catch{
      throw new BadRequestException("Failed to update product");
    }
  }

  async getProducts(filter: ProductFilterDTO): Promise<Product[]> {
    try{
      if(filter.category && filter.name){
        const products = await this.productModel.find({category: filter.category, name: {$regex: filter.name, $options: 'i'}});
        return products.map((product) => ({
          ...product.toObject(),
          final_price: product.price - (product.price * (product.discount / 100)),
        }));
      }
      else if(filter.category){
        const products = await this.productModel.find({category: filter.category});
        return products.map((product) => ({
          ...product.toObject(),
          final_price: product.price - (product.price * (product.discount / 100)),
        }));
      }
      else{
        const products = await this.productModel.find({name: {$regex: filter.name, $options: 'i'}});
        return products.map((product) => ({
          ...product.toObject(),
          final_price: product.price - (product.price * (product.discount / 100)),
        }));
      }
    }
    catch{
      throw new BadRequestException("Failed to fetch products");
    }
  }
  
  
  
  
}

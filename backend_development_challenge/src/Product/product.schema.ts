import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Double, HydratedDocument, ObjectId, Types } from 'mongoose';
import { Category } from 'src/Category/category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop({ required: true })
    name: string;
  
    @Prop({ required: true })
    description: string;
  
    @Prop({ required: true, type: Number })
    price: number;
  
    @Prop({ required: false, type: Number, default: 0 })
    discount: number;
  
    @Prop({ required: false })
    image: string;
  
    @Prop({ required: true, enum: ['In Stock', 'Stock Out'] })
    status: string;
  
    @Prop({ required: false, unique: true })
    productCode: string;
  
    @Prop({ type: String, ref: Category.name, required: true })
    category: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

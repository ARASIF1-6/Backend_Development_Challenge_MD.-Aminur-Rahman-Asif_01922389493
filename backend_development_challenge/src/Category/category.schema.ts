import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from 'src/Product/product.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
    @Prop({ required: true, unique: true })
    name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

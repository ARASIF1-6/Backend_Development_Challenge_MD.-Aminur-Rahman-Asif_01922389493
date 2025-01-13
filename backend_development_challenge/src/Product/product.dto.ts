import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class ProductDTO{
    
    @IsNotEmpty({ message: 'Please enter a valid product name' })
    @IsString()
    @Matches(/^[A-Za-z\s]+$/, { message: 'Product name field should contain only alphabetic character' })
    name: string;

    @IsNotEmpty({ message: 'Please enter a valid product description' })
    @IsString()
    description: string;

    @IsNotEmpty({ message: 'Please enter a product price' })
    @IsString()
    @Matches(/^[0-9]+$/, { message: 'Product price field must contain only digits' })
    price: number;

    @IsString()
    @Matches(/^\d+\.\d{2}$/, { message: 'Product discount field must be a valid decimal number with two digits after the decimal' })
    discount: number;

    @Optional()
    image: string;

    @IsNotEmpty({ message: 'Please enter a valid product status' })
    @IsString()
    @Matches(/^['In Stock', 'Stock Out']+$/, { message: 'Product status field should contain only In Stock or Stock Out' })
    status: string;

    @Optional()
    productCode: string;

    @IsNotEmpty({ message: 'Please enter a product category' })
    @IsString()
    @Matches(/^[A-Za-z]+$/, { message: 'Product category field should contain only alphabetic character' })
    category: any;

}

export class UpdateProductDTO{

    @IsOptional()
    @IsNotEmpty({ message: 'Please enter a valid product description' })
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    @Matches(/^\d+\.\d{2}$/, { message: 'Product discount field must be a valid decimal number with two digits after the decimal' })
    discount: number;

    @IsOptional()
    @IsNotEmpty({ message: 'Please enter a valid product status' })
    @IsString()
    @Matches(/^['In Stock', 'Stock Out']+$/, { message: 'Product status field should contain only In Stock or Stock Out' })
    status: string;

}

export class ProductFilterDTO{

    @Optional()
    category: string;

    @Optional()
    name: string;

}
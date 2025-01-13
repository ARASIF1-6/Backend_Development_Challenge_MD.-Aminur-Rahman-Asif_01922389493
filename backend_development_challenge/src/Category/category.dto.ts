import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsString, Matches } from "class-validator";


export class CategoryDTO{
    
    @IsNotEmpty({ message: 'Please enter a valid category name' })
    @IsString()
    @Matches(/^[A-Za-z\s]+$/, { message: 'Category name field should contain only alphabetic character' })
    name: string;

}
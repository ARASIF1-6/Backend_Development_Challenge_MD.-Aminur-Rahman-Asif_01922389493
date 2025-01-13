import { Body, Controller, Get, Post, InternalServerErrorException, UploadedFile, UseInterceptors, UsePipes, ValidationPipe, Param, Put, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { ProductService } from './product.service';
import { ProductDTO, ProductFilterDTO, UpdateProductDTO } from './product.dto';
import { promises } from 'dns';

@Controller()
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('addproduct')
    @UseInterceptors(FileInterceptor('productPic',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 100000000 },
            storage: diskStorage({
                destination: './upload',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    @UsePipes(new ValidationPipe)
    addProduct(@Body() myobj: ProductDTO, @UploadedFile() myfile: Express.Multer.File): object {
        try{
            myobj.image = myfile.filename;
            return this.productService.addProduct(myobj);
        }
        catch{
            throw new InternalServerErrorException("Failed to add product");
        }
    }

    @Put('/update_product/:product_code')
    @UsePipes(new ValidationPipe)
    updateProduct(@Param('product_code') product_code: string, @Body() UpdateProduct: UpdateProductDTO): object
    {
        try{
          return this.productService.updateProduct(product_code, UpdateProduct);
        }
        catch{
            throw new InternalServerErrorException("Failed to update product");
        }
    }

    @Get('/getproduct')
    async getProducts(@Body() filterDto: ProductFilterDTO): Promise<object> {

        try{
            return await this.productService.getProducts(filterDto);
        }
        catch{
            throw new InternalServerErrorException("Failed to fetch products");
        }
    }

}

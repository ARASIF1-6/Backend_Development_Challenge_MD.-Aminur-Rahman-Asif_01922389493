import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './Category/category.module';
import { ProductModule } from './Product/product.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/Backend_Development_Challenge'), ProductModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

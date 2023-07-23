import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { getMulterOptions, renameUploadedFile } from '@helpers/fileUploader';
import { PRODUCTS_IMAGES_FOLDER_PATH } from 'src/consts/storagePaths';

@Controller({ path: 'products' })
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAllProducts() {
    const products = await this.productService.getAllProducts();
    return { status: 'ok', data: products };
  }

  @Get('/favorites')
  @HttpCode(200)
  async getFavorites(@Query() { ids }) {
    const numericIds = ids.split(',').map((id) => Number(id));
    const favoritedProducts = await this.productService.getFavorites(
      numericIds,
    );
    return { status: 'ok', data: favoritedProducts };
  }

  @Get('/:id')
  @HttpCode(200)
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    const productData = await this.productService.getProductData(id);
    return { status: 'ok', data: productData };
  }

  @Post('/')
  @HttpCode(201)
  @UseInterceptors(
    FileInterceptor('image', getMulterOptions('images/products')),
  )
  async createProduct(
    @Body() body: any,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const renamedFilename = renameUploadedFile(
      image.filename,
      PRODUCTS_IMAGES_FOLDER_PATH,
    );
    await this.productService.createProduct({
      ...body,
      price: parseFloat(body.price),
      priceDiscounted: parseFloat(body.priceDiscounted),
      image: renamedFilename,
    });
    return { status: 'ok' };
  }

  @Put('/:id')
  @HttpCode(200)
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    this.productService.updateProductData(id, body);
    return { status: 'ok' };
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    this.productService.deleteProduct(id);
    return { status: 'ok' };
  }
}

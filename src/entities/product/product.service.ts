import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts() {
    return await this.productRepository.find({});
  }

  async getProductData(id: number) {
    return await this.productRepository.findOne({ where: { id } });
  }

  async getFavorites(ids: number[]) {
    return await this.productRepository.findBy({
      id: In(ids),
    });
  }

  async createProduct(productData: any) {
    const newProduct = this.productRepository.create({ ...productData });
    return await this.productRepository.save(newProduct);
  }

  async updateProductData(id: number, body: any) {
    return await this.productRepository.update({ id }, body);
  }

  async deleteProduct(id: number) {
    return await this.productRepository.delete(id);
  }
}

import { Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { PaginationDto } from 'src/common/dtos';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientGrpcProxy
  ) {}

  @Post()
  createPoduct() {
    return 'Crea un producto'
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'findAll_products' }, paginationDto)
  }
}

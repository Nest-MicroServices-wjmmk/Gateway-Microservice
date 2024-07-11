import { Controller, Get, Inject, Param, Post, Query } from '@nestjs/common';
import { ClientGrpcProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientGrpcProxy
  ) {}
  

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'findAll_products' }, paginationDto);
  }

  @Get(':id')
  async finOneProduct(@Param('id') id: string) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({ cmd: 'findOne_product' }, { id })
      );

      return product
    } catch (err) {
      throw new RpcException(err);
      
    }
  }

  @Post()
  createPoduct() {
    return 'Crea un producto';
  }
}

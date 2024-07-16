import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientGrpcProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PRODUCT_SERVICE } from 'src/config';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientGrpcProxy
  ) {}
  
  @Post()
  async createPoduct(@Body() createProductDto: CreateProductDto) {
    
    const product = await firstValueFrom(
      this.productsClient.send({ cmd: 'create_product' }, createProductDto)
      );
    return product;
  }

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

  @Patch(':id')
  async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    const product = await firstValueFrom(
      this.productsClient.send({ cmd: 'update_product' }, { id, ...updateProductDto })
      .pipe( catchError( err => { throw new RpcException(err)} ))
    );
    return product;
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    const product = await firstValueFrom(
      this.productsClient.send({ cmd: 'delete_product' }, { id })
      .pipe( catchError( err => { throw new RpcException(err)} ))
    );
    return product;
  }
}

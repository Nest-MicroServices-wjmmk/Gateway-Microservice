import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) {}
  
  @Post()
  async createPoduct(@Body() createProductDto: CreateProductDto) {
    const product = await firstValueFrom(
      this.client.send({ cmd: 'create_product' }, createProductDto)
      );
    return product;
  }

  @Get()
  async findAllProducts(@Query() paginationDto: PaginationDto) {
    try {
      const products = await firstValueFrom(
        this.client.send({ cmd: 'findAll_products' }, paginationDto)
      );
      return products;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @Get(':id')
  async finOneProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await firstValueFrom(this.client.send({ cmd: 'findOne_product' }, { id }));
      return product;
    } catch (err) {
      throw new RpcException(err.message);
      //throw new BadRequestException(err.message);
    }
  }

  @Patch(':id')
  async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    const product = await firstValueFrom(
      this.client.send({ cmd: 'update_product' }, { id, ...updateProductDto })
      .pipe( catchError( err => { throw new RpcException(err)} ))
    );
    return product;
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    const product = await firstValueFrom(
      this.client.send({ cmd: 'delete_product' }, { id })
      .pipe( catchError( err => { throw new RpcException(err)} ))
    );
    return product;
  }
}

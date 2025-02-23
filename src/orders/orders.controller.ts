import { BadRequestException, Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ORDER_SERVICE } from 'src/config';
import { CreateOrderDto } from './dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('orders')
export class OrdersController {
   constructor(
      @Inject(ORDER_SERVICE) private readonly ordersClient: ClientGrpcProxy
    ) {}

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
      const order = await firstValueFrom(
        this.ordersClient.send('createOrder', createOrderDto)
      );
      return order;
    }

    @Get()
    findAllOrders(@Query() paginationDto: PaginationDto) {
      try {
        return this.ordersClient.send('findAllOrders', paginationDto);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }

    @Get(':id')
    findOrderById(@Param('id', ParseIntPipe) id: number) {
      try {
        return this.ordersClient.send('findOneOrder', id);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
    }
}



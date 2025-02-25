import { BadRequestException, Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientGrpcProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ORDER_SERVICE } from 'src/config';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientGrpcProxy
  ) { }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    const order = await firstValueFrom(
      this.ordersClient.send('createOrder', createOrderDto)
    );
    return order;
  }

  @Get()
  findAllOrders(@Query() orderPaginationDto: OrderPaginationDto) {
    try {
      return this.ordersClient.send('findAllOrders', orderPaginationDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('id/:id')
  async findOrderById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send('findOneOrder', { id })
      );
      return order;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @Get(':status')
  async findAllOrdersByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto
  ) {
    try {
      return this.ordersClient.send('findAllOrders', { 
        ...paginationDto,
        status: statusDto.status
      })
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @Patch(':id')
  async changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ) {
    try {
      return this.ordersClient.send('changeOrderStatus', { id, status: statusDto.status });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}



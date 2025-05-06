import { Body, Controller, Get, Inject, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy
  ) { }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await firstValueFrom(
        this.client.send({ cmd: 'createOrder'}, createOrderDto)
      );
      return order;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @Get( )
  async findAllOrders(@Query() orderPaginationDto: OrderPaginationDto) {
    try {
      const orders = await firstValueFrom(
        this.client.send({ cmd: 'findAllOrders'}, orderPaginationDto)
      )
      return orders;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  @Get('id/:id')
  async findOrderById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const order = await firstValueFrom(
        this.client.send({ cmd: 'findOneOrder'}, { id })
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
      return this.client.send({ cmd: 'findAllOrders'}, { 
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
      return this.client.send({ cmd: 'changeOrderStatus'}, { id, status: statusDto.status });
    } catch (error) {
      throw new RpcException(error.message);
    }
  }
}



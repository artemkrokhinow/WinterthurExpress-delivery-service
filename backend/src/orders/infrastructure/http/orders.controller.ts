import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderCommand } from '../../application/commands/create-order/create-order.command';
import { GetOrdersQuery } from '../../application/queries/get-orders/get-orders.query';
import { GetOrderByIdQuery } from '../../application/queries/get-order-by-id/get-order-by-id.query';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    const command = new CreateOrderCommand(
      dto.senderEmail,
      dto.senderName,
      dto.senderPhone,
      dto.recipientName,
      dto.recipientPhone,
      dto.routeFrom,
      dto.routeTo,
      dto.packageType,
      dto.weightCategory,
      dto.declaredValueAmount,
      dto.declaredValueCurrency,
      dto.senderId,
    );

    const orderId = await this.commandBus.execute(command);
    return { success: true, orderId };
  }

  @Get()
  async getOrders() {
    return this.queryBus.execute(new GetOrdersQuery());
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return this.queryBus.execute(new GetOrderByIdQuery(id));
  }
}

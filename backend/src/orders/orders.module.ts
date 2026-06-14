import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { OrdersController } from './infrastructure/http/orders.controller';
import { CreateOrderHandler } from './application/commands/create-order/create-order.handler';
import { GetOrdersHandler } from './application/queries/get-orders/get-orders.handler';
import { GetOrderByIdHandler } from './application/queries/get-order-by-id/get-order-by-id.handler';
import { ORDER_REPOSITORY } from './domain/repositories/order.repository.interface';
import { PrismaOrderRepository } from './infrastructure/persistence/prisma-order.repository';

const CommandHandlers = [CreateOrderHandler];
const QueryHandlers = [GetOrdersHandler, GetOrderByIdHandler];

@Module({
  imports: [CqrsModule],
  controllers: [OrdersController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    {
      provide: ORDER_REPOSITORY,
      useClass: PrismaOrderRepository,
    },
  ],
})
export class OrdersModule {}

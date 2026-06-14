import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrdersQuery } from './get-orders.query';
import { Inject } from '@nestjs/common';
import { ORDER_REPOSITORY } from '../../../../orders/domain/repositories/order.repository.interface';
import type { IOrderRepository } from '../../../../orders/domain/repositories/order.repository.interface';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) { }

  async execute(query: GetOrdersQuery): Promise<any[]> {
    const orders = await this.orderRepository.findAll();

    return orders.map(order => {
      const plain = order.toPlain();
      return {
        id: plain.id,
        senderName: plain.senderName,
        senderPhone: plain.senderPhone,
        recipientName: plain.recipientName,
        recipientPhone: plain.recipientPhone,
        routeFrom: plain.route.addressFrom,
        routeTo: plain.route.addressTo,
        packageType: plain.packageType,
        weightCategory: plain.weightCategory,
        declaredValueAmount: plain.declaredValueAmount,
        declaredValueCurrency: plain.declaredValueCurrency,
        status: plain.status,
        createdAt: plain.createdAt,
      };
    });
  }
}

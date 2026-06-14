import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderByIdQuery } from './get-order-by-id.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { ORDER_REPOSITORY } from '../../../../orders/domain/repositories/order.repository.interface';
import type { IOrderRepository } from '../../../../orders/domain/repositories/order.repository.interface';

@QueryHandler(GetOrderByIdQuery)
export class GetOrderByIdHandler implements IQueryHandler<GetOrderByIdQuery> {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) { }

  async execute(query: GetOrderByIdQuery): Promise<any> {
    const order = await this.orderRepository.findById(query.id);
    
    if (!order) {
      throw new NotFoundException(`Order with ID ${query.id} not found`);
    }

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
  }
}

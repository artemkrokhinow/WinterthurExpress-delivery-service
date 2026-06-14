import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from './create-order.command';
import { Inject } from '@nestjs/common';
import { ORDER_REPOSITORY } from '../../../../orders/domain/repositories/order.repository.interface';
import type { IOrderRepository } from '../../../../orders/domain/repositories/order.repository.interface';
import { OrderEntity } from '../../../../orders/domain/entities/order.entity';
import { Money } from '../../../../shared/domain/value-objects/money.vo';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async execute(command: CreateOrderCommand): Promise<string> {
    const declaredValue = Money.create(command.declaredValueAmount, command.declaredValueCurrency);

    const order = OrderEntity.create({
      senderName: command.senderName,
      senderPhone: command.senderPhone,
      recipientName: command.recipientName,
      recipientPhone: command.recipientPhone,
      route: {
        addressFrom: command.routeFrom,
        addressTo: command.routeTo,
      },
      packageType: command.packageType,
      weightCategory: command.weightCategory,
      declaredValue,
      senderId: command.senderId,
      senderEmail: command.senderEmail,
    });

    await this.orderRepository.save(order);

    return order.id;
  }
}

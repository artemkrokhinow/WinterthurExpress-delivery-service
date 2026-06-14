import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { OrderEntity } from '../../domain/entities/order.entity';
import { PrismaService } from '../../../shared/infrastructure/persistence/prisma.service';
import { OrderStatus } from '../../domain/enums/order-status.enum';
import { Money } from '../../../shared/domain/value-objects/money.vo';

@Injectable()
export class PrismaOrderRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(order: OrderEntity): Promise<void> {
    await this.prisma.order.upsert({
      where: { id: order.id },
      create: {
        id: order.id,
        senderId: (order as any).props.senderId,
        senderEmail: (order as any).props.senderEmail,
        senderName: (order as any).props.senderName,
        senderPhone: (order as any).props.senderPhone,
        recipientName: (order as any).props.recipientName,
        recipientPhone: (order as any).props.recipientPhone,
        routeFrom: order.route.addressFrom,
        routeTo: order.route.addressTo,
        packageType: (order as any).props.packageType,
        weightCategory: (order as any).props.weightCategory,
        declaredValueAmount: order.declaredValue.amount,
        declaredValueCurrency: order.declaredValue.currency,
        status: order.status,
        paymentStatus: (order as any).props.paymentStatus,
        paymentMethod: (order as any).props.paymentMethod,
        amountPaid: (order as any).props.amountPaid,
      },
      update: {
        status: order.status,
        paymentStatus: (order as any).props.paymentStatus,
        paymentMethod: (order as any).props.paymentMethod,
        amountPaid: (order as any).props.amountPaid,
      },
    });
  }

  async findById(id: string): Promise<OrderEntity | null> {
    const raw = await this.prisma.order.findUnique({ where: { id } });
    if (!raw) return null;

    return OrderEntity.reconstitute(
      {
        senderId: raw.senderId || undefined,
        senderEmail: raw.senderEmail || undefined,
        senderName: raw.senderName,
        senderPhone: raw.senderPhone,
        recipientName: raw.recipientName,
        recipientPhone: raw.recipientPhone,
        route: {
          addressFrom: raw.routeFrom,
          addressTo: raw.routeTo,
        },
        packageType: raw.packageType as any,
        weightCategory: raw.weightCategory,
        declaredValue: Money.create(raw.declaredValueAmount, raw.declaredValueCurrency),
        status: raw.status as any,
        paymentStatus: raw.paymentStatus as any,
        paymentMethod: raw.paymentMethod as any,
        amountPaid: raw.amountPaid,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }

  async findAll(): Promise<OrderEntity[]> {
    const rawOrders = await this.prisma.order.findMany();
    return rawOrders.map((raw: any) =>
      OrderEntity.reconstitute(
        {
          senderId: raw.senderId || undefined,
          senderEmail: raw.senderEmail || undefined,
          senderName: raw.senderName,
          senderPhone: raw.senderPhone,
          recipientName: raw.recipientName,
          recipientPhone: raw.recipientPhone,
          route: {
            addressFrom: raw.routeFrom,
            addressTo: raw.routeTo,
          },
          packageType: raw.packageType as any,
          weightCategory: raw.weightCategory,
          declaredValue: Money.create(raw.declaredValueAmount, raw.declaredValueCurrency),
          status: raw.status as any,
          paymentStatus: raw.paymentStatus as any,
          paymentMethod: raw.paymentMethod as any,
          amountPaid: raw.amountPaid,
          createdAt: raw.createdAt,
        },
        raw.id,
      ),
    );
  }
}

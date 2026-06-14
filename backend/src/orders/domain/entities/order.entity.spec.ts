import { OrderEntity } from './order.entity';
import { Money } from '../../../shared/domain/value-objects/money.vo';
import { OrderStatus } from '../enums/order-status.enum';

describe('OrderEntity', () => {
  const validProps = {
    senderName: 'John Doe',
    senderPhone: '+41791234567',
    recipientName: 'Jane Smith',
    recipientPhone: '+41797654321',
    route: { addressFrom: 'Zurich', addressTo: 'Winterthur' },
    packageType: 'documents' as const,
    weightCategory: 'up-to-1kg',
  };

  it('should successfully create a pending order with valid data', () => {
    const declaredValue = Money.create(100, 'CHF');
    const order = OrderEntity.create({ ...validProps, declaredValue });

    expect(order).toBeDefined();
    expect(order.id).toBeDefined();
    expect(order.status).toBe(OrderStatus.PENDING);
    expect(order.declaredValue.amount).toBe(100);
  });

  it('should throw an error if declared value exceeds 50000', () => {
    const declaredValue = Money.create(50001, 'CHF');

    expect(() => {
      OrderEntity.create({ ...validProps, declaredValue });
    }).toThrow('Declared value exceeds maximum allowed compensation (50000)');
  });

  it('should change status from PENDING to IN_TRANSIT', () => {
    const declaredValue = Money.create(100, 'CHF');
    const order = OrderEntity.create({ ...validProps, declaredValue });

    order.markAsInTransit();
    expect(order.status).toBe(OrderStatus.IN_TRANSIT);
  });

  it('should throw an error if trying to deliver a PENDING order directly', () => {
    const declaredValue = Money.create(100, 'CHF');
    const order = OrderEntity.create({ ...validProps, declaredValue });

    expect(() => {
      order.markAsDelivered();
    }).toThrow('Order must be in transit to be delivered');
  });

  it('should throw an error if trying to cancel a DELIVERED order', () => {
    const declaredValue = Money.create(100, 'CHF');
    const order = OrderEntity.create({ ...validProps, declaredValue });

    order.markAsInTransit();
    order.markAsDelivered();

    expect(() => {
      order.cancel();
    }).toThrow('Delivered orders cannot be canceled');
  });
});

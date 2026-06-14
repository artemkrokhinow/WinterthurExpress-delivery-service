import { Entity } from '../../../shared/domain/entity';
import { Money } from '../../../shared/domain/value-objects/money.vo';
import { OrderStatus } from '../enums/order-status.enum';

interface RouteProps {
  addressFrom: string;
  addressTo: string;
}

interface OrderProps {
  senderId?: string;
  senderEmail?: string;
  senderName: string;
  senderPhone: string;
  recipientName: string;
  recipientPhone: string;
  route: RouteProps;
  packageType: 'documents' | 'cargo';
  weightCategory: string;
  declaredValue: Money;
  status: OrderStatus;
  paymentStatus: 'PENDING_PAYMENT' | 'PAID' | 'FAILED';
  paymentMethod: 'PAYPAL' | 'TWINT' | null;
  amountPaid: number | null;
  createdAt: Date;
}

export class OrderEntity extends Entity<OrderProps> {
  private constructor(props: OrderProps, id?: string) {
    super(props, id);
  }

  public static create(
    props: Omit<OrderProps, 'status' | 'createdAt' | 'paymentStatus' | 'paymentMethod' | 'amountPaid'>,
    id?: string,
  ): OrderEntity {
    // Maximum allowed declared value without special approval is 50000 CHF
    if (props.declaredValue.amount > 50000) {
      throw new Error('Declared value exceeds maximum allowed compensation (50000)');
    }

    return new OrderEntity(
      {
        ...props,
        status: OrderStatus.PENDING,
        paymentStatus: 'PENDING_PAYMENT',
        paymentMethod: null,
        amountPaid: null,
        createdAt: new Date(),
      },
      id,
    );
  }

  public static reconstitute(props: OrderProps, id: string): OrderEntity {
    return new OrderEntity(props, id);
  }

  get status(): OrderStatus {
    return this.props.status;
  }

  get route(): RouteProps {
    return this.props.route;
  }

  get declaredValue(): Money {
    return this.props.declaredValue;
  }

  public toPlain(): any {
    return {
      id: this.id,
      ...this.props,
      declaredValueAmount: this.props.declaredValue.amount,
      declaredValueCurrency: this.props.declaredValue.currency,
    };
  }

  public markAsInTransit(): void {
    if (this.props.status !== OrderStatus.PENDING) {
      throw new Error('Only pending orders can be moved to in-transit');
    }
    this.props.status = OrderStatus.IN_TRANSIT;
  }

  public markAsDelivered(): void {
    if (this.props.status !== OrderStatus.IN_TRANSIT) {
      throw new Error('Order must be in transit to be delivered');
    }
    this.props.status = OrderStatus.DELIVERED;
  }

  public cancel(): void {
    if (this.props.status === OrderStatus.DELIVERED) {
      throw new Error('Delivered orders cannot be canceled');
    }
    this.props.status = OrderStatus.CANCELED;
  }
}

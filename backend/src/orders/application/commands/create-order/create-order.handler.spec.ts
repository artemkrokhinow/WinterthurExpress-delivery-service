import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderHandler } from './create-order.handler';
import { ORDER_REPOSITORY } from '../../../../orders/domain/repositories/order.repository.interface';
import { CreateOrderCommand } from './create-order.command';

describe('CreateOrderHandler', () => {
  let handler: CreateOrderHandler;

  const mockOrderRepository = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrderHandler,
        {
          provide: ORDER_REPOSITORY,
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    handler = module.get<CreateOrderHandler>(CreateOrderHandler);
  });

  it('should successfully execute command, save order and return UUID', async () => {
    const command = new CreateOrderCommand(
      'test@example.com',
      'John Doe',
      '+41791234567',
      'Jane Smith',
      '+41797654321',
      'Zurich',
      'Winterthur',
      'documents',
      'up-to-1kg',
      100,
      'CHF',
      'sender-123'
    );

    const orderId = await handler.execute(command);

    expect(orderId).toBeDefined();
    expect(typeof orderId).toBe('string');
    expect(mockOrderRepository.save).toHaveBeenCalledTimes(1);

    const savedOrder = mockOrderRepository.save.mock.calls[0][0];
    expect(savedOrder.route.addressFrom).toBe('Zurich');
    expect(savedOrder.declaredValue.amount).toBe(100);
  });
});

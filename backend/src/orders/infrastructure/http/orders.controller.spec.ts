import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;

  const mockCommandBus = {
    execute: jest.fn(),
  };

  const mockQueryBus = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: CommandBus,
          useValue: mockCommandBus,
        },
        {
          provide: QueryBus,
          useValue: mockQueryBus,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should map DTO to Command, execute it, and return success with ID', async () => {
    const dto: CreateOrderDto = {
      senderName: 'John Doe',
      senderPhone: '+41791234567',
      recipientName: 'Jane Smith',
      recipientPhone: '+41797654321',
      routeFrom: 'Zurich',
      routeTo: 'Winterthur',
      packageType: 'documents',
      weightCategory: 'up-to-1kg',
      declaredValueAmount: 100,
      senderEmail: 'test@example.com',
    };

    const fakeId = 'abc-123';
    mockCommandBus.execute.mockResolvedValue(fakeId);

    const result = await controller.createOrder(dto);

    expect(mockCommandBus.execute).toHaveBeenCalledTimes(1);

    const commandSent = mockCommandBus.execute.mock.calls[0][0];
    expect(commandSent).toBeInstanceOf(CreateOrderCommand);
    expect(commandSent.routeFrom).toBe('Zurich');
    expect(commandSent.declaredValueCurrency).toBe('CHF');

    expect(result).toEqual({ success: true, orderId: fakeId });
  });
});

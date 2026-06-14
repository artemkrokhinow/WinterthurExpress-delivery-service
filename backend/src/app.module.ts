import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [SharedModule, OrdersModule, PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}


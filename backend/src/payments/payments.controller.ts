import { Controller, Post, Body, Headers, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent')
  async createIntent(@Body() body: { orderId: string; amount: number }) {
    if (!body.orderId || !body.amount) {
      throw new HttpException('orderId and amount are required', HttpStatus.BAD_REQUEST);
    }
    return this.paymentsService.createPaymentIntent(body.orderId, body.amount);
  }

  @Post('webhook')
  async handleWebhook(@Req() req: any, @Res() res: any) {
    const signature = req.headers['stripe-signature'] as string;
    
    try {
      await this.paymentsService.handleWebhook(req.body, signature);
      return res.status(HttpStatus.OK).send({ received: true });
    } catch (err: any) {
      return res.status(HttpStatus.BAD_REQUEST).send(`Webhook Error: ${err.message}`);
    }
  }
}

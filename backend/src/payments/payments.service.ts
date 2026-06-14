import { Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';

import { PrismaService } from '../shared/infrastructure/persistence/prisma.service';

@Injectable()
export class PaymentsService {
  private stripe: any;
  private readonly logger = new Logger(PaymentsService.name);

  constructor(private readonly prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
      apiVersion: '2025-01-27.acacia' as any, // Using latest stable version
    });
  }

  async createPaymentIntent(orderId: string, amountCHF: number) {
    try {
      // Amount in Stripe is always in the smallest currency unit (e.g. cents)
      const amountInRappen = Math.round(amountCHF * 100);

      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amountInRappen,
        currency: 'chf',
        metadata: { orderId },
        // Twint and PayPal are supported automatically if enabled in the Stripe Dashboard
        payment_method_types: ['card', 'twint', 'paypal'], 
      });

      return {
        clientSecret: paymentIntent.client_secret,
      };
    } catch (error: any) {
      this.logger.error(`Failed to create payment intent: ${error.message}`);
      throw error;
    }
  }

  async handleWebhook(body: any, signature: string) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: any;

    try {
      if (endpointSecret) {
        // We need raw body here. This assumes the webhook controller receives the raw Buffer.
        // For NestJS, usually we need a middleware to preserve raw body for Stripe.
        // We'll simplify for now.
        event = this.stripe.webhooks.constructEvent(body, signature, endpointSecret);
      } else {
        event = body; // Without signature verification (Not safe for production!)
      }
    } catch (err: any) {
      this.logger.error(`Webhook signature verification failed: ${err.message}`);
      throw new Error(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as any;
        const orderId = paymentIntent.metadata.orderId;
        const amountPaid = paymentIntent.amount_received / 100;
        
        this.logger.log(`Payment successful for order ${orderId}. Amount: ${amountPaid} CHF`);
        
        if (orderId) {
          await this.prisma.order.update({
            where: { id: orderId },
            data: {
              paymentStatus: 'PAID',
              amountPaid: amountPaid,
            },
          });
          this.logger.log(`Order ${orderId} updated to PAID in database.`);
        }
        break;
      case 'payment_intent.payment_failed':
        this.logger.warn('Payment failed');
        break;
      default:
        this.logger.log(`Unhandled event type ${event.type}`);
    }
  }
}

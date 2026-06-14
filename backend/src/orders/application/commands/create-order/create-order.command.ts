export class CreateOrderCommand {
  constructor(
    public readonly senderEmail: string,
    public readonly senderName: string,
    public readonly senderPhone: string,
    public readonly recipientName: string,
    public readonly recipientPhone: string,
    public readonly routeFrom: string,
    public readonly routeTo: string,
    public readonly packageType: 'documents' | 'cargo',
    public readonly weightCategory: string,
    public readonly declaredValueAmount: number,
    public readonly declaredValueCurrency: string = 'CHF',
    public readonly senderId?: string,
  ) {}
}

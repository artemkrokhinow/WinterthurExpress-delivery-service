import { IsString, IsNotEmpty, IsEmail, IsOptional, IsIn, Min, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsEmail()
  @IsNotEmpty()
  senderEmail: string;

  @IsString()
  @IsNotEmpty()
  senderName: string;

  @IsString()
  @IsNotEmpty()
  senderPhone: string;

  @IsString()
  @IsNotEmpty()
  recipientName: string;

  @IsString()
  @IsNotEmpty()
  recipientPhone: string;

  @IsString()
  @IsNotEmpty()
  routeFrom: string;

  @IsString()
  @IsNotEmpty()
  routeTo: string;

  @IsIn(['documents', 'cargo'])
  packageType: 'documents' | 'cargo';

  @IsString()
  @IsNotEmpty()
  weightCategory: string;

  @IsNumber()
  @Min(0)
  declaredValueAmount: number;

  @IsOptional()
  @IsString()
  declaredValueCurrency?: string;

  @IsOptional()
  @IsString()
  senderId?: string;
}

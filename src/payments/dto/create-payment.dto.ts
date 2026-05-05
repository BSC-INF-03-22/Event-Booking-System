import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  userId!: number;

  @IsOptional()
  @IsNumber()
  ticketId?: number;

  @IsNumber()
  amount!: number;

  @IsString()
  currency!: string;
}
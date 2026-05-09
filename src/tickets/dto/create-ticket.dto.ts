import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTicketDto {

  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  status!: string;

  @Type(() => Number)
  @IsNumber()
  userId!: number;
}
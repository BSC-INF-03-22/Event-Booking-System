import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateFeedbackDto {

  @IsInt()
  userId!: number;

  @IsInt()
  eventId!: number;

  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsString()
  @IsNotEmpty()
  message!: string;
}
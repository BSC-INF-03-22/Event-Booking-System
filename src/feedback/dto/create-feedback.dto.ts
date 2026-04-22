import { IsInt, IsString, Min, Max, Length } from 'class-validator';

export class CreateFeedbackDto {
  @IsInt()
  userId!: number;

  @IsInt()
  eventId!: number;

  @IsString()
  @Length(3, 255)
  message!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;
}
export class CreateTicketDto {
  userId!: number;
  eventName!: string;
  quantity!: number;
  price!: number;
  status?: string; // optional (e.g. "pending", "paid")
}
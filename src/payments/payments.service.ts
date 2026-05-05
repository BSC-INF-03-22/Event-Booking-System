import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  async create(dto: CreatePaymentDto) {
    const payment = this.paymentRepo.create({
      ...dto,
      status: PaymentStatus.PENDING,
      reference: `PAY-${Date.now()}`,
    });

    return await this.paymentRepo.save(payment);
  }

  async findAll() {
    return await this.paymentRepo.find();
  }

  async findOne(id: number) {
    const payment = await this.paymentRepo.findOneBy({ id });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }

  async update(id: number, dto: UpdatePaymentDto) {
    const payment = await this.findOne(id);

    Object.assign(payment, dto);

    return await this.paymentRepo.save(payment);
  }

  async remove(id: number) {
    const payment = await this.findOne(id);
    return await this.paymentRepo.remove(payment);
  }

  // 🔥 Simulated payment processing (for now)
  async markAsSuccess(id: number) {
    const payment = await this.findOne(id);

    payment.status = PaymentStatus.SUCCESS;

    return this.paymentRepo.save(payment);
  }

  async markAsFailed(id: number) {
    const payment = await this.findOne(id);

    payment.status = PaymentStatus.FAILED;

    return this.paymentRepo.save(payment);
  }
}
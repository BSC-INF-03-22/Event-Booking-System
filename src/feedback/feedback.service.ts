import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Feedback } from './feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    private notificationsService: NotificationsService,
  ) {}

  // ✅ CREATE
  async create(dto: CreateFeedbackDto) {
    const feedback = this.feedbackRepository.create({
      ...dto,
      createdAt: new Date(), // ensure timestamp
    });

    const saved = await this.feedbackRepository.save(feedback);

    // 🔔 CREATE NOTIFICATION AFTER FEEDBACK
    await this.notificationsService.create({
      userId: saved.userId,
      message: `New feedback received with rating ${saved.rating}`,
    });

    return saved;
  }

  // ✅ GET ALL
  async findAll() {
    return this.feedbackRepository.find();
  }

  // ✅ GET ONE
  async findOne(id: number) {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundException(`Feedback with ID ${id} not found`);
    }

    return feedback;
  }

  // ✅ UPDATE
  async update(id: number, data: Partial<CreateFeedbackDto>) {
    const feedback = await this.findOne(id);

    Object.assign(feedback, data);

    return this.feedbackRepository.save(feedback);
  }

  // ✅ DELETE
  async remove(id: number) {
    const feedback = await this.findOne(id);

    await this.feedbackRepository.remove(feedback);

    return { message: 'Feedback deleted successfully' };
  }
}
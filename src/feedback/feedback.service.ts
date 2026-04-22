import { Injectable } from '@nestjs/common';
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

 async create(dto: CreateFeedbackDto) {
  const feedback = this.feedbackRepository.create(dto);
  const saved = await this.feedbackRepository.save(feedback);

  // 🔔 CREATE NOTIFICATION AFTER FEEDBACK
  await this.notificationsService.create({
    userId: saved.userId,
    message: `New feedback received with rating ${saved.rating}`,
  });

  return saved;
}

  async findAll() {
    return await this.feedbackRepository.find();
  }

  // ✅ UPDATE (PATCH)
  async update(id: number, data: Partial<CreateFeedbackDto>) {
    await this.feedbackRepository.update(id, data);
    return this.feedbackRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return this.feedbackRepository.delete(id);
  }
}
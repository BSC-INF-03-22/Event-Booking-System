import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

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

  // =========================
  // CREATE FEEDBACK
  // =========================
  async create(dto: CreateFeedbackDto) {
    const feedback = this.feedbackRepository.create({
      ...dto,
      createdAt: new Date(),
    });

    const saved = await this.feedbackRepository.save(feedback);

    // CREATE NOTIFICATION
    await this.notificationsService.create({
      userId: saved.userId,
      message: `Your feedback has been submitted successfully.`,
    });

    return {
      success: true,
      message: 'Feedback submitted successfully.',
      data: saved,
    };
  }

  // =========================
  // GET ALL FEEDBACK
  // =========================
  async findAll() {
    const feedback = await this.feedbackRepository.find();

    return {
      success: true,
      count: feedback.length,
      data: feedback,
    };
  }

  // =========================
  // GET ONE FEEDBACK
  // =========================
  async findOne(id: number) {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundException(
        `Feedback with ID ${id} not found`,
      );
    }

    return {
      success: true,
      data: feedback,
    };
  }

  // =========================
  // UPDATE FEEDBACK
  // =========================
  async update(
    id: number,
    data: Partial<CreateFeedbackDto>,
  ) {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundException(
        `Feedback with ID ${id} not found`,
      );
    }

    Object.assign(feedback, data);

    const updated = await this.feedbackRepository.save(
      feedback,
    );

    return {
      success: true,
      message: 'Feedback updated successfully.',
      data: updated,
    };
  }

  // =========================
  // DELETE FEEDBACK
  // =========================
  async remove(id: number) {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundException(
        `Feedback with ID ${id} not found`,
      );
    }

    await this.feedbackRepository.remove(feedback);

    return {
      success: true,
      message: 'Feedback deleted successfully.',
    };
  }
}
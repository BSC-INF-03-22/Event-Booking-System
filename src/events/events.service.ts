import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
  ) {}

  async create(dto: CreateEventDto) {
    const event = this.eventRepo.create({
      ...dto,
      date: new Date(dto.date),
    });

    return await this.eventRepo.save(event);
  }

  async findAll() {
    return await this.eventRepo.find();
  }

  async findOne(id: number) {
    const event = await this.eventRepo.findOneBy({ id });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async update(id: number, dto: UpdateEventDto) {
    const event = await this.findOne(id);

    const updated = Object.assign(event, {
      ...dto,
      ...(dto.date && { date: new Date(dto.date) }),
    });

    return await this.eventRepo.save(updated);
  }

  async remove(id: number) {
    const event = await this.findOne(id);
    return await this.eventRepo.remove(event);
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
  ) {}

  // CREATE
  async create(dto: CreateTicketDto) {
    const ticket = this.ticketRepo.create(dto);
    return this.ticketRepo.save(ticket);
  }

  // READ ALL
  findAll() {
    return this.ticketRepo.find();
  }

  // READ ONE
  async findOne(id: number) {
    const ticket = await this.ticketRepo.findOneBy({ id });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    return ticket;
  }

  // UPDATE (FIXED)
  async update(id: number, dto: UpdateTicketDto) {
    const ticket = await this.findOne(id);

    Object.assign(ticket, dto);

    return this.ticketRepo.save(ticket);
  }

  // DELETE (FIXED)
  async remove(id: number) {
    const ticket = await this.findOne(id);
    return this.ticketRepo.remove(ticket);
  }
}
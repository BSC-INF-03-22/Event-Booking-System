import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  // CREATE
  @Post()
  create(@Body() dto: CreateTicketDto) {
    return this.ticketsService.create(dto);
  }

  // READ ALL
  @Get()
  findAll() {
    return this.ticketsService.findAll();
  }

  // READ ONE
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ticketsService.findOne(+id);
  }

  // UPDATE
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateTicketDto) {
    return this.ticketsService.update(+id, dto);
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ticketsService.remove(+id);
  }
}
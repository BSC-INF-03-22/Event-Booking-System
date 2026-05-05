import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // CREATE
  @Post()
  create(@Body() body: { userId: number; message: string }) {
    return this.notificationsService.create({
      userId: body.userId,
      message: body.message,
    });
  }

  // READ ALL
  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }

  // 🔹 ADD THIS → READ ONE
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(Number(id));
  }

  // 🔹 ADD THIS → UPDATE
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.notificationsService.update(Number(id), body);
  }

  // 🔹 ADD THIS → MARK AS READ (nice feature)
  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(Number(id));
  }

  // 🔹 ADD THIS → DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(Number(id));
  }
}
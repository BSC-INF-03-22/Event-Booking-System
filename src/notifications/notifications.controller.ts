import { Controller, Get, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

 @Post()
create(@Body() body: { userId: number; message: string }) {
  return this.notificationsService.create({
    userId: body.userId,
    message: body.message,
  });
}

  @Get()
  findAll() {
    return this.notificationsService.findAll();
  }
}
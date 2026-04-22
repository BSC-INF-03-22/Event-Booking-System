import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(@Body() dto: CreateFeedbackDto) {
    return this.feedbackService.create(dto);
  }

  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  // ✅ UPDATE (PATCH)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<CreateFeedbackDto>,
  ) {
    return this.feedbackService.update(Number(id), data);
  }

  // ❌ DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(Number(id));
  }
}
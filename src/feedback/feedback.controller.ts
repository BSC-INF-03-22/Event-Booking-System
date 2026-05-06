import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  // ✅ CREATE
  @Post()
  create(@Body() dto: CreateFeedbackDto) {
    return this.feedbackService.create(dto);
  }

  // ✅ GET ALL
  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  // ✅ GET ONE  ← THIS WAS MISSING
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(+id);
  }

  // ✅ UPDATE
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateFeedbackDto>) {
    return this.feedbackService.update(+id, dto);
  }

  // ✅ DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedbackService.remove(+id);
  }
}
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get('/')
  index() {
    return this.questionsService.index();
  }

  @Get('/:id')
  show(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.show(id);
  }
}

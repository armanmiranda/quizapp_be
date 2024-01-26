import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { GenerateRecommendation } from './dto/generateRecommendation.dto';

@Controller('recommendations')
export class RecommendationController {
  constructor(private recommendationService: RecommendationService) {}

  @Get('/')
  index() {
    return this.recommendationService.index();
  }

  @Post('/generate')
  generateRecommendations(@Body() dto: GenerateRecommendation) {
    return this.recommendationService.generateRecommendations(dto);
  }
}

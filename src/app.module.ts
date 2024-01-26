import { Module } from '@nestjs/common';
import { QuestionsModule } from './questions/questions.module';
import { PrismaModule } from './prisma/prisma.module';
import { RecommendationModule } from './recommendation/recommendation.module';

@Module({
  imports: [QuestionsModule, PrismaModule, RecommendationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Injectable, Logger } from '@nestjs/common';
import { ProgramLevel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecommendationService {
  private readonly logger = new Logger(RecommendationService.name);
  constructor(private prisma: PrismaService) {}

  async index() {
    try {
      const recommendations = await this.prisma.recommendation.findMany();
      return { status: 200, data: recommendations };
    } catch (e) {
      this.logger.error(e);
      return { status: 500, message: 'Internal Error' };
    }
  }

  async generateRecommendations(dto: any) {
    let recommendations: unknown;
    let correctPercentage = 0;
    let correctCount = 0;

    try {
      await dto.answers.map(async (answer) => {
        const question = await this.prisma.answer.findFirstOrThrow({
          where: { questionId: answer.questionId, correctAnswer: true },
        });

        if (question.id === answer.answerId) correctCount += 1;
      });

      correctPercentage = Math.floor((correctCount / 6) * 100);
      console.log(correctCount, correctPercentage);

      if (correctPercentage < 50) {
        recommendations = await this.getRecommendationWithLevel(
          ProgramLevel.BEGINNER,
        );
      } else if (correctPercentage < 80) {
        recommendations = await this.getRecommendationWithLevel(
          ProgramLevel.AVERAGE,
        );
      } else {
        recommendations = await this.getRecommendationWithLevel(
          ProgramLevel.EXPERT,
        );
      }

      return { status: 200, correctCount, correctPercentage, recommendations };
    } catch (e) {
      this.logger.error(e);
      return { status: 500, message: 'Internal Error' };
    }
  }

  async getRecommendationWithLevel(level: ProgramLevel) {
    return await this.prisma.recommendation.findMany({
      where: { programLevel: level },
    });
  }
}

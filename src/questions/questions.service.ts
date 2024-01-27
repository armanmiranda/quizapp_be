import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class QuestionsService {
  private readonly logger = new Logger(QuestionsService.name);
  constructor(private prisma: PrismaService) {}

  async index() {
    try {
      const questions = await this.prisma.question.findMany({
        select: {
          id: true,
          question: true,
          answers: {
            select: { id: true, answer: true },
          },
        },
      });
      return { status: 200, questions };
    } catch (e) {
      this.logger.error(e);
      return { status: 500, message: 'Internal Error' };
    }
  }

  async show(id: number) {
    try {
      const question = await this.prisma.question.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          question: true,
          answers: {
            select: { id: true, answer: true },
          },
        },
      });
      return { status: 200, question };
    } catch (e) {
      this.logger.error(e);
      return { status: 500, message: 'Internal Error' };
    }
  }
}

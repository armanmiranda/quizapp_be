import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async index() {
    try {
      const questions = await this.prisma.question.findMany();
      return { status: 200, data: questions };
    } catch (e) {
      console.log(e);
      return { status: 500, data: [] };
    }
  }

  async show(id: number) {
    try {
      const questions = await this.prisma.question.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          question: true,
          answers: {
            select: {
              id: true,
              answer: true,
            },
          },
        },
      });
      return { status: 200, data: questions };
    } catch (e) {
      console.log(e);
      return { status: 500, data: [] };
    }
  }
}

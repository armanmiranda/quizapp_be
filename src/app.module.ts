import { Module } from '@nestjs/common';
import { QuestionsModule } from './questions/questions.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [QuestionsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

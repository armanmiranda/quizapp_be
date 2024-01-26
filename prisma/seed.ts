import { PrismaClient, ProgramLevel } from '@prisma/client';

const prisma = new PrismaClient();

const recommendationSeedData = [
  {
    programLevel: ProgramLevel.BEGINNER,
    programName: 'First',
    programCode: 'B2',
  },
  {
    programLevel: ProgramLevel.BEGINNER,
    programName: 'C1',
    programCode: 'Advanced',
  },
  {
    programLevel: ProgramLevel.AVERAGE,
    programName: 'B2',
    programCode: 'First for Schools',
  },
  {
    programLevel: ProgramLevel.EXPERT,
    programName: 'B1',
    programCode: 'Preliminary for Schools',
  },
  {
    programLevel: ProgramLevel.EXPERT,
    programName: 'A2',
    programCode: 'Key for Schools',
  },
];

const questionSeedData = [
  {
    question: 'Part of speech that names a person place or thing.',
    answers: [
      { answer: 'Noun', correctAnswer: true },
      { answer: 'Verb', correctAnswer: false },
      { answer: 'Pronouns', correctAnswer: false },
      { answer: 'Adverbs', correctAnswer: false },
    ],
  },
  {
    question: 'Type of noun that names something you can see.',
    answers: [
      { answer: 'Concrete Nouns', correctAnswer: true },
      { answer: 'Abstract Nouns', correctAnswer: false },
      { answer: 'Plural Nouns', correctAnswer: false },
      { answer: 'Singular Nouns', correctAnswer: false },
    ],
  },
  {
    question:
      'Type of verb that tells what action someone or something is performing',
    answers: [
      { answer: 'Linking Verb', correctAnswer: false },
      { answer: 'Adverb', correctAnswer: false },
      { answer: 'Nouns', correctAnswer: false },
      { answer: 'Action Verbs', correctAnswer: true },
    ],
  },
  {
    question:
      'Part of speech that stand for nouns or for words that take place of nouns',
    answers: [
      { answer: 'Noun', correctAnswer: false },
      { answer: 'Verb', correctAnswer: false },
      { answer: 'Pronouns', correctAnswer: true },
      { answer: 'Adverbs', correctAnswer: false },
    ],
  },
  {
    question:
      'Type of noun that names something you cannot perceive through any of the five senses.',
    answers: [
      { answer: 'Concrete Nouns', correctAnswer: false },
      { answer: 'Abstract Nouns', correctAnswer: true },
      { answer: 'Plural Nouns', correctAnswer: false },
      { answer: 'Singular Nouns', correctAnswer: false },
    ],
  },
  {
    question:
      'Type of verb that connects its subject with a word generally found near the end of a sentence',
    answers: [
      { answer: 'Linking Verb', correctAnswer: true },
      { answer: 'Adverb', correctAnswer: false },
      { answer: 'Nouns', correctAnswer: false },
      { answer: 'Action Verbs', correctAnswer: false },
    ],
  },
];

async function main() {
  const recommendations = await prisma.recommendation.createMany({
    data: recommendationSeedData,
  });
  console.log(recommendations);

  const questions = await questionSeedData.map(async (question) => {
    const answers = question.answers.map((answer) => {
      return { answer: answer.answer, correctAnswer: answer.correctAnswer };
    });

    return await prisma.question.create({
      data: {
        question: question.question,
        answers: {
          create: answers,
        },
      },
    });
  });

  console.log(questions);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });

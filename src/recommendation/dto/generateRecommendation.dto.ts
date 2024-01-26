import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';

class Answer {
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @IsNumber()
  @IsNotEmpty()
  answerId: number;
}

export class GenerateRecommendation {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
  @Type(() => Answer)
  answers: Answer[];
}

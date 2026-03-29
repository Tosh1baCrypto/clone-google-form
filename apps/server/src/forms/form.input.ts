import { InputType, Field, ID } from '@nestjs/graphql';
import { QuestionType } from './form.model';

@InputType()
class QuestionInput {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field()
  title: string;

  @Field(() => QuestionType)
  type: QuestionType;

  @Field(() => [String], { nullable: true })
  options?: string[];
}

@InputType()
export class CreateFormInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [QuestionInput])
  questions: QuestionInput[];
}

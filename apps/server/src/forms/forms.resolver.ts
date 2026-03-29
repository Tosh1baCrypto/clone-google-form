import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  InputType,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { Form } from './form.model';
import { CreateFormInput } from './form.input';
import { v4 as uuidv4 } from 'uuid';

@InputType()
class AnswerInput {
  @Field()
  questionId: string;

  @Field()
  value: string;
}

@ObjectType()
class Answer {
  @Field()
  questionId: string;

  @Field()
  value: string;
}

@ObjectType()
class Response {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  formId: string;

  @Field(() => [Answer])
  answers: Answer[];
}

@Resolver(() => Form)
export class FormsResolver {
  private forms: Form[] = [];
  private responses: Response[] = [];

  @Query(() => [Form], { name: 'forms' })
  getForms() {
    return this.forms;
  }

  @Query(() => Form, { name: 'form', nullable: true })
  getForm(@Args('id', { type: () => ID }) id: string) {
    return this.forms.find((f) => f.id === id);
  }

  @Query(() => [Response], { name: 'responses' })
  getResponses(@Args('formId', { type: () => ID }) formId: string) {
    return this.responses.filter((r) => r.formId === formId);
  }

  @Mutation(() => Form)
  createForm(@Args('input') input: CreateFormInput) {
    const newForm: Form = {
      id: uuidv4(),
      title: input.title,
      description: input.description,
      questions: input.questions.map((q) => ({
        ...q,
        id: uuidv4(),
      })),
    };
    this.forms.push(newForm);
    return newForm;
  }

  @Mutation(() => Form)
  updateForm(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: CreateFormInput,
  ) {
    const index = this.forms.findIndex((f) => f.id === id);
    if (index === -1) throw new Error('Form not found');

    this.forms[index] = {
      ...this.forms[index],
      title: input.title,
      description: input.description,
      questions: input.questions.map((q) => ({
        ...q,
        id: q.id || uuidv4(),
      })),
    };
    return this.forms[index];
  }

  @Mutation(() => Response)
  submitResponse(
    @Args('formId', { type: () => ID }) formId: string,
    @Args('answers', { type: () => [AnswerInput] }) answers: AnswerInput[],
  ) {
    const newResponse: Response = {
      id: uuidv4(),
      formId,
      answers: answers.map((a) => ({ ...a })),
    };

    this.responses.push(newResponse);
    return newResponse;
  }
}

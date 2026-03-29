import { api } from '../api/baseApi';

    export class TypedDocumentString<TResult, TVariables> extends String {
      private __res?: TResult;
      private __var?: TVariables;
      constructor(value: string) {
        super(value);
  }
}
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Answer = {
  questionId: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type AnswerInput = {
  questionId: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CreateFormInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  questions: Array<QuestionInput>;
  title: Scalars['String']['input'];
};

export type Form = {
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  questions: Array<Question>;
  title: Scalars['String']['output'];
};

export type Mutation = {
  createForm: Form;
  submitResponse: Response;
  updateForm: Form;
};


export type MutationCreateFormArgs = {
  input: CreateFormInput;
};


export type MutationSubmitResponseArgs = {
  answers: Array<AnswerInput>;
  formId: Scalars['ID']['input'];
};


export type MutationUpdateFormArgs = {
  id: Scalars['ID']['input'];
  input: CreateFormInput;
};

export type Query = {
  form?: Maybe<Form>;
  forms: Array<Form>;
  responses: Array<Response>;
};


export type QueryFormArgs = {
  id: Scalars['ID']['input'];
};


export type QueryResponsesArgs = {
  formId: Scalars['ID']['input'];
};

export type Question = {
  id: Scalars['ID']['output'];
  options?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  type: QuestionType;
};

export type QuestionInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  options?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
  type: QuestionType;
};

export enum QuestionType {
  Checkbox = 'CHECKBOX',
  Date = 'DATE',
  MultipleChoice = 'MULTIPLE_CHOICE',
  Text = 'TEXT'
}

export type Response = {
  answers: Array<Answer>;
  formId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
};

export type CreateFormMutationVariables = Exact<{
  input: CreateFormInput;
}>;


export type CreateFormMutation = { createForm: { id: string, title: string, questions: Array<{ id: string, title: string, type: QuestionType }> } };

export type UpdateFormMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: CreateFormInput;
}>;


export type UpdateFormMutation = { updateForm: { id: string, title: string } };

export type SubmitResponseMutationVariables = Exact<{
  formId: Scalars['ID']['input'];
  answers: Array<AnswerInput> | AnswerInput;
}>;


export type SubmitResponseMutation = { submitResponse: { id: string, formId: string, answers: Array<{ questionId: string, value: string }> } };

export type GetFormsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFormsQuery = { forms: Array<{ id: string, title: string, description?: string | null }> };

export type GetFormQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetFormQuery = { form?: { id: string, title: string, description?: string | null, questions: Array<{ id: string, title: string, type: QuestionType, options?: Array<string> | null }> } | null };

export type GetResponsesQueryVariables = Exact<{
  formId: Scalars['ID']['input'];
}>;


export type GetResponsesQuery = { responses: Array<{ id: string, formId: string, answers: Array<{ questionId: string, value: string }> }> };


export const CreateFormDocument = new TypedDocumentString(`
    mutation CreateForm($input: CreateFormInput!) {
  createForm(input: $input) {
    id
    title
    questions {
      id
      title
      type
    }
  }
}
    `);
export const UpdateFormDocument = new TypedDocumentString(`
    mutation UpdateForm($id: ID!, $input: CreateFormInput!) {
  updateForm(id: $id, input: $input) {
    id
    title
  }
}
    `);
export const SubmitResponseDocument = new TypedDocumentString(`
    mutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {
  submitResponse(formId: $formId, answers: $answers) {
    id
    formId
    answers {
      questionId
      value
    }
  }
}
    `);
export const GetFormsDocument = new TypedDocumentString(`
    query GetForms {
  forms {
    id
    title
    description
  }
}
    `);
export const GetFormDocument = new TypedDocumentString(`
    query GetForm($id: ID!) {
  form(id: $id) {
    id
    title
    description
    questions {
      id
      title
      type
      options
    }
  }
}
    `);
export const GetResponsesDocument = new TypedDocumentString(`
    query GetResponses($formId: ID!) {
  responses(formId: $formId) {
    id
    formId
    answers {
      questionId
      value
    }
  }
}
    `);

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateForm: build.mutation<CreateFormMutation, CreateFormMutationVariables>({
      query: (variables) => ({ document: CreateFormDocument, variables })
    }),
    UpdateForm: build.mutation<UpdateFormMutation, UpdateFormMutationVariables>({
      query: (variables) => ({ document: UpdateFormDocument, variables })
    }),
    SubmitResponse: build.mutation<SubmitResponseMutation, SubmitResponseMutationVariables>({
      query: (variables) => ({ document: SubmitResponseDocument, variables })
    }),
    GetForms: build.query<GetFormsQuery, GetFormsQueryVariables | void>({
      query: (variables) => ({ document: GetFormsDocument, variables })
    }),
    GetForm: build.query<GetFormQuery, GetFormQueryVariables>({
      query: (variables) => ({ document: GetFormDocument, variables })
    }),
    GetResponses: build.query<GetResponsesQuery, GetResponsesQueryVariables>({
      query: (variables) => ({ document: GetResponsesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateFormMutation, useUpdateFormMutation, useSubmitResponseMutation, useGetFormsQuery, useLazyGetFormsQuery, useGetFormQuery, useLazyGetFormQuery, useGetResponsesQuery, useLazyGetResponsesQuery } = injectedRtkApi;


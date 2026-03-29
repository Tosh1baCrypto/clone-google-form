import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/graphql",
  documents: "src/graphql/**/*.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: [
        {
          add: {
            content: `
    export class TypedDocumentString<TResult, TVariables> extends String {
      private __res?: TResult;
      private __var?: TVariables;
      constructor(value: string) {
        super(value);
  }
}`
          }
        },
        "typescript",
        "typescript-operations",
        "typescript-rtk-query"
      ],
      config: {
        documentMode: 'string', 
        importBaseApiFrom: '../api/baseApi',
        exportHooks: true,
        skipTypename: true,
        addTagTypes: ['Forms'],
        endpoints: {
          GetForms: { 
            providesTags: ['Forms'],
          },
          CreateForm: {
            invalidatesTags: ['Forms'],
          },
          UpdateForm: { invalidatesTags: ['Forms'] },
        },
      }
    }
  }
};

export default config;
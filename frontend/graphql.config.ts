import type { CodegenConfig } from '@graphql-codegen/cli';
import 'dotenv/config';

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_SERVER_URL,
  documents: ['./src/**/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './src/graphql/_generated/output.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
};

export default config;

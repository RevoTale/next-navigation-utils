
import love from 'eslint-config-love'
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';


export default defineConfig([
  {
    ignores:[
      './dist/**'
    ]
  },
  {
    ...love,
    files: ['./src/**/*.tsx', './src/**/*.ts'],
  },
   reactHooks.configs.flat['recommended-latest'],
])

import love from 'eslint-config-love'
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    ...love,
    files: ['./src/**/*.tsx', './src/**/*.ts'],
  },
   reactHooks.configs['recommended-latest'],
]
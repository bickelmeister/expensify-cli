export default [
  { parser: '@typescript-eslint/parser' },
  {
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
    ],
  },
  { plugins: ['@typescript-eslint'] },
]

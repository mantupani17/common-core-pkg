module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  ],
  ignorePatterns: ['dist/', 'node_modules/']
};
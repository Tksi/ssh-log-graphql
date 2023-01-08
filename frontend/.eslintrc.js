module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/prefer-stateless-function': ['error'],
    'no-unused-vars': 'warn',
    camelcase: 'warn',
    'no-console': [
      'warn',
      {
        allow: ['time', 'timeEnd', 'info', 'error', 'debug'],
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

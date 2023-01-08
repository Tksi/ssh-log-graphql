module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': [
      'warn',
      {
        allow: ['time', 'timeEnd', 'info', 'error', 'debug'],
      },
    ],
  },
};

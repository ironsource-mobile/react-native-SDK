module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': [
      'error',
      {
        quoteProps: 'consistent',
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        useTabs: false,
        arrowParens: 'avoid',
        semi: false,
      },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
  },
  ignorePatterns: ['node_modules/', 'lib/', 'build/'],
}

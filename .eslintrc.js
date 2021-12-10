module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: ['alloy', 'alloy/typescript', 'alloy/vue', 'plugin:vue/vue3-essential', 'prettier'],
  rules: {
    'vue/no-v-model-argument': 0,
    'vue/multi-word-component-names': 0,
  },
};

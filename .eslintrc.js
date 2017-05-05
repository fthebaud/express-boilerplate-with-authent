module.exports = {
  // root of the eslint configuration
  root: true,

  // parser options
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      'jsx': true,
      'experimentalObjectRestSpread': true
    }
  },

  // environments : define a set of global variables
  env: {
    es6: true,
    node: true,
    browser: true
  },

  // addding user defined globals
  globals: {
    io: false,
    veomockGlobal: true
  },

  // Extending configuration
  // We use eslint:recommended and the eslint-config-react-app configuration file rather than the eslint-plugin-react
  // (this plugin is included in the react-app configuration, among others.)
  extends: ['eslint:recommended'],


  rules: {
    // Possible errors
    'comma-dangle': 'warn',
    'no-console': 'off',
    'no-debugger': 'warn',
    'no-extra-semi': 'warn',
    'no-extra-parens': ['warn', 'functions'],

    // Strict mode: "use strict"" directive not allowed, 
    // (since we are using es6 modules, it's strict mode by default)
    'strict': ['error', 'never'],

    // Best practices
    'eqeqeq': 'warn',
    'no-new': 'warn',
    'no-eval': 'warn',
    'curly': 'warn',
    'no-alert': 'warn',
    'no-unused-expressions': 'warn',
    'no-else-return': 'warn',
    'no-warning-comments': 'warn',
    
    // Complexity
    'complexity': ['warn', 6],
    'max-depth': ['warn', 2],
    'max-params': ['warn', 5],

    // Variables
    'no-undef': 'warn',
    'no-unused-vars': ['warn', {
      'vars': 'all',
      'args': 'after-used'
    }],
    'no-use-before-define': ['warn', {
      'functions': false,
      'classes': false
    }],

    // Stylistic issues
    'no-array-constructor': 'warn',
    'no-mixed-spaces-and-tabs': 'warn',
    'new-cap': ['warn', {
      'newIsCap': true,
      'capIsNew': true,
      'capIsNewExceptions': ['Router']
    }],
    'semi': 'warn',
    'quotes': ['warn', 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true
    }],
    'quote-props': ['warn', 'as-needed'],
    'indent': ['warn', 2, {
      SwitchCase: 1
    }],
    'no-trailing-spaces': 'warn',
    'space-before-function-paren': ['warn', {
      "anonymous": "always",
      "named": "never"
    }],
    'space-in-parens': ['warn', 'never'],
    'yoda': ['warn', 'never'],
    'spaced-comment': ['warn', 'always'],

    // ES6
    // es6 possible errors / best practices
    'no-duplicate-imports': 'error',
    'no-useless-computed-key': 'warn',
    'no-useless-rename': 'warn',
    'no-var': 'warn',
    'prefer-const': 'error',

    // es6 stylistic issues    
    'arrow-spacing': 'warn',
    'rest-spread-spacing': ['warn', 'never'],
    'template-curly-spacing': 'warn',

    // es6 preferences
    'object-shorthand': 'warn',
    'prefer-destructuring': ['warn', {
      'array': true,
      'object': true
    }, {
      'enforceForRenamedProperties': false
    }],
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn'
    
  }
}
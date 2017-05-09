module.exports = {

  // parser options
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'script',
    ecmaFeatures: {
      'experimentalObjectRestSpread': true
    }
  },

  // environments : define a set of global variables
  env: {
    browser: true
  },

  // addding user defined globals
  globals: {
    google: false
  },

  rules: {
    strict: ['warn', 'global']
  }
}
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    '^.+\\.js$': 'babel-jest'

  },
  automock: false,
  resetMocks: false,
  setupFiles: [
    './setupJest.js'
  ]
}
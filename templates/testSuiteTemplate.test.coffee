InputCombinationTestSuite = require 'input-combination-test-suite'

class TestSuite extends InputCombinationTestSuite

  methodName: ''

  args: []

  argTypes: {}

  extraCombinations: []

  before: (test, combination) ->

  beforeEach: (test, combination) ->

  after: (test, combination) ->

  afterEach: (test, combination) ->

  only: (combination) ->

  skip: (combination) ->

  stub: (test, combination) ->

  setFixtures: (test, combination) ->

  getArgValues: (test, combination, arg, argType) ->

  testMethod: (test, combination, args) ->

  clearData: (test, combination) ->

  shouldSuccess: (combination) ->

  successAssert: (combination) ->

  failureAssert: (combination) ->

testSuite = new TestSuite
testSuite.run()

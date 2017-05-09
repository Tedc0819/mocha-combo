const InputCombinationTestSuite from 'input-combination-test-suite';

class TestSuite extends InputCombinationTestSuite {

  constructor() {

    super()
 
    this._methodName = ''
 
    this._args = []
 
    this._argTypes = {}

    this._extraCombinations = [] 

  }

  before(test, combination) {}

  beforeEach(test, combination) {}

  after(test, combination) {}

  afterEach(test, combination) {}

  only(combination) {}

  skip(combination) {}

  stub(test, combination) {}

  setFixtures(test, combination) {}

  getArgValues(test, combination, arg, argType) {}

  testMethod(test, combination, argsValues) {}

  clearData(test, combination) {}

  shouldSuccess(combination) {}

  successAssert(combination) {}

  failureAssert(combination) {}
}

let testSuite = new TestSuite;
testSuite.run();

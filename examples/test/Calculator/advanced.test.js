const MochaCombo = require('../../../index.js');
const Calculator = require('../../models/Calculator.js');
const assert = require('chai').assert;

class TestSuite extends MochaCombo {

  constructor() {

    super()
 
    this._methodName = 'Calculator.add'
 
    this._args = ['currentValue', 'value']
 
    this._argTypes = {
      currentValue: ['zero', 'five', 'six'], // just example. it can be 'highestCapableValue', blah blah blah
      value: ['integer', 'integerStr', 'string']
    }

    this._extraCombinations = [] 

  }

  before(test, combination) {}

  beforeEach(test, combination) {

    return this.runTest(test, combination);
  
  }

  after(test, combination) {}

  afterEach(test, combination) {}

  only(combination) {}

  skip(combination) {}

  stub(test, combination) {}

  setFixtures(test, combination) {
    
    let calculator = new Calculator;
    test.calculator = calculator;

  }

  getArgValues(test, combination, arg, argType) {

    let argValues = {
      currentValue: {
        zero: 0,
        five: 5,
        six: 6
      },
      value: {
        'integer': 1, 
        'integerStr': "1111", 
        'string': "fdfafds" 
      }
    }
 
    return argValues[arg][argType];

  }

  testMethod(test, combination, argsValues) {

    test.calculator.currentValue = argsValues[0];

    return test.calculator.add(argsValues[1]);
  }

  clearData(test, combination) {}

  shouldSuccess(combination) {

    let [ currentValue, value ] = combination;

    return value == 'integer'; 

  }

  successAssert(combination) {
 
    it('should work', function() {
      
      let [ currentValue, value] = this.args; // you can get the args during Assertion 
      
      assert.equal(this.res, currentValue + value); 
    
    })
  
  }

  failureAssert(combination) {
  
    it('should not work', function() {

      assert(this.res instanceof Error);
    
    })
 
  }
}

let testSuite = new TestSuite;
testSuite.run();
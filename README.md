# mocha-combo

mocha-combo is a testing framework based on mocha. It generates test cases by your configuration and input. Testing with high coverage is now easy to achieve.

Testing is basically done against a test point / method. There are lots of factors / arguments that will affect the result. Instead of defining the testing condition as a whole, we can define each condition of each factor. With this new kind of definition, we can easily generate all combintaion. There will be no need to write it one by one.

This layer actually run on top of mocha. All the phases (like beforeEach) can be set up according to combination of testing factors. The result can be easily divided into success assert and failure assert according to combinations.

You can read /examples for more details.
https://github.com/Tedc0819/mocha-combo/tree/master/examples

You can also read the API doc in src file
https://github.com/Tedc0819/mocha-combo/blob/master/src/MochaCombo.js

### basic example
```js

const MochaCombo = require('../../../index.js');
const Calculator = require('../../models/Calculator.js');
const assert = require('chai').assert;

class TestSuite extends MochaCombo {

  constructor() {

    super()
 
    this._methodName = 'Calculator.add'
 
    this._args = ['value']
 
    this._argTypes = {
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

  setFixtures(test, combination) {}

  getArgValues(test, combination, arg, argType) {

    let argValues = {
      value: {
        'integer': 1, 
        'integerStr': "1111", 
        'string': "fdfafds" 
      }
    }
 
    return argValues[arg][argType];

  }

  testMethod(test, combination, argsValues) {

    let calculator = new Calculator;
    // you can attach any varible to test. so that you can access it when you assert it
    // test equals to 'this' in moche test function
    test.calculator = calculator;
    
    return calculator.add(...argsValues);
  }

  clearData(test, combination) {}

  shouldSuccess(combination) {

    let [ value ] = combination;

    return value == 'integer'; 

  }

  successAssert(combination) {
 
    it('should work', function() {
      
      assert.equal(this.res, 1); 
    
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
```

This should generate mocha test result like this.

```
Calculator.add(value)
  success - [integer]
    ✓ should work
  failure - [integerStr]
    ✓ should not work
  failure - [string]
    ✓ should not work
```

```
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

    // most of the time, you will want to run your test for every assertion.
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
```

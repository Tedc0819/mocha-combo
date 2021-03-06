class TestSuite extends MochaCombo {

  constructor() {
  
    super();
  
    this.methodName = "PromiseCalculator.add"

    this.args = ['value1', 'value2']

    this.argTypes = {
      value1: ['one', 'ten', 'hundred'],
      value2: ['two', 'four', 'six'],
    }

  }

  stub(test, combination) {

    return new Promise(function(resolve, reject) {

      resolve("I am stubbing nothing"); 
      
    })

  }

  setFixtures(test, combination) {

    return new Promise(function(resolve, reject) {

      resolve("I am setting nothing"); 
      
    })
 
  }

  getArgValues(test, combination, arg, argType) {
 
    let values = {
      value1: {
        'one': 1, 
        'ten': 10, 
        'hundred': 100
      },
      value2: {
        'two': 2, 
        'four': 4, 
        'six': 6
      }
    }
  
    return values[arg][argType];
  }

  testMethod(test, combination, argValues) {

    return new Promise(function(resolve, reject) {

      resolve("I am testing nothing"); 
      
    })
 
  }

  beforeEach(test, combination) {

    return this.runTest(test, combination);    

  }

}

let testSuite = new TestSuite;
testSuite.run();

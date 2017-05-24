class InputCombinationTestSuite {

  constructor () {

    /* 
     * Just a string that will be concat to form the test title. Usually,
     *
     * 1)
     * method to test:
     * foo.abc = function(a, b) {}
     *
     * methodName: 'foo.abc'
     *
     * 2)
     * if you want to test API
     *
     * methodName: 'GET /foo/bar/:barId'
     */ 

    this.methodName = '';

    /*
     * Arguments that will vary the test flow. Most of the time it should be like this.
     *
     * Say, Method to test:
     * foo.abc = function(email, password)
     *
     * then:
     * args = ['userId', 'password']
     *
     * Sometimes, you may also want to test API. Just summarize the variables of the api.
     *
     * Sometimes you may need some extra arguments those the method does not need but for some extra fixture setting
     */ 

    this.args = []; 

    /* 
     * Argument types that will exist for arguments. You can use any string to identify cases.
     * Yet, they better be human read-able
     *
     * Say, Method to test:
     * foo.abc = function(email, password)
     *
     * then:
     * argTypes: {
     *   email: ['correct', 'tooShort', 'wrongFormat', 'notExist', 'null'],
     *   password: ['correct', 'wrong', 'null']
     * }
     *
     * For the above example, 'correct' means a correct email.
     * You may also want to test what if the input email is with wrong format.
     */ 

    this.argTypes = {};
  }

  get args () { return this._args; }
  get argTypes () { return this._argTypes };
  get methodName () { return this._methodName; };

  set args (value) { this._args = value; }
  set argTypes (value) { this._argTypes = value };
  set methodName (value) { this._methodName = value; };
  /*
   *
   * Extra combination of Args type you want to run. 
   * Sometimes you may want some combinations are not generated by the argTypes dictionary. You can define here.
   * 
   * it should be a 2D array.
   *
   * for example:
   *
   * Say, Method to test:
   * foo.abc = function(email, password)
   *
   * then:
   *
   * argTypes: {
   *   email: ['correct', 'null'],
   *   password: ['correct', 'null']
   * }
   *
   * and you want to test a special case. 
   *
   * extraCombinations(): {
   *
   *   return [
   *     ['specialEmail', 'specialPassword'],
   *     ['anotherSpecialEmail', 'anotherSpecialPassword'],
   *   ]
   * }
   *
   * REMINDERS: PLEASE ENSURE THAT in phase 'getArgValues', you need to return the special value for the types.
   */

  extraCombinations() {

    return []; 

  };
 
  /*
   * Test Cycle
   */

  /*
   *
   * Stub Phase: do any stubbing here.
   *
   * @method stub
   *
   * @params {Object} test a object refers to 'this' in mocha scope. All 'test' in the phases should be the same.
   * @params {Array} combination an array of input types, e.g. ['correct', 'notExist', 'correct']
   *
   */

  stub(test, combination) {}

  /*
   *
   * Set Fixture Phase: Prepare any data you will use in following phases.
   *
   * @method setFixtures
   *
   * @params {Object} test a object refers to 'this' in mocha scope. All 'test' in the phases should be the same.
   * @params {Array} combination an array of input types, e.g. ['correct', 'notExist', 'correct']
   *
   */

  setFixtures(test, combination) {}

  /*
   *
   * Get Argument Values Phase: the test suit will start looping this methods to get value according to arg and arg types
   *
   * @method setFixtures
   *
   * @params {Object} test a object refers to 'this' in mocha scope. All 'test' in the phases should be the same.
   * @params {Array} combination an array of input types, e.g. ['correct', 'notExist', 'correct']
   * @params {String} arg
   * @params {String} argType the string that indicate the type of argument is going to test
   *
   * @return {Any} value that to be applied for arg with argType.
   *
   * e.g. if arg == 'email', argType == 'correct'
   * the return means the value of the email when it means to be correct.
   */

  getArgValues(test, combination, arg, argType) {}

  /*
   *
   * The KEY test point of the whole flow.
   *
   * @method setFixtures
   *
   * @params {Object} test a object refers to 'this' in mocha scope. All 'test' in the phases should be the same.
   * @params {Array} combination an array of input types, e.g. ['correct', 'notExist', 'correct']
   * @params {Array} args argument values to be apply to method
   *
   */

  testMethod(test, combination, args) {}

  /*
   * A centralize point for clearData. NOT INCLUDED IN PHASES when run. Implement it and call it any where you want to.
   *
   * @params {Object} test a object refers to 'this' in mocha scope. All 'test' in the phases should be the same.
   * @params {Array} combination an array of input types, e.g. ['correct', 'notExist', 'correct']
   *
   */

  clearData(test, combination) {}

  /*
   *
   * Call to run a cycle of tests of one combination. Please do not override it if you don't know what the flow means
   *
   * @method runTest
   *
   * @params {Object} test a object refers to 'this' in mocha scope. All 'test' in the phases should be the same.
   * @params {Array} combination an array of input types, e.g. ['correct', 'notExist', 'correct']
   *
   */

  runTest(test, combination) {

    return new Promise(function(resolve) {
        return resolve(null); 
      }) 
      .then( () => this.stub(test, combination) || null )
      .then( () => this.setFixtures(test, combination) || null )
      .then( () => {

        let argValues = this.gatherArgsValue(test, combination);

        test.args = argValues;
        return this.testMethod(test, combination, argValues) || null;

      })
      .then(res => test.res = res)
      .catch(res => test.res = res);
  }

  /*
   *
   * Call to run a cycle of tests of one combination again, but just with the testMethod phase.
   * Please do not override it if you don't know what the flow means
   *
   * @method runTestAgain
   *
   * @params {Object} test a object refers to 'this' in mocha scope. All 'test' in the phases should be the same.
   * @params {Array} combination an array of input types, e.g. ['correct', 'notExist', 'correct']
   *
   */

  runTestAgain(test, combination) {

    let self = this;

    let argValues = self.gatherArgsValue(test, combination);

    test.args = argValues;

    return self.testMethod(test, combination, argValues)
      .then(res => test.res = res)
      .catch(res => test.res = res);
  }

  /*
   *
   * Method to run the whole testsuite.
   * Please do not override it if you don't know what the flow means
   *
   * @method run
   *
   */

  run() {

    let self = this;

    var combinations = self.combinations();

    var onlyCases = []

    combinations.forEach(function(combination) {

      if (self.only(combination)) { onlyCases.push(combination); }

    })

    if (onlyCases.length) {

      combinations = onlyCases; 

    }

    return describe(self.title(), function() {

      combinations.forEach(function(combination) {

        let shouldSuccess = self.shouldSuccess(combination);

        let descFunc =  function() {

          before(function() {

            return self.before(this, combination);
          });

          beforeEach(function() {

            return self.beforeEach(this, combination);
          });

          after(function() {

            return self.after(this, combination);
          });

          afterEach(function() {

            return self.afterEach(this, combination);
          });

          if (shouldSuccess) {

            return self.successAssert(combination);

          } else {

            return self.failureAssert(combination);
          }
        };

        if (self.skip(combination)) {

          describe.skip(self.combinationTestTitle(shouldSuccess, combination), descFunc);

          return;
        }

        return describe(self.combinationTestTitle(shouldSuccess, combination), descFunc);
      })

    });
  }

  /*
   *
   * Like a router for positive and negative responses.
   *
   * @method shouldSuccess
   *
   * @params {Array} combination an array of input types, e.g. ['correct', 'notExist', 'correct']
   *
   * @return {Boolean} a boolean decribes if the test should be a success case with this combination of input. return true if it should success.
   *
   */

  shouldSuccess(combination) {

    let count = 0;

    combination.forEach(function(inputType) {

      if (inputType === 'correct') { return count += 1; }
    });

    return count === combination.length;
  }

  /*
   *
   * use mocha syntax to test success cases. You may also want to do more test for specfic cases. just use if-else. remember to call return at certain positions
   *
   * @method successAssert
   *
   * @params {Array} combination an array of input types, e.g. ['correct', 'notExist', 'correct']
   *
   */

  successAssert(combination) {

    return it('WARNING: Success Assert Not Implemented', () => console.log('IMPLEMENTATION MISSING'));
  }

  /*
   *
   * use mocha syntax to test failure cases. You may also want to do more test for specfic cases. just use if-else. remember to call return at certain positions
   *
   * @method failureAssert
   *
   * @params {Array} combination an array of input types, e.g. ['correct', 'notExist', 'correct']
   *
   */

  failureAssert(combination) {

    return it('WARNING: Failuer Assert Not Implemented', () => console.log('IMPLEMENTATION MISSING'));
  }

  /*
   * mocha phases. These phase mainly serve as those in mocha. This framework just add one more layer for you do differently accoording to different combination
   */

  /*
   *
   * mocha before phase
   *
   * @method before
   *
   * @params {Object} test a object refers to 'this' in mocha scope. All 'test' in the phases should be the same.
   * @params {Array} combination an array of input types, e.g. ['correct', 'notExist', 'correct']
   *
   */

  before(test, combination) {}

  /*
   *
   * mocha beforeEach phase
   *
   * @method beforeEach
   *
   * @params {Object} test a object refers to 'this' in mocha scope. All 'test' in the phases should be the same.
   * @params {Array} combination an array of input types, e.g. ['correct', 'notExist', 'correct']
   *
   */

  beforeEach(test, combination) {}

  /*
   *
   * mocha after phase
   *
   * @method after
   *
   * @params {Object} test a object refers to 'this' in mocha scope. All 'test' in the phases should be the same.
   * @params {Array} combination an array of input types, e.g. ['correct', 'notExist', 'correct']
   *
   */

  after(test, combination) {}

  /*
   *
   * mocha afterEach phase
   *
   * @method afterEach
   *
   * @params {Object} test a object refers to 'this' in mocha scope. All 'test' in the phases should be the same.
   * @params {Array} combination an array of input types, e.g. ['correct', 'notExist', 'correct']
   *
   */

  afterEach(test, combination) {}

  /*
   *
   * mocha only phase
   *
   * @method only
   *
   * @params {Array} combination an array of input types, e.g. ['correct', 'notExist', 'correct']
   *
   * @return {bool} if true, this combination will mark as one of the only cases. It behaves unlike the mocha.only. it supports multiple only cases.
   *
   */

  only(combination) {}

  /*
   *
   * mocha skip phase
   *
   * @method skip
   *
   * @params {Array} combination an array of input types, e.g. ['correct', 'notExist', 'correct']
   *
   * @return {bool} if true, this combination will mark as one of the skip cases. It behaves like the mocha.skip
   */

  skip(combination) {}

  /*
   * HELPERS
   */

  // getter

  title() { return this.methodName + '(' + this.args + ')'; }

  combinations() {

    let self = this;

    let extractedTypeArrays = this.args.map(arg => self.argTypes[arg]);

    return this.getCombinations(extractedTypeArrays).concat(self.extraCombinations());
//    return this.getCombinations(extractedTypeArrays);
  }

  /*
   * helper for internal use
   */

  getCombinations(array) {

    var combine = function(array) {

      // simplest case when array = []
      if (!array.length) {
        return [];
      }

      let result = [];

      let lastResult = combine(array.slice(1));

      array[0].forEach(function(first) {

        if (!lastResult.length) {

          return result.push([first]);

        } else {

          return lastResult.forEach(function(last) {
            let tmp = last.slice(0);
            tmp.unshift(first);
            return result.push(tmp);
          });
        }
      });

      return result;
    };

    return combine(array);
  }

  combinationTestTitle(shouldSuccess, combination) {

    let state = shouldSuccess ? 'success' : 'failure';

    let tmp = combination.map(str => `'${str}'`);

    let combinationStr = combination.join(', ');

    return `${state} - [${combinationStr}]`;
  }

  /*
   * Test Cycle helper
   */

  gatherArgsValue(test, combination) {

    let self = this;

    return this.args.map((arg, idx) => self.getArgValues(test, combination, arg, combination[idx]));
  }
}

module.exports = InputCombinationTestSuite;

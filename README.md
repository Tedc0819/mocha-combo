# mocha-combo

mocha-combo is a testing framework based on mocha. It generates test cases by your configuration and input. Testing with high coverage is now easy to achieve.

Testing is basically done against a test point / method. There are lots of factors / arguments that will affect the result. Instead of defining the testing condition as a whole, we can define each condition of each factor. With this new kind of definition, we can easily generate all combintaion. There will be no need to write it one by one.

This layer actually run on top of mocha. All the phases (like beforeEach) can be set up according to combination of testing factors. The result can be easily divided into success assert and failure assert according to combinations.

### basic example
```js
const MochaCombo = require('mocha-combo');

class TestSuite extends MochaCombo {

  constructor() {

    super();

    this._methodName = 'AppliedJob.applyJob'

    this._args = [ 'userId', 'jobId']

    this._argTypes = {

      userId: ['correct', 'notExist', 'null'],
      jobId: ['correct', 'notExist', 'null'],

    }

  }

  before(test, combination) {}

  beforeEach(test, combination) {

    return this.runTest(test, combination)

  }

  after(test, combination) {}

  afterEach(test, combination) {}

  setFixtures(test, combination) {

    return User.create()
      .then(function(user) {
        test.user = user;
      })

  }

  getArgValues(test, combination, arg, argType) {

    let values = {
      userId: sampleInput.getSample('userId', { correct: test.user.id}),
      jobId: sampleInput.getSample('jobId', { correct: '112233' }),
    }

    return values[arg][argType]

  }

  testMethod(test, combination, argValues) {

    return AppliedJob.applyJob(...argValues)

  }

  shouldSuccess(combination) {

    let [userId, jobId] = combination

    return userId.match(/correct/)
      && jobId.match(/correct/) ;

  }

  successAssert(combination) {

    // you can write test just like in mocha
    // the `this` in the mocha scope is equal to `test` in mocha-combo phases.

    it('should return appliedJob Instance with job details', function() {

      assertHelper.assertAppliedJob(this.res);

    });

    it('should return the same applied job if applying twice'), function() {

      let lastRes = this.res
      let self = this

      testSuite.runTestAgain(this, ['correct', 'correct'])
        .then(function() {
          assert.equal(lastRes.id, self.res.id)
        });

    }

  }

  failureAssert(combination) {

    let modelError;
    let [userId, jobId] = combination;

    if (userId === 'null') {

        it('should return error blah blah blah', function() {
            //test error result
        })

        return;
    }

    if (jobId === 'null') {

        it('should return error blah blah blah', function() {
            //test error result
        })

        return;
    }

    if (jobId === 'notExist') {

        it('should return error blah blah blah', function() {
            //test error result
        })

        return;
    }

    if (userId === 'notExist') {

        it('should return error blah blah blah', function() {
            //test error result
        })

        return;

    }
  }
}

let testSuite = new TestSuite;
testSuite.run();
```

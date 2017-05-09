# mocha-combo

mocha-combo is a testing framework based on mocha. It generates test cases by your configuration and input. Testing with high coverage is now easy to achieve.

Testing is basically done against a test point / method. There are lots of factors / arguments that will affect the result. Instead of defining the testing condition as a whole, we can define each condition of each factor. With this new kind of definition, we can easily generate all combintaion. There will be no need to write it one by one.

This layer actually run on top of mocha. All the phases (like beforeEach) can be set up according to combination of testing factors. The result can be easily divided into success assert and failure assert according to combinations. 




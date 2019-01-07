'use strict';

// Allow tests to run on the server (leave at the top)
if (typeof window === 'undefined') {
  var should = require('chai').should();
  var _ = require('../index.js');
  var testData = require('./testData.js');
}

describe('Arrays', function () {

  describe('first', function () {

    it('should return an array with the first n elements of the array', function () {
      _.first(testData.arr, 2).should.eql(testData.arr.slice(0,2));
      _.first(testData.arr, 3).should.eql(testData.arr.slice(0,3));
    });

    it('should return an array with the first element if n is not a number, is zero, or negative', function () {
      _.first(testData.arr).should.eql([testData.arr[0]]);
      _.first(testData.arr, 0).should.eql([testData.arr[0]]);
      _.first(testData.arr, -1).should.eql([testData.arr[0]]);
    });

    it('should return the entire array if n is > length', function () {
      _.first(testData.arr, testData.arr.length + 1).should.eql(testData.arr);
    });

    it('should work on an arguments object', function () {
      _.first(testData.argumentsObj, 2).should.eql(testData.arr.slice(0,2));
    });

    it('should return an empty array if array is not an array', function () {
      _.first().should.eql([]);
      _.first(null).should.eql([]);
      _.first(1).should.eql([]);
    });

  });

  describe('last', function () {

    it('should not modify the original array', function () {
      var original = Array.prototype.slice.call(testData.arr);
      _.last(testData.arr);
      testData.arr.should.eql(original);
    });

    it('should return an array with the last n elements of the array', function () {
      _.last(testData.arr, 2).should.eql(testData.arr.slice(-2));
      _.last(testData.arr, 3).should.eql(testData.arr.slice(-3));
    });

    it('should return an array with the last element if n is not a number, is zero, or negative', function () {
      _.last(testData.arr).should.eql([testData.arr[testData.arr.length-1]]);
      _.last(testData.arr, 0).should.eql([testData.arr[testData.arr.length-1]]);
      _.last(testData.arr, -1).should.eql([testData.arr[testData.arr.length-1]]);
    });

    it('should return the entire array if n is > length', function () {
      _.last(testData.arr, testData.arr.length + 1).should.eql(testData.arr);
    });

    it('should work on an arguments object', function () {
      _.last(testData.argumentsObj, 2).should.eql(testData.arr.slice(-2));
    });

    it('should return an empty array if array is not an array', function () {
      _.last().should.eql([]);
      _.last(null).should.eql([]);
      _.last(1).should.eql([]);
    });

  });

  describe('uniq', function () {

    it('should return an array without duplicates', function () {
      _.uniq([1,2,1,3,4,3]).should.eql([1,2,3,4]);
    });

  });

  describe('shuffle', function () {

    it('should return a shuffled copy with the same number ol elements', function () {
      var length;
      _.shuffle(testData.arr).length.should.equal(testData.arr.length);
    });

    it('should return a shuffled copy with the same elements', function () {
      var shuffled = _.shuffle(testData.arr);
      var check = true;
      shuffled.forEach(el => {
        if(!testData.arr.includes(el)) check = false;
      });
      check.should.be.true;
      var check = true;
      testData.arr.forEach(el => {
        if(!shuffled.includes(el)) check = false;
      });
      check.should.be.true;
    });

    it('should return a shuffled copy of the array', function () {
    var check = false;
    var shuffled = _.shuffle(testData.arr);
    for (var i = 0; i < shuffled.length; i++) {
      if (shuffled[i] === testData.arr[i]) {
        check = false;
      } else {
        check = true;
        break;
      }
    }
    check.should.be.true;
    shuffled = testData.arr;
    for (var j = 0; j < shuffled.length; j++) {
      if (shuffled[j] === testData.arr[j]) {
        check = false;
      } else {
        check = true;
        break;
      }
    }
    check.should.be.false;
  });

  });

});

describe('Objects', function () {

  var obj;

  afterEach(function () {
    delete testData.obj.constructor.prototype.foo;
  });

  describe('extend', function () {

    beforeEach(function () {
      obj = {};
    });

    it('should copy properties from source to destination', function () {
      _.extend(obj, testData.obj);
      obj.should.eql(testData.obj);
    });

    it('should return the destination object', function () {
      _.extend(obj, testData.obj).should.equal(obj);
    });

    it('should ignore the object prototype', function () {
      testData.obj.constructor.prototype.foo = 'foo';
      _.extend(obj, testData.obj);
      obj.hasOwnProperty('foo').should.be.false;
    });

  });

  describe('defaults', function () {

    beforeEach(function () {
      obj = {};
    });

    it('should copy source properties to undefined properties in the destination object', function () {
      var res = JSON.parse(JSON.stringify(testData.obj));
      res[testData.objKeysArr[0]] = 'existing';
      obj[testData.objKeysArr[0]] = 'existing';
      _.defaults(obj, testData.obj);
      obj.should.eql(res);
    });

    it('should return the destination object', function () {
      _.defaults(obj, testData.obj).should.equal(obj);
    });

    it('should ignore the object prototype', function () {
      testData.obj.constructor.prototype.foo = undefined; // needs to be undefined to test properly with _.defaults()
      _.defaults(obj, testData.obj);
      obj.hasOwnProperty('foo').should.be.false;
    });

  });

});

describe('Collections', function () {

  var called = false;

  afterEach(function () {
    delete testData.obj.constructor.prototype.foo;
  });

  describe('each', function () {

    afterEach(function () {
      called = false;
    });

    it('should iterate over an array', function () {
      _.each(testData.arr, function (el, i, arr) {
        (typeof i).should.equal('number');
        arr[i].should.equal(el);
        called = true;
      });
      called.should.be.true;
    });

    it('should iterate over an object', function () {
      _.each(testData.obj, function (val, key, obj) {
        obj[key].should.equal(val);
        called = true;
      });
      called.should.be.true;
    });

    it('should ignore the object prototype', function () {
      testData.obj.constructor.prototype.foo = 'foo';
      _.each(testData.obj, function (val, key, obj) {
        obj.hasOwnProperty(key).should.be.true;
        called = true;
      });
      called.should.be.true;
    });

    it('should access the original collection', function () {
      _.each(testData.arr, function (el, i, arr) {
        arr.should.equal(testData.arr);
        called = true;
      });
      called.should.be.true;
      called = false;
      _.each(testData.obj, function (val, key, obj) {
        obj.should.equal(testData.obj);
        called = true;
      });
      called.should.be.true;
    });

    it('should bind to context if one is passed', function () {
      _.each(testData.arr, function () {
        this.should.equal(testData.obj);
        called = true;
      }, testData.obj);
      called.should.be.true;
      called = false;
      _.each(testData.obj, function () {
        this.should.equal(testData.arr);
        called = true;
      }, testData.arr);
      called.should.be.true;
    });

    it('should return the collection', function () {
      _.each(testData.arr, function () {}).should.equal(testData.arr);
      _.each(testData.obj, function () {}).should.equal(testData.obj);
    });

  });

  describe('contains', function () {

    it('should return an array of indexes / keys where values are found', function () {
      _.contains(testData.arr, testData.arr[0]).should.eql([0]);
    });

    it('should return an empty array if value is not found', function () {
      _.contains(testData.arr, []).should.eql([]);
    });

  });

  describe('map', function () {

    afterEach(function () {
      called = false;
    });

    it('should return an array with the results of applying iteratee to each element', function () {
      _.map(testData.arr, function (el, i, arr) {
        arr[i].should.equal(el);
        return el;
      }).should.eql(testData.arr);
      _.map(testData.obj, function (val, key, obj) {
        obj[key].should.equal(val);
        return val;
      }).should.eql(testData.objValuesArr);
    });

    it('should ignore the object prototype', function () {
      testData.obj.constructor.prototype.foo = 'foo';
      _.map(testData.obj, function (val, key, obj) {
        obj.hasOwnProperty(key).should.be.true;
        called = true;
      });
      called.should.be.true;
    });

    it('should access the original collection', function () {
      _.map(testData.arr, function (el, i, arr) {
        arr.should.equal(testData.arr);
        called = true;
      });
      called.should.be.true;
      called = false;
      _.map(testData.obj, function (val, key, obj) {
        obj.should.equal(testData.obj);
        called = true;
      });
      called.should.be.true;
    });

    it('should bind to context if one is passed', function () {
      _.map(testData.arr, function () {
        this.should.equal(testData.obj);
        called = true;
      }, testData.obj);
      called.should.be.true;
      called = false;
      _.map(testData.obj, function () {
        this.should.equal(testData.arr);
        called = true;
      }, testData.arr);
      called.should.be.true;
    });

  });

  describe('reduce', function () {

    afterEach(function () {
      called = false;
    });

    it('should be able to reduce a collection to a single value', function () {
      _.reduce(testData.arr, function (accumulator, el, i, arr) {
        arr[i].should.equal(el);
        return accumulator.toString() + el.toString();
      }).should.equal(testData.stringifiedArrElms);
      _.reduce(testData.obj, function (accumulator, val, key, obj) {
        obj[key].should.equal(val);
        return accumulator.toString() + val.toString();
      }).should.equal(testData.stringifiedObjValues);
    });

    it('should support initial state', function () {
      _.reduce(testData.arr, function (accumulator, el) {
        return accumulator + el.toString();
      }, 'init').should.equal('init' + testData.stringifiedArrElms);
      _.reduce(testData.obj, function (accumulator, val) {
        return accumulator + val.toString();
      }, 'init').should.equal('init' + testData.stringifiedObjValues);
    });

    it('should ignore the object prototype', function () {
      testData.obj.constructor.prototype.foo = 'foo';
      _.reduce(testData.obj, function (accumulator, val, key, obj) {
        obj.hasOwnProperty(key).should.be.true;
        called = true;
        return accumulator;
      });
      called.should.be.true;
    });

    // it('should access the original collection', function () {
    //   _.reduce(testData.arr, function (accumulator, el, i, arr) {
    //     arr.should.equal(testData.arr);
    //     called = true;
    //   });
    //   called.should.be.true;
    //   called = false;
    //   _.reduce(testData.obj, function (accumulator, val, key, obj) {
    //     obj.should.equal(testData.obj);
    //     called = true;
    //   });
    //   called.should.be.true;
    // });

    it('should bind to context if one is passed', function () {
      _.reduce(testData.arr, function () {
        this.should.equal(testData.obj);
        called = true;
      }, null, testData.obj);
      called.should.be.true;
      called = false;
      _.reduce(testData.obj, function () {
        this.should.equal(testData.arr);
        called = true;
      }, null, testData.arr);
      called.should.be.true;
    });

  });

  describe('filter', function () {

    afterEach(function () {
      called = false;
    });

    it('should return an array of values that pass a truth test', function () {
      var res = [];
      testData.halfTruthyArr.forEach(function (el) {
        el && res.push(el);
      });
      _.filter(testData.halfTruthyArr, function (el, i, arr) {
        should.equal(arr[i], el);
        return el;
      }).should.eql(res);
      res = [];
      testData.halfTruthyObjValuesArr.forEach(function (val) {
        val && res.push(val);
      });
      _.filter(testData.halfTruthyObj, function (val, key, obj) {
        should.equal(obj[key], val);
        return val;
      }).should.eql(res);
    });

    it('should ignore the object prototype', function () {
      testData.obj.constructor.prototype.foo = 'foo';
      _.filter(testData.obj, function (val, key, obj) {
        obj.hasOwnProperty(key).should.be.true;
        called = true;
      });
      called.should.be.true;
    });

    it('should access the original collection', function () {
      _.filter(testData.arr, function (el, i, arr) {
        arr.should.equal(testData.arr);
        called = true;
      });
      called.should.be.true;
      called = false;
      _.filter(testData.obj, function (val, key, obj) {
        obj.should.equal(testData.obj);
        called = true;
      });
      called.should.be.true;
    });

    it('should bind to context if one is passed', function () {
      _.filter(testData.arr, function () {
        this.should.equal(testData.obj);
        called = true;
      }, testData.obj);
      called.should.be.true;
      called = false;
      _.filter(testData.obj, function () {
        this.should.equal(testData.arr);
        called = true;
      }, testData.arr);
      called.should.be.true;
    });

  });

  describe('reject', function () {

    afterEach(function () {
      called = false;
    });

    it('should return an array of values that do not pass a truth test', function () {
      var res = [];
      testData.halfTruthyArr.forEach(function (el) {
        !el && res.push(el);
      });
      _.reject(testData.halfTruthyArr, function (el, i, arr) {
        should.equal(arr[i], el);
        return el;
      }).should.eql(res);
      res = [];
      testData.halfTruthyObjValuesArr.forEach(function (val) {
        !val && res.push(val);
      });
      _.reject(testData.halfTruthyObj, function (val, key, obj) {
        should.equal(obj[key], val);
        return val;
      }).should.eql(res);
    });

    it('should ignore the object prototype', function () {
      testData.obj.constructor.prototype.foo = 'foo';
      _.reject(testData.obj, function (val, key, obj) {
        obj.hasOwnProperty(key).should.be.true;
        called = true;
      });
      called.should.be.true;
    });

    it('should access the original collection', function () {
      _.reject(testData.arr, function (el, i, arr) {
        arr.should.equal(testData.arr);
        called = true;
      });
      called.should.be.true;
      called = false;
      _.reject(testData.obj, function (val, key, obj) {
        obj.should.equal(testData.obj);
        called = true;
      });
      called.should.be.true;
    });

    it('should bind to context if one is passed', function () {
      _.reject(testData.arr, function () {
        this.should.equal(testData.obj);
        called = true;
      }, testData.obj);
      called.should.be.true;
      called = false;
      _.reject(testData.obj, function () {
        this.should.equal(testData.arr);
        called = true;
      }, testData.arr);
      called.should.be.true;
    });

  });

  describe('every', function () {

    afterEach(function () {
      called = false;
    });

    it('should return true if all values pass a truth test', function () {
      _.every(testData.arr, function (el, i, arr) {
        arr[i].should.equal(el);
        return el;
      }).should.be.true;
      // _.every(testData.obj, function (val, key, obj) {
      //   obj[key].should.equal(val);
      //   return val;
      // }).should.be.true;
      // _.every(testData.halfTruthyArr, function (el) {
      //   return el;
      // }).should.be.false;
      // _.every(testData.halfTruthyObj, function (val) {
      //   return val;
      // }).should.be.false;
    });

    it('should ignore the object prototype', function () {
      testData.obj.constructor.prototype.foo = 'foo';
      _.every(testData.obj, function (val, key, obj) {
        obj.hasOwnProperty(key).should.be.true;
        called = true;
      });
      called.should.be.true;
    });

    it('should access the original collection', function () {
      _.every(testData.arr, function (el, i, arr) {
        arr.should.equal(testData.arr);
        called = true;
      });
      called.should.be.true;
      called = false;
      _.every(testData.obj, function (val, key, obj) {
        obj.should.equal(testData.obj);
        called = true;
      });
      called.should.be.true;
    });

    it('should bind to context if one is passed', function () {
      _.every(testData.arr, function () {
        this.should.equal(testData.obj);
        called = true;
      }, testData.obj);
      called.should.be.true;
      called = false;
      _.every(testData.obj, function () {
        this.should.equal(testData.arr);
        called = true;
      }, testData.arr);
      called.should.be.true;
    });

  });

  describe('some', function () {

    afterEach(function () {
      called = false;
    });

    it('should return true if any value passes a truth test', function () {
      _.some(testData.arr, function (el, i, arr) {
        arr[i].should.equal(el);
        return !el;
      }).should.be.false;
      _.some(testData.obj, function (val, key, obj) {
        obj[key].should.equal(val);
        return !val;
      }).should.be.false;
      _.some(testData.halfTruthyArr, function (el) {
        return el;
      }).should.be.true;
      _.some(testData.halfTruthyObj, function (val) {
        return val;
      }).should.be.true;
    });

    it('should ignore the object prototype', function () {
      testData.obj.constructor.prototype.foo = 'foo';
      _.some(testData.obj, function (val, key, obj) {
        obj.hasOwnProperty(key).should.be.true;
        called = true;
      });
      called.should.be.true;
    });

    it('should access the original collection', function () {
      _.some(testData.arr, function (el, i, arr) {
        arr.should.equal(testData.arr);
        called = true;
      });
      called.should.be.true;
      called = false;
      _.some(testData.obj, function (val, key, obj) {
        obj.should.equal(testData.obj);
        called = true;
      });
      called.should.be.true;
    });

    it('should bind to context if one is passed', function () {
      _.some(testData.arr, function () {
        this.should.equal(testData.obj);
        called = true;
        return true;
      }, testData.obj);
      called.should.be.true;
      called = false;
      _.some(testData.obj, function () {
        this.should.equal(testData.arr);
        called = true;
        return true;
      }, testData.arr);
      called.should.be.true;
    });

  });

  describe('invoke', function () {

    var argsArr;

    before(function () {
      Object.prototype.testCall = function () {
        return this;
      };
      Object.prototype.testArgs = function () {
        arguments[0].should.equal(argsArr[0]);
        arguments[1].should.equal(argsArr[1]);
        called = true;
      };
    });

    after(function () {
      delete Object.prototype.testCall;
      delete Object.prototype.testArgs;
    });

    it('should return an array with the results of calling the indicated method on each element', function () {
      _.invoke(testData.arr, 'testCall').should.eql(testData.arr);
      _.invoke(testData.obj, 'testCall').should.eql(testData.objValuesArr);
    });

    it('should correctly pass the arguments', function () {
      argsArr = [testData.arr, testData.obj];
      _.invoke(testData.arr, 'testArgs', testData.arr, testData.obj);
      called.should.be.true;
      called = false;
      argsArr = [testData.obj, testData.arr];
      _.invoke(testData.obj, 'testArgs', testData.obj, testData.arr);
      called.should.be.true;
    });

  });

  describe('pluck', function () {

    var collection = [{color: 'red'}, {color: 'green'}, {color: 'blue'}];

    it('should return an array of values corresponding to the indicated property for each object in the collection', function () {
      _.pluck(collection, 'color').should.eql(['red', 'green', 'blue']);
    });

    it('missing properties are returned as undefined', function () {
      _.pluck(collection, 'foo').should.eql([undefined, undefined, undefined]);
    });

  });

});

describe('Functions', function () {

  describe('once', function () {

    it('should call the function only once, and return the same result in following calls', function () {
      var called = 0;
      var onced = _.once(function (string) {
        called ++;
        return testData.reverseString(string);
      });
      onced(testData.string).should.equal(testData.reversedString);
      onced(testData.reversedString).should.equal(testData.reversedString);
      called.should.equal(1);
    });

  });

  describe('memoize', function () {

    it('should cache already computed results', function () {
      var called = 0;
      var memoized = _.memoize(function (string) {
        called ++;
        return testData.reverseString(string);
      });
      memoized(testData.string).should.equal(testData.reversedString);
      memoized(testData.string).should.equal(testData.reversedString);
      called.should.equal(1);
    });

    it('should recompute when called with different arguments', function () {
      var called = 0;
      var memoized = _.memoize(function (string) {
        called ++;
        return testData.reverseString(string);
      });
      memoized(testData.string).should.equal(testData.reversedString);
      memoized(testData.reversedString).should.equal(testData.string);
      called.should.equal(2);
    });

  });

  describe('delay', function () {

    it('should delay the execution of a function, and pass arguments when provided', function (done) {
      var called = 0;
      var string = testData.string;
      _.delay(function (str) {
        called ++;
        string = testData.reverseString(str);
      }, 50, testData.string);
      called.should.equal(0);
      string.should.equal(testData.string);
      setTimeout(function () {
        var err;
        try {
          called.should.equal(1);
          string.should.equal(testData.reversedString);
        } catch (e) {err = e;}
        done(err);
      }, 60);
    });

  });

  describe('throttle', function () {

    it('should compute and return the function result when first called', function () {
      var called = 0;
      var throttled = _.throttle(function (string) {
        called ++;
        return testData.reverseString(string);
      }, 1);
      throttled(testData.string).should.equal(testData.reversedString);
      called.should.equal(1);
    });

    it('should return the last computed result when throttled', function () {
      var throttled = _.throttle(function (string) {
        return testData.reverseString(string);
      }, 300);
      throttled(testData.string).should.equal(testData.reversedString);
      throttled().should.equal(testData.reversedString);
    });

    it('should call the function at most once every indicated milliseconds', function (done) {
      var called = 0;
      var throttled = _.throttle(function () {
        called ++;
      }, 50);
      throttled();
      throttled();
      called.should.equal(1);
      setTimeout(function () {
        throttled();
        var err;
        try {called.should.equal(2);}
        catch (e) {err = e;}
        done(err);
      }, 60);
    });

  });

});

// more tests:
// shuffle, first, last, once
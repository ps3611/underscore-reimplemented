'use strict';

// Utilities
function returnArgs () {
  return arguments;
}

// testData
var testData = {
  arr: ['a','b','c','d'], // >= 4 elements, all should be truthy
  obj: {a:1,b:2,c:3,d:4}, // >= 4 values, all should be truthy
  halfTruthyArr: [null,'b',null,'d'], // >= 4 elements, half should be falsy
  halfTruthyObj: {a:1,b:null,c:3,d:null}, // >= 4 values, half should be falsy
  string: 'This is a string.',
  reverseString: function (string) {
    if (typeof string === 'string') return string.split('').reverse().join('');
  }
};

testData.argumentsObj = returnArgs.apply(null, testData.arr);
testData.stringifiedArrElms = testData.arr.join('');
testData.objKeysArr = Object.keys(testData.obj);
testData.objValuesArr = testData.objKeysArr.map(function (key) {
  return testData.obj[key];
});
testData.stringifiedObjKeys = testData.objKeysArr.join('');
testData.stringifiedObjValues = testData.objValuesArr.join('');
testData.halfTruthyObjKeysArr = Object.keys(testData.halfTruthyObj);
testData.halfTruthyObjValuesArr = testData.halfTruthyObjKeysArr.map(function (key) {
  return testData.halfTruthyObj[key];
});
testData.reversedString = testData.reverseString(testData.string);

// Allow testData to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = testData;
}


var _ = {};

// ARRAYS

_.first = function (array, n) {
  if (array === null || array === undefined || typeof(array) === 'number') return [];
  if (Array.isArray(array)) {
    if (n <= 0 || n === undefined) return array.slice(0,1);
    return array.slice(0,n);
  } else {
    return Object.values(array).slice(0,n);
  }
};


_.last = function (array, n) {
  if (array === null || array === undefined || typeof(array) === 'number') return [];
  if (Array.isArray(array)) {
    if (n <= 0 || n === undefined) return array.slice(-1);
    return array.slice(-n);
  }
  else {
    return Object.values(array).slice(-n);
  }
};

// _.uniq(array)
// Produces a duplicate-free version of the array, using === to test equality.
// In particular only the first occurence of each value is kept.
_.uniq = function (array) {
  return array;
};

// OBJECTS

// _.extend(destination, source)
// Copies all the own enumerable properties in the source object over
// to the destination object, and returns it (without using `Object.assign`).
_.extend = function (destination, source) {

};

// _.defaults(destination, source)
// Fills in undefined properties in the destination object
// with own enumerable properties present in the source object,
// and returns the destination object.
_.defaults = function (destination, source) {

};

// COLLECTIONS

_.each = function (collection, iteratee, context) {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++)
      iteratee.call(context, collection[i], i, collection)
  } else {
    for (var key in collection)
      if (collection.hasOwnProperty(key))
        iteratee.call(context, collection[key], key, collection)
  }
  return collection;
};

// _.contains(collection, value)
// Returns an array of indexes / keys where value can be found in the collection.
// TIP: here's a demo of how you can re-use already implemented methods in clever ways.
_.contains = function (collection, value) {

};

// _.map(collection, iteratee, [context])
// Returns a new array of values by mapping each value in collection through iteratee.
// Each invocation of iteratee is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.map = function (collection, iteratee, context) {

};

// _.reduce(collection, iteratee, [accumulator], [context])
// Reduce boils down a collection of values into a single value.
// Accumulator is the initial state of the reduction,
// and each successive step of it should be returned by iteratee.
// Iteratee is passed four arguments: (accumulator, element, index|key, collection),
// and bound to the context if one is passed. If no accumulator is passed
// to the initial invocation of reduce, iteratee is not invoked on the first element,
// and the first element is instead passed as accumulator for the next invocation.
_.reduce = function (collection, iteratee, accumulator, context) {

};

// _.filter(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.filter = function (collection, predicate, context) {

};

// _.reject(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that don't pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// TIP: can you reuse _.filter()?
_.reject = function (collection, predicate, context) {

};

// _.every(collection, [predicate], [context])
// Returns true if all values in the collection pass the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a false element is found.
// TIP: without the short-circuiting you could reuse _.reduce(). Can you figure how?
// Because of the short-circuiting though, you need to re-implement a modified _.each().
_.every = function (collection, predicate, context) {

};

// _.some(collection, [predicate], [context])
// Returns true if any value in the collection passes the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a true element is found.
// TIP: what method that you have already implemented can be reused here?
_.some = function (collection, predicate, context) {

};

// _.invoke(collection, methodName, *arguments)
// Returns an array with the results of calling the method
// indicated by methodName on each value in the collection.
// Any extra arguments passed to invoke will be forwarded on to the method invocation.
_.invoke = function (collection, methodName) {

};

// _.pluck(collection, propertyName)
// A convenient version of what is perhaps the most common use-case for map:
// given an array of objects (collection), iterates over each element
// in the collection, and returns an array with all the values
// corresponding to the property indicated by propertyName.
_.pluck = function (collection, propertyName) {

};

// FUNCTIONS

// _.once(func)
// Creates a version of the function that can only be called one time.
// Repeated calls to the modified function will have no effect,
// returning the value from the original call. Useful for initialization functions,
// instead of having to set a boolean flag and then check it later.
_.once = function (func) {

};

// _.memoize(func)
// Memoizes a given function by caching the computed result.
// Useful for speeding up slow-running computations.
// You may assume that the memoized function takes only one argument
// and that it is a primitive. Memoize should return a function that when called,
// will check if it has already computed the result for the given argument
// and return that value instead of recomputing it.
_.memoize = function (func) {

};

// _.delay(function, wait, *arguments)
// Much like setTimeout(), invokes function after waiting milliseconds.
// If you pass the optional arguments, they will be forwarded
// on to the function when it is invoked.
_.delay = function (func, wait) {

};

// _.throttle(function, wait)
// Returns a new, throttled version of the passed function that,
// when invoked repeatedly, will only call the original function
// at most once per every wait milliseconds, and otherwise will
// just return the last computed result. Useful for rate-limiting
// events that occur faster than you can keep up with.
_.throttle = function (func, wait) {

};


_.shuffle = function (list) {

}

// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = _;
}

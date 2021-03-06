(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var startSlice = n > array.length ? 0 : array.length -n;
    return n === undefined ? array[array.length -1] : array.slice(startSlice, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {    
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    } 
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(item) {
      if (test(item)) result.push(item); 
    });
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(i){ return !test(i) });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var result = [];
    _.each(array, function(i){
      if (_.indexOf(result, i) === -1) result.push(i)
    });
    return result;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];
    _.each(collection, function(i){
      result.push(iterator(i));
    });
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
 
  _.reduce = function(collection, iterator, accumulator) {
    // var result, n;   
    // if (!accumulator && accumulator !== 0) { 
    //   result = collection[0];
    //   n = 1; 
    // } else {
    //   result = accumulator;
    //   n = 0;
    // }
    // _.each(collection.slice(n, collection.length), function(item, key) {      
    //     result = iterator(result, item);  
    // });
    // return result;
    /* Best Solution */
    _.each(collection, function(item){
      accumulator = (accumulator === undefined) ? item : iterator(accumulator, item);
    });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    // return _.reduce(collection, function(memo, item){
    //   if (!memo) {
    //     return false;
    //   }
    //   if (iterator) {
    //     return (iterator(item)) ? true : false;
    //   } else {
    //     return (item) ? true : false;
    //   }
    // }, true);
    // Clever Solution
    return _.reduce(collection, function(memo, item){
      if (!memo) return false;
      return iterator ? iterator(item) ? true : false : (item) ? true : false;     
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    (iterator) ? iterator : iterator = _.identity;
    return !_.every(collection, function(x){ return !iterator(x) });
  };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(arguments, function(itemObj){
      for (var key in itemObj){
        obj[key] = itemObj[key];
      };
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(itemObj){
      for (var key in itemObj){
        if(obj[key] === undefined){
          obj[key] = itemObj[key];
        }
      };
    });
    return obj;    
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    // var add = function(a,b){return a + b};
    // var memoAdd = _.memoize(add);

    // var memo = {},
    //     value;

    // return function() {
    //   var onlyArgs = _.filter(arguments, function(i) {
    //     return typeof i === 'number'
    //   });

    //   if (memo[onlyArgs] === undefined){
    //     value = func.apply(this, arguments);
    //     memo[onlyArgs] = value;
    //     return value;
    //   }
    //   return memo[onlyArgs];
    // }

    /* Clever Solution */
    var memo = {};
    return function() {
      var key = _.map(arguments, function(i){return i});
      return memo[key] !== undefined ? memo[key] : memo[key] = func.apply(this, arguments);
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = _.map(arguments, function(i){return i}).slice(2);
    setTimeout(function(){
      func.apply(null, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    var result = [];
    _.each(array, function(i){
      result.splice(Math.floor(Math.random() * array.length), 0, i);
    });
    return result;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(i){
      return typeof functionOrKey === 'function' ? functionOrKey.apply(i) : i[functionOrKey]()
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if (typeof iterator === 'string') {
      return collection.sort(function(a,b){
        return a[iterator] - b[iterator];
      });
    } else {
     return collection.sort(function(a,b){
       return iterator(a) - iterator(b);
     }); 
    }

    // var filtered, bigger, result = []; 

    // if (typeof iterator === 'string') {
    //   filtered = _.pluck(collection, iterator);
    // } else {
    //   filtered = _.map(collection, iterator);
    // }
    // var stop = false,
    //     timesFalse = 0;
    // console.log(timesFalse);
    // console.log(collection.length - 1);
    // while (timesFalse < collection.length -1) {
    //   timesFalse = 0;

    //   for (var i = 0; i < collection.length -1; i++) {
    //     // console.log(i);
    //     var a = collection[i],
    //         b = collection[i+1],
    //         x = (iterator === 'string') ? a[iterator] : iterator(a),
    //         y = (iterator === 'string') ? b[iterator] : iterator(b),
    //         tp;
        
    //     // BUILD UNDEFINED

    //     if (x > y) {
    //       tp = a; 
    //       collection.splice(i, 1, b);
    //       collection.splice(i+1, 1, tp);
    //     } else { 
    //       timesFalse++;
    //     }
    //     // console.log('collection AFTER change: ', collection);
    //     console.log('collection.length: ', collection.length, 'timesFalse: ', timesFalse);
    //   }

    // }

    // function keepLooping(){
    //   var test = false;
    //   _.reduce(collection, function(a,b){
    //     var x = (iterator === 'string') ? a[iterator] : iterator(a),
    //         y = (iterator === 'string') ? b[iterator] : iterator(b);

    //     if ((x === undefined) || x > y) test = true;
    //     return b;
    //   });
    //   return test;  
    // }

    // // var collection = ['elvio', 'legal', 'casa', 'bolo'];

  
    // while (keepLooping()) {
      
    //   for (var i = 0; i < collection.length -1; i++) {
    //     // console.log(i);
    //     var a = collection[i],
    //         b = collection[i+1],
    //         x = (iterator === 'string') ? a[iterator] : iterator(a),
    //         y = (iterator === 'string') ? b[iterator] : iterator(b),
    //         tp;
    //         console.log('x:', x, ' y:', y);
        
    //     // BUILD UNDEFINED

    //     if (x === undefined) {
    //       tp = a; 
    //       collection.splice(i, 1);
    //       collection.push(tp);         
    //     }
    //     if (x > y) {
    //       tp = a; 
    //       collection.splice(i, 1, b);
    //       collection.splice(i+1, 1, tp);
    //     } else { 
    //       timesFalse++;
    //     }
    //     // console.log('collection AFTER change: ', collection);
    //     console.log('collection.length: ', collection.length, 'timesFalse: ', timesFalse);
    //   }
    // }

      // for (var i = 0; i < collection.length -1; i++) {
      //   var a = collection[i],
      //       b = collection[i+1],
      //       tp;         

      //   bigger = _.reduce(temp, function(a,b){
                   
      //              //captures the values
      //              var x = (typeof iterator === 'string') ? a[iterator] : iterator(a),
      //                  y = (typeof iterator === 'string') ? b[iterator] : iterator(b),
      //                  tp;
                   
      //              if (x === undefined) {
      //               tp = x; 
      //               collection.splice(i, 1);
      //               collection.push(tp);
      //              } else if (x > y) {
      //               tp = a; 
      //               collection.splice(i, 1, b);
      //               collection.splice(i+1, 1, tp);                  
      //            };
      //          })

        // collection.splice(collection.indexOf(bigger), 1);
        // collection.unshift(bigger);
      

    
    
    // collection = result;
    // return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var result = [];
    for (var i = 0; i < arguments[0].length; i++) {
      var temp = [];
      for (var j = 0; j < arguments.length; j++) {
        temp.push(arguments[j][i]);
      }
      result.push(temp);
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    // var result = _.map(nestedArray, function(i){return i}),
    //     stopLooping = false;

    // while (!stopLooping) {
    //   _.each(result, function(item, index) {
    //     var tempArr;
    //     if (Array.isArray(item)) {
    //       // Store the sub array
    //       tempArr = item;
    //       // Delete the sub array inside the array
    //       result.splice(index,1);
    //       // Insert the sub array elements into the parent array
    //       for (var i = tempArr.length -1; i >= 0; i--) {
    //         result.splice(index,0,tempArr[i]);
    //       };
    //     }
    //   });
    //   // Verify whether there are remaining arrays into result.
    //   stopLooping = _.every(result, function(i){return !Array.isArray(i)});
    // }
    // return result;
    
    /* ========== FLATTEN CLEVER SOLUTION 1 ========= */

    // Checks whether an array is present inside the nestedArray
    function checkArray(array){
      return _.some(array, function(i) { return Array.isArray(i) });
    }

    var result = [];

    if (!checkArray(nestedArray)) {
      return nestedArray;
    }

    return _.flatten(result.concat.apply(result, nestedArray));
    
    /* ======== END FLATTEN CLEVER SOLUTION 1 ======= */

  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());

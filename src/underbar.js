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
    return n === undefined ? array[array.length - 1] : array.slice(Math.max(0, array.length - n));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    // if(Array.isArray(collection)) {
    //   for(var i = 0, length = collection.length; i < length; i++) {
    //     iterator(collection[i], i, collection);
    //   }
    // } else {
    //   if(typeof collection === 'object') {
    //     for(var key in collection) {
    //       iterator(collection[key], key, collection);
    //   }
      for(var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for(var key in collection) {
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
    // var filterResult = [];
    //
    // _.each(collection, function(value, index, arr) {
    //   if(test(value, index, arr)) {
    //     filterResult.push(value);
    //   }
    // });
    //
    // return filterResult;
      var res = [];
      _.each(collection, function(val, index, array) {
        if(test(val, index, array)) {
          res.push(val);
        }
      });
      return res;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    // return _.filter(collection, function(value, index, arr) {
    //   return !test(value, index, arr);
    return _.filter(collection, function(val) {
      return !test(val);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    // return _.filter(array, function(value, index, array) {
    //   return _.indexOf(array, value) === index;
    // });
   /* var uniq = [];
    _.each(array, function(val){
      if(_.indexOf(uniq,val) === -1) { uniq.push(val);}
    });
    return uniq;
    */

    /*return _.filter(array, function(val, index, array) {
      return _.indexOf(array, val) === index;
    }); */

    var obj = new Object();
    var unique = [];
    for(var i = 0; i < array.length; i++) {
      obj[array[i]] = array[i];
    }
    for(var key in obj) {
      unique.push(obj[key]);
    }
    return unique;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    // var mapped = [];
    //
    // _.each(collection, function(value, index, arr) {
    //   mapped.push(iterator(value));
    // });
    //
    // return mapped;
    var res = [];

    _.each(collection, function(val) {
      res.push(iterator(val));
    });

    return res;
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
  // _.reduce = function(collection, iterator, accumulator) {
  //   if (accumulator === undefined) {
  //     accumulator = collection[0];
  //     collection = collection.slice(1);
  //     _.each(collection, function(value, index, array) {
  //       accumulator = iterator(accumulator, value);
  //     });
  //   } else {
  //     _.each(collection, function(value, index, array) {
  //       accumulator = iterator(accumulator, value);
  //     });
  //   }
  //
  //   return accumulator;
  _.reduce = function(collection, iterator, accumulator) {
      if (accumulator === undefined) {
        accumulator = collection[0];
        collection = collection.slice(1);
      }
      _.each(collection, function(val) {
        accumulator = iterator(accumulator, val);
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
    /*return _.reduce(collection, function(wasFound, item) {
        return !!(iterator(item) && wasFound);
    }, true);
    */

    // iterator = iterator || _.identity;
    // return _.reduce(collection, function(wasFound, item) {
    //   return !!(iterator(item) && wasFound);
    // }, true);

    //if (iterator === undefined) { iterator = _.identity; }
    /*return _.reduce(collection, function(pass, val) {
      if(!pass) {
        return false;
      }

      return !!iterator(val);
    }, true);*/

    iterator = iterator || _.identity;
    return _.reduce(collection, function(pass, val) {
      return !!iterator(val) && pass;
    }, true);

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity;
    // return !(_.every(collection, function(item) {
    //   return !iterator(item);
    // }));

    /*return _.reduce(collection, function(pass, val) {
      console.log('collection=' + collection);
      console.log(!!iterator(val));
      return pass || !!iterator(val);
    }, false);
*/
    return !_.every(collection, function(val) {
       return !iterator(val);
    });
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
    _.each(arguments, function(arg) {
      // _.each(arg, function(value, key) {
      //   obj[key] = value;
      _.each(arg, function(val, key) {
        obj[key] = val;
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(arg) {
      // _.each(arg, function(value, key) {
      //   if(obj[key] === undefined) {
      //     obj[key] = value;
      _.each(arg, function(val, key) {
        if(obj[key] === undefined) {
          obj[key] = val;
        }
      });
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
    // var alreadyComputed = {};
    //
    // return function(arg) {
    //   if(!alreadyComputed[arg]) {
    //     alreadyComputed[arg] = func.apply(this, arguments);
    //   }
    //   return alreadyComputed[arg];
    // };
    //console.log(arguments.length);
    var alreadyComputed = {};
    var args = Array.prototype.slice.call(arguments, 1);

    return function() {
      if(alreadyComputed[arguments[0]] === undefined) {
        alreadyComputed[arguments[0]] = func.apply(this, arguments);
      }
      return alreadyComputed[arguments[0]];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    // var argArray = Array.prototype.slice.call(arguments, 2);
    // setTimeout(function() {
    //   func.apply(this, argArray);
    var args = Array.prototype.slice.call(arguments,2);
    setInterval(function() {
      func.apply(this,args);
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
    // var copy = array.slice();
    // var counter = copy.length;
    // var temp;
    // var random;
    //
    // while (counter > 0) {
    //   random = Math.floor(Math.random() *  counter);
    //   if(random !== counter) {
    //     counter --;
    //     temp = copy[counter];
    //     copy[counter] = copy[random];
    //     copy[random] = temp;
    //   }
    // }
    // return copy;
     var arr = array.slice();
     var curr = arr.length - 1;
     var rand = 0;
     var t = 0;
     while(curr >= 0) {
       rand = Math.floor(Math.random() * array.length);
       t = arr[rand];
       arr[rand] = arr[curr];
       arr[curr] = t;
       curr -= 1;
     }
     return arr;
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
    return _.map(collection, function(value) {
      if(typeof functionOrKey === 'function') {
        return functionOrKey.apply(value, args);
      }
      else {
        return value[functionOrKey]();
      }
    });
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var arr = collection;
    /*_.each(collection, function(value) {
      arr.push(value[iterator]);
    });*/
    //Sort using sort()
    //console.log(arr);
    arr.sort(function(a,b) {
      if (typeof iterator === 'string') {
        return a[iterator] - b[iterator];
      }
      return iterator(a) - iterator(b);
    });

    return arr;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var args = Array.prototype.slice.call(arguments);
    _.sortBy(args, function(value) {
      return -value.length;
    });

    //console.log(args);
    var max = args[0].length;
    _.each(args, function(value) {
      if(value.length < max) {
        for(var i = value.length; i<max; i++) {
          value.push(undefined);
        }
      }
    });

    //console.log(args[2]);
    var size = args.length;
    var res = [];
    var mini = [];

    for(var j=0; j<max; j++) {
      for(var i = 0; i<size; i++) {
        mini.push(args[i][j]);
      }
      res.push(mini);
      mini = [];
    }

    return res;

  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var arr = [];

    var search = function(something) {
      if(Array.isArray(something)) {
        for(var i = 0; i<something.length; i++) {
          search(something[i]);
        }
      }
      else { arr.push(something); }
    };

    search(nestedArray);
    return arr;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var argLength = arguments.length;
    var args = Array.prototype.slice.call(arguments);
    var flat = _.flatten(args);

    flat.sort(function(a,b) {
      if(a < b) {return -1;}
      if(a > b) {return 1;}
      return 0;
    });

    //console.log(flat);
    var count = 0;
    var res = [];
    for(var i = 0; i < flat.length; i++) {
      count = 1;
      while(flat[i] === flat[i + 1]) {
        count++;
        i++;
        if(count === argLength) {
          res.push(flat[i]);
          break;
        }
      }
    }
    //console.log(res);
    return res;

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    /*var arr = Array.prototype.slice.call(arguments);
    arr = arr.slice(1);

    var res = [];
    for (var i = 0; i<arr.length; i++) {
      res.push(_.intersection(array,arr[i]));
    }

    var intersect = _.flatten(res);
    console.log(intersect);

    res = [];
    _.each(array, function(val) {
      if(_.indexOf(intersect,val) === -1) {
        res.push(val);
      }
    });
    console.log(intersect);
    return res;*/

    var arr = Array.prototype.slice.call(arguments);
    arr = arr.slice(1);
    var flat = _.flatten(arr);

    var res = [];
    _.each(array, function(val) {
      if(_.indexOf(flat,val) === -1) {
        res.push(val);
      }
    });
    return res;


  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    var called = false;
    var flip = function() {
      called = !called;
    }
    setTimeout(flip, wait);

    return function() {

      if(!called) {
        called = !called;
        return func.apply(this,arguments);
      }
    }
};

}());

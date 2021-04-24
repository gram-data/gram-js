(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory((global.gram = global.gram || {}, global.gram.parse = {})));
}(this, (function (exports) { 'use strict';

  var bail_1 = bail;

  function bail(err) {
    if (err) {
      throw err
    }
  }

  /*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */

  var isBuffer = function isBuffer (obj) {
    return obj != null && obj.constructor != null &&
      typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
  };

  var hasOwn = Object.prototype.hasOwnProperty;
  var toStr = Object.prototype.toString;
  var defineProperty = Object.defineProperty;
  var gOPD = Object.getOwnPropertyDescriptor;

  var isArray = function isArray(arr) {
  	if (typeof Array.isArray === 'function') {
  		return Array.isArray(arr);
  	}

  	return toStr.call(arr) === '[object Array]';
  };

  var isPlainObject = function isPlainObject(obj) {
  	if (!obj || toStr.call(obj) !== '[object Object]') {
  		return false;
  	}

  	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
  	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
  	// Not own constructor property must be Object
  	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
  		return false;
  	}

  	// Own properties are enumerated firstly, so to speed up,
  	// if last one is own, then all properties are own.
  	var key;
  	for (key in obj) { /**/ }

  	return typeof key === 'undefined' || hasOwn.call(obj, key);
  };

  // If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
  var setProperty = function setProperty(target, options) {
  	if (defineProperty && options.name === '__proto__') {
  		defineProperty(target, options.name, {
  			enumerable: true,
  			configurable: true,
  			value: options.newValue,
  			writable: true
  		});
  	} else {
  		target[options.name] = options.newValue;
  	}
  };

  // Return undefined instead of __proto__ if '__proto__' is not an own property
  var getProperty = function getProperty(obj, name) {
  	if (name === '__proto__') {
  		if (!hasOwn.call(obj, name)) {
  			return void 0;
  		} else if (gOPD) {
  			// In early versions of node, obj['__proto__'] is buggy when obj has
  			// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
  			return gOPD(obj, name).value;
  		}
  	}

  	return obj[name];
  };

  var extend = function extend() {
  	var options, name, src, copy, copyIsArray, clone;
  	var target = arguments[0];
  	var i = 1;
  	var length = arguments.length;
  	var deep = false;

  	// Handle a deep copy situation
  	if (typeof target === 'boolean') {
  		deep = target;
  		target = arguments[1] || {};
  		// skip the boolean and the target
  		i = 2;
  	}
  	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
  		target = {};
  	}

  	for (; i < length; ++i) {
  		options = arguments[i];
  		// Only deal with non-null/undefined values
  		if (options != null) {
  			// Extend the base object
  			for (name in options) {
  				src = getProperty(target, name);
  				copy = getProperty(options, name);

  				// Prevent never-ending loop
  				if (target !== copy) {
  					// Recurse if we're merging plain objects or arrays
  					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
  						if (copyIsArray) {
  							copyIsArray = false;
  							clone = src && isArray(src) ? src : [];
  						} else {
  							clone = src && isPlainObject(src) ? src : {};
  						}

  						// Never move original objects, clone them
  						setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

  					// Don't bring in undefined values
  					} else if (typeof copy !== 'undefined') {
  						setProperty(target, { name: name, newValue: copy });
  					}
  				}
  			}
  		}
  	}

  	// Return the modified object
  	return target;
  };

  var isPlainObj = value => {
  	if (Object.prototype.toString.call(value) !== '[object Object]') {
  		return false;
  	}

  	const prototype = Object.getPrototypeOf(value);
  	return prototype === null || prototype === Object.prototype;
  };

  var slice = [].slice;

  var wrap_1 = wrap;

  // Wrap `fn`.
  // Can be sync or async; return a promise, receive a completion handler, return
  // new values and errors.
  function wrap(fn, callback) {
    var invoked;

    return wrapped

    function wrapped() {
      var params = slice.call(arguments, 0);
      var callback = fn.length > params.length;
      var result;

      if (callback) {
        params.push(done);
      }

      try {
        result = fn.apply(null, params);
      } catch (error) {
        // Well, this is quite the pickle.
        // `fn` received a callback and invoked it (thus continuing the pipeline),
        // but later also threw an error.
        // We’re not about to restart the pipeline again, so the only thing left
        // to do is to throw the thing instead.
        if (callback && invoked) {
          throw error
        }

        return done(error)
      }

      if (!callback) {
        if (result && typeof result.then === 'function') {
          result.then(then, done);
        } else if (result instanceof Error) {
          done(result);
        } else {
          then(result);
        }
      }
    }

    // Invoke `next`, only once.
    function done() {
      if (!invoked) {
        invoked = true;

        callback.apply(null, arguments);
      }
    }

    // Invoke `done` with one value.
    // Tracks if an error is passed, too.
    function then(value) {
      done(null, value);
    }
  }

  var trough_1 = trough;

  trough.wrap = wrap_1;

  var slice$1 = [].slice;

  // Create new middleware.
  function trough() {
    var fns = [];
    var middleware = {};

    middleware.run = run;
    middleware.use = use;

    return middleware

    // Run `fns`.  Last argument must be a completion handler.
    function run() {
      var index = -1;
      var input = slice$1.call(arguments, 0, -1);
      var done = arguments[arguments.length - 1];

      if (typeof done !== 'function') {
        throw new Error('Expected function as last argument, not ' + done)
      }

      next.apply(null, [null].concat(input));

      // Run the next `fn`, if any.
      function next(err) {
        var fn = fns[++index];
        var params = slice$1.call(arguments, 0);
        var values = params.slice(1);
        var length = input.length;
        var pos = -1;

        if (err) {
          done(err);
          return
        }

        // Copy non-nully input into values.
        while (++pos < length) {
          if (values[pos] === null || values[pos] === undefined) {
            values[pos] = input[pos];
          }
        }

        input = values;

        // Next or done.
        if (fn) {
          wrap_1(fn, next).apply(null, input);
        } else {
          done.apply(null, [null].concat(input));
        }
      }
    }

    // Add `fn` to the list.
    function use(fn) {
      if (typeof fn !== 'function') {
        throw new Error('Expected `fn` to be a function, not ' + fn)
      }

      fns.push(fn);

      return middleware
    }
  }

  var own = {}.hasOwnProperty;

  var unistUtilStringifyPosition = stringify;

  function stringify(value) {
    // Nothing.
    if (!value || typeof value !== 'object') {
      return ''
    }

    // Node.
    if (own.call(value, 'position') || own.call(value, 'type')) {
      return position(value.position)
    }

    // Position.
    if (own.call(value, 'start') || own.call(value, 'end')) {
      return position(value)
    }

    // Point.
    if (own.call(value, 'line') || own.call(value, 'column')) {
      return point(value)
    }

    // ?
    return ''
  }

  function point(point) {
    if (!point || typeof point !== 'object') {
      point = {};
    }

    return index(point.line) + ':' + index(point.column)
  }

  function position(pos) {
    if (!pos || typeof pos !== 'object') {
      pos = {};
    }

    return point(pos.start) + '-' + point(pos.end)
  }

  function index(value) {
    return value && typeof value === 'number' ? value : 1
  }

  var vfileMessage = VMessage;

  // Inherit from `Error#`.
  function VMessagePrototype() {}
  VMessagePrototype.prototype = Error.prototype;
  VMessage.prototype = new VMessagePrototype();

  // Message properties.
  var proto = VMessage.prototype;

  proto.file = '';
  proto.name = '';
  proto.reason = '';
  proto.message = '';
  proto.stack = '';
  proto.fatal = null;
  proto.column = null;
  proto.line = null;

  // Construct a new VMessage.
  //
  // Note: We cannot invoke `Error` on the created context, as that adds readonly
  // `line` and `column` attributes on Safari 9, thus throwing and failing the
  // data.
  function VMessage(reason, position, origin) {
    var parts;
    var range;
    var location;

    if (typeof position === 'string') {
      origin = position;
      position = null;
    }

    parts = parseOrigin(origin);
    range = unistUtilStringifyPosition(position) || '1:1';

    location = {
      start: {line: null, column: null},
      end: {line: null, column: null}
    };

    // Node.
    if (position && position.position) {
      position = position.position;
    }

    if (position) {
      // Position.
      if (position.start) {
        location = position;
        position = position.start;
      } else {
        // Point.
        location.start = position;
      }
    }

    if (reason.stack) {
      this.stack = reason.stack;
      reason = reason.message;
    }

    this.message = reason;
    this.name = range;
    this.reason = reason;
    this.line = position ? position.line : null;
    this.column = position ? position.column : null;
    this.location = location;
    this.source = parts[0];
    this.ruleId = parts[1];
  }

  function parseOrigin(origin) {
    var result = [null, null];
    var index;

    if (typeof origin === 'string') {
      index = origin.indexOf(':');

      if (index === -1) {
        result[1] = origin;
      } else {
        result[0] = origin.slice(0, index);
        result[1] = origin.slice(index + 1);
      }
    }

    return result
  }

  var global$1 = (typeof global !== "undefined" ? global :
              typeof self !== "undefined" ? self :
              typeof window !== "undefined" ? window : {});

  // shim for using process in browser
  // based off https://github.com/defunctzombie/node-process/blob/master/browser.js

  function defaultSetTimout() {
      throw new Error('setTimeout has not been defined');
  }
  function defaultClearTimeout () {
      throw new Error('clearTimeout has not been defined');
  }
  var cachedSetTimeout = defaultSetTimout;
  var cachedClearTimeout = defaultClearTimeout;
  if (typeof global$1.setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
  }
  if (typeof global$1.clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
  }

  function runTimeout(fun) {
      if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
      }
      // if setTimeout wasn't available but was latter defined
      if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
      } catch(e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
              return cachedSetTimeout.call(null, fun, 0);
          } catch(e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
              return cachedSetTimeout.call(this, fun, 0);
          }
      }


  }
  function runClearTimeout(marker) {
      if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
      }
      // if clearTimeout wasn't available but was latter defined
      if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
      }
      try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
      } catch (e){
          try {
              // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
              return cachedClearTimeout.call(null, marker);
          } catch (e){
              // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
              // Some versions of I.E. have different rules for clearTimeout vs setTimeout
              return cachedClearTimeout.call(this, marker);
          }
      }



  }
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;

  function cleanUpNextTick() {
      if (!draining || !currentQueue) {
          return;
      }
      draining = false;
      if (currentQueue.length) {
          queue = currentQueue.concat(queue);
      } else {
          queueIndex = -1;
      }
      if (queue.length) {
          drainQueue();
      }
  }

  function drainQueue() {
      if (draining) {
          return;
      }
      var timeout = runTimeout(cleanUpNextTick);
      draining = true;

      var len = queue.length;
      while(len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
              if (currentQueue) {
                  currentQueue[queueIndex].run();
              }
          }
          queueIndex = -1;
          len = queue.length;
      }
      currentQueue = null;
      draining = false;
      runClearTimeout(timeout);
  }
  function nextTick(fun) {
      var args = new Array(arguments.length - 1);
      if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
              args[i - 1] = arguments[i];
          }
      }
      queue.push(new Item(fun, args));
      if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
      }
  }
  // v8 likes predictible objects
  function Item(fun, array) {
      this.fun = fun;
      this.array = array;
  }
  Item.prototype.run = function () {
      this.fun.apply(null, this.array);
  };
  var title = 'browser';
  var platform = 'browser';
  var browser = true;
  var env = {};
  var argv = [];
  var version = ''; // empty string to avoid regexp issues
  var versions = {};
  var release = {};
  var config = {};

  function noop() {}

  var on = noop;
  var addListener = noop;
  var once = noop;
  var off = noop;
  var removeListener = noop;
  var removeAllListeners = noop;
  var emit = noop;

  function binding(name) {
      throw new Error('process.binding is not supported');
  }

  function cwd () { return '/' }
  function chdir (dir) {
      throw new Error('process.chdir is not supported');
  }function umask() { return 0; }

  // from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
  var performance = global$1.performance || {};
  var performanceNow =
    performance.now        ||
    performance.mozNow     ||
    performance.msNow      ||
    performance.oNow       ||
    performance.webkitNow  ||
    function(){ return (new Date()).getTime() };

  // generate timestamp or delta
  // see http://nodejs.org/api/process.html#process_process_hrtime
  function hrtime(previousTimestamp){
    var clocktime = performanceNow.call(performance)*1e-3;
    var seconds = Math.floor(clocktime);
    var nanoseconds = Math.floor((clocktime%1)*1e9);
    if (previousTimestamp) {
      seconds = seconds - previousTimestamp[0];
      nanoseconds = nanoseconds - previousTimestamp[1];
      if (nanoseconds<0) {
        seconds--;
        nanoseconds += 1e9;
      }
    }
    return [seconds,nanoseconds]
  }

  var startTime = new Date();
  function uptime() {
    var currentTime = new Date();
    var dif = currentTime - startTime;
    return dif / 1000;
  }

  var process = {
    nextTick: nextTick,
    title: title,
    browser: browser,
    env: env,
    argv: argv,
    version: version,
    versions: versions,
    on: on,
    addListener: addListener,
    once: once,
    off: off,
    removeListener: removeListener,
    removeAllListeners: removeAllListeners,
    emit: emit,
    binding: binding,
    cwd: cwd,
    chdir: chdir,
    umask: umask,
    hrtime: hrtime,
    platform: platform,
    release: release,
    config: config,
    uptime: uptime
  };

  // Copyright Joyent, Inc. and other Node contributors.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a
  // copy of this software and associated documentation files (the
  // "Software"), to deal in the Software without restriction, including
  // without limitation the rights to use, copy, modify, merge, publish,
  // distribute, sublicense, and/or sell copies of the Software, and to permit
  // persons to whom the Software is furnished to do so, subject to the
  // following conditions:
  //
  // The above copyright notice and this permission notice shall be included
  // in all copies or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
  // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
  // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
  // USE OR OTHER DEALINGS IN THE SOFTWARE.

  // resolves . and .. elements in a path array with directory names there
  // must be no slashes, empty elements, or device names (c:\) in the array
  // (so also no leading and trailing slashes - it does not distinguish
  // relative and absolute paths)
  function normalizeArray(parts, allowAboveRoot) {
    // if the path tries to go above the root, `up` ends up > 0
    var up = 0;
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];
      if (last === '.') {
        parts.splice(i, 1);
      } else if (last === '..') {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (allowAboveRoot) {
      for (; up--; up) {
        parts.unshift('..');
      }
    }

    return parts;
  }

  // Split a filename into [root, dir, basename, ext], unix version
  // 'root' is just a slash, or nothing.
  var splitPathRe =
      /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  var splitPath = function(filename) {
    return splitPathRe.exec(filename).slice(1);
  };

  // path.resolve([from ...], to)
  // posix version
  function resolve() {
    var resolvedPath = '',
        resolvedAbsolute = false;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = (i >= 0) ? arguments[i] : '/';

      // Skip empty and invalid entries
      if (typeof path !== 'string') {
        throw new TypeError('Arguments to path.resolve must be strings');
      } else if (!path) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charAt(0) === '/';
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
      return !!p;
    }), !resolvedAbsolute).join('/');

    return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
  }
  // path.normalize(path)
  // posix version
  function normalize(path) {
    var isPathAbsolute = isAbsolute(path),
        trailingSlash = substr(path, -1) === '/';

    // Normalize the path
    path = normalizeArray(filter(path.split('/'), function(p) {
      return !!p;
    }), !isPathAbsolute).join('/');

    if (!path && !isPathAbsolute) {
      path = '.';
    }
    if (path && trailingSlash) {
      path += '/';
    }

    return (isPathAbsolute ? '/' : '') + path;
  }
  // posix version
  function isAbsolute(path) {
    return path.charAt(0) === '/';
  }

  // posix version
  function join() {
    var paths = Array.prototype.slice.call(arguments, 0);
    return normalize(filter(paths, function(p, index) {
      if (typeof p !== 'string') {
        throw new TypeError('Arguments to path.join must be strings');
      }
      return p;
    }).join('/'));
  }


  // path.relative(from, to)
  // posix version
  function relative(from, to) {
    from = resolve(from).substr(1);
    to = resolve(to).substr(1);

    function trim(arr) {
      var start = 0;
      for (; start < arr.length; start++) {
        if (arr[start] !== '') break;
      }

      var end = arr.length - 1;
      for (; end >= 0; end--) {
        if (arr[end] !== '') break;
      }

      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }

    var fromParts = trim(from.split('/'));
    var toParts = trim(to.split('/'));

    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }

    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push('..');
    }

    outputParts = outputParts.concat(toParts.slice(samePartsLength));

    return outputParts.join('/');
  }

  var sep = '/';
  var delimiter = ':';

  function dirname(path) {
    var result = splitPath(path),
        root = result[0],
        dir = result[1];

    if (!root && !dir) {
      // No dirname whatsoever
      return '.';
    }

    if (dir) {
      // It has a dirname, strip trailing slash
      dir = dir.substr(0, dir.length - 1);
    }

    return root + dir;
  }

  function basename(path, ext) {
    var f = splitPath(path)[2];
    // TODO: make this comparison case-insensitive on windows?
    if (ext && f.substr(-1 * ext.length) === ext) {
      f = f.substr(0, f.length - ext.length);
    }
    return f;
  }


  function extname(path) {
    return splitPath(path)[3];
  }
  var path = {
    extname: extname,
    basename: basename,
    dirname: dirname,
    sep: sep,
    delimiter: delimiter,
    relative: relative,
    join: join,
    isAbsolute: isAbsolute,
    normalize: normalize,
    resolve: resolve
  };
  function filter (xs, f) {
      if (xs.filter) return xs.filter(f);
      var res = [];
      for (var i = 0; i < xs.length; i++) {
          if (f(xs[i], i, xs)) res.push(xs[i]);
      }
      return res;
  }

  // String.prototype.substr - negative index don't work in IE8
  var substr = 'ab'.substr(-1) === 'b' ?
      function (str, start, len) { return str.substr(start, len) } :
      function (str, start, len) {
          if (start < 0) start = str.length + start;
          return str.substr(start, len);
      }
  ;

  function replaceExt(npath, ext) {
    if (typeof npath !== 'string') {
      return npath;
    }

    if (npath.length === 0) {
      return npath;
    }

    var nFileName = path.basename(npath, path.extname(npath)) + ext;
    return path.join(path.dirname(npath), nFileName);
  }

  var replaceExt_1 = replaceExt;

  /*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */

  var isBuffer$1 = function isBuffer (obj) {
    return obj != null && obj.constructor != null &&
      typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
  };

  var core = VFile;

  var own$1 = {}.hasOwnProperty;
  var proto$1 = VFile.prototype;

  // Order of setting (least specific to most), we need this because otherwise
  // `{stem: 'a', path: '~/b.js'}` would throw, as a path is needed before a
  // stem can be set.
  var order = ['history', 'path', 'basename', 'stem', 'extname', 'dirname'];

  proto$1.toString = toString;

  // Access full path (`~/index.min.js`).
  Object.defineProperty(proto$1, 'path', {get: getPath, set: setPath});

  // Access parent path (`~`).
  Object.defineProperty(proto$1, 'dirname', {get: getDirname, set: setDirname});

  // Access basename (`index.min.js`).
  Object.defineProperty(proto$1, 'basename', {get: getBasename, set: setBasename});

  // Access extname (`.js`).
  Object.defineProperty(proto$1, 'extname', {get: getExtname, set: setExtname});

  // Access stem (`index.min`).
  Object.defineProperty(proto$1, 'stem', {get: getStem, set: setStem});

  // Construct a new file.
  function VFile(options) {
    var prop;
    var index;
    var length;

    if (!options) {
      options = {};
    } else if (typeof options === 'string' || isBuffer$1(options)) {
      options = {contents: options};
    } else if ('message' in options && 'messages' in options) {
      return options
    }

    if (!(this instanceof VFile)) {
      return new VFile(options)
    }

    this.data = {};
    this.messages = [];
    this.history = [];
    this.cwd = process.cwd();

    // Set path related properties in the correct order.
    index = -1;
    length = order.length;

    while (++index < length) {
      prop = order[index];

      if (own$1.call(options, prop)) {
        this[prop] = options[prop];
      }
    }

    // Set non-path related properties.
    for (prop in options) {
      if (order.indexOf(prop) === -1) {
        this[prop] = options[prop];
      }
    }
  }

  function getPath() {
    return this.history[this.history.length - 1]
  }

  function setPath(path) {
    assertNonEmpty(path, 'path');

    if (path !== this.path) {
      this.history.push(path);
    }
  }

  function getDirname() {
    return typeof this.path === 'string' ? path.dirname(this.path) : undefined
  }

  function setDirname(dirname) {
    assertPath(this.path, 'dirname');
    this.path = path.join(dirname || '', this.basename);
  }

  function getBasename() {
    return typeof this.path === 'string' ? path.basename(this.path) : undefined
  }

  function setBasename(basename) {
    assertNonEmpty(basename, 'basename');
    assertPart(basename, 'basename');
    this.path = path.join(this.dirname || '', basename);
  }

  function getExtname() {
    return typeof this.path === 'string' ? path.extname(this.path) : undefined
  }

  function setExtname(extname) {
    var ext = extname || '';

    assertPart(ext, 'extname');
    assertPath(this.path, 'extname');

    if (ext) {
      if (ext.charAt(0) !== '.') {
        throw new Error('`extname` must start with `.`')
      }

      if (ext.indexOf('.', 1) !== -1) {
        throw new Error('`extname` cannot contain multiple dots')
      }
    }

    this.path = replaceExt_1(this.path, ext);
  }

  function getStem() {
    return typeof this.path === 'string'
      ? path.basename(this.path, this.extname)
      : undefined
  }

  function setStem(stem) {
    assertNonEmpty(stem, 'stem');
    assertPart(stem, 'stem');
    this.path = path.join(this.dirname || '', stem + (this.extname || ''));
  }

  // Get the value of the file.
  function toString(encoding) {
    var value = this.contents || '';
    return isBuffer$1(value) ? value.toString(encoding) : String(value)
  }

  // Assert that `part` is not a path (i.e., does not contain `path.sep`).
  function assertPart(part, name) {
    if (part.indexOf(path.sep) !== -1) {
      throw new Error(
        '`' + name + '` cannot be a path: did not expect `' + path.sep + '`'
      )
    }
  }

  // Assert that `part` is not empty.
  function assertNonEmpty(part, name) {
    if (!part) {
      throw new Error('`' + name + '` cannot be empty')
    }
  }

  // Assert `path` exists.
  function assertPath(path, name) {
    if (!path) {
      throw new Error('Setting `' + name + '` requires `path` to be set too')
    }
  }

  var vfile = core;

  var proto$2 = core.prototype;

  proto$2.message = message;
  proto$2.info = info;
  proto$2.fail = fail;

  // Create a message with `reason` at `position`.
  // When an error is passed in as `reason`, copies the stack.
  function message(reason, position, origin) {
    var filePath = this.path;
    var message = new vfileMessage(reason, position, origin);

    if (filePath) {
      message.name = filePath + ':' + message.name;
      message.file = filePath;
    }

    message.fatal = false;

    this.messages.push(message);

    return message
  }

  // Fail: creates a vmessage, associates it with the file, and throws it.
  function fail() {
    var message = this.message.apply(this, arguments);

    message.fatal = true;

    throw message
  }

  // Info: creates a vmessage, associates it with the file, and marks the fatality
  // as null.
  function info() {
    var message = this.message.apply(this, arguments);

    message.fatal = null;

    return message
  }

  // Expose a frozen processor.
  var unified_1 = unified().freeze();

  var slice$2 = [].slice;
  var own$2 = {}.hasOwnProperty;

  // Process pipeline.
  var pipeline = trough_1()
    .use(pipelineParse)
    .use(pipelineRun)
    .use(pipelineStringify);

  function pipelineParse(p, ctx) {
    ctx.tree = p.parse(ctx.file);
  }

  function pipelineRun(p, ctx, next) {
    p.run(ctx.tree, ctx.file, done);

    function done(err, tree, file) {
      if (err) {
        next(err);
      } else {
        ctx.tree = tree;
        ctx.file = file;
        next();
      }
    }
  }

  function pipelineStringify(p, ctx) {
    var result = p.stringify(ctx.tree, ctx.file);
    var file = ctx.file;

    if (result === undefined || result === null) ; else if (typeof result === 'string' || isBuffer(result)) {
      file.contents = result;
    } else {
      file.result = result;
    }
  }

  // Function to create the first processor.
  function unified() {
    var attachers = [];
    var transformers = trough_1();
    var namespace = {};
    var frozen = false;
    var freezeIndex = -1;

    // Data management.
    processor.data = data;

    // Lock.
    processor.freeze = freeze;

    // Plugins.
    processor.attachers = attachers;
    processor.use = use;

    // API.
    processor.parse = parse;
    processor.stringify = stringify;
    processor.run = run;
    processor.runSync = runSync;
    processor.process = process;
    processor.processSync = processSync;

    // Expose.
    return processor

    // Create a new processor based on the processor in the current scope.
    function processor() {
      var destination = unified();
      var length = attachers.length;
      var index = -1;

      while (++index < length) {
        destination.use.apply(null, attachers[index]);
      }

      destination.data(extend(true, {}, namespace));

      return destination
    }

    // Freeze: used to signal a processor that has finished configuration.
    //
    // For example, take unified itself: it’s frozen.
    // Plugins should not be added to it.
    // Rather, it should be extended, by invoking it, before modifying it.
    //
    // In essence, always invoke this when exporting a processor.
    function freeze() {
      var values;
      var plugin;
      var options;
      var transformer;

      if (frozen) {
        return processor
      }

      while (++freezeIndex < attachers.length) {
        values = attachers[freezeIndex];
        plugin = values[0];
        options = values[1];
        transformer = null;

        if (options === false) {
          continue
        }

        if (options === true) {
          values[1] = undefined;
        }

        transformer = plugin.apply(processor, values.slice(1));

        if (typeof transformer === 'function') {
          transformers.use(transformer);
        }
      }

      frozen = true;
      freezeIndex = Infinity;

      return processor
    }

    // Data management.
    // Getter / setter for processor-specific informtion.
    function data(key, value) {
      if (typeof key === 'string') {
        // Set `key`.
        if (arguments.length === 2) {
          assertUnfrozen('data', frozen);

          namespace[key] = value;

          return processor
        }

        // Get `key`.
        return (own$2.call(namespace, key) && namespace[key]) || null
      }

      // Set space.
      if (key) {
        assertUnfrozen('data', frozen);
        namespace = key;
        return processor
      }

      // Get space.
      return namespace
    }

    // Plugin management.
    //
    // Pass it:
    // *   an attacher and options,
    // *   a preset,
    // *   a list of presets, attachers, and arguments (list of attachers and
    //     options).
    function use(value) {
      var settings;

      assertUnfrozen('use', frozen);

      if (value === null || value === undefined) ; else if (typeof value === 'function') {
        addPlugin.apply(null, arguments);
      } else if (typeof value === 'object') {
        if ('length' in value) {
          addList(value);
        } else {
          addPreset(value);
        }
      } else {
        throw new Error('Expected usable value, not `' + value + '`')
      }

      if (settings) {
        namespace.settings = extend(namespace.settings || {}, settings);
      }

      return processor

      function addPreset(result) {
        addList(result.plugins);

        if (result.settings) {
          settings = extend(settings || {}, result.settings);
        }
      }

      function add(value) {
        if (typeof value === 'function') {
          addPlugin(value);
        } else if (typeof value === 'object') {
          if ('length' in value) {
            addPlugin.apply(null, value);
          } else {
            addPreset(value);
          }
        } else {
          throw new Error('Expected usable value, not `' + value + '`')
        }
      }

      function addList(plugins) {
        var length;
        var index;

        if (plugins === null || plugins === undefined) ; else if (typeof plugins === 'object' && 'length' in plugins) {
          length = plugins.length;
          index = -1;

          while (++index < length) {
            add(plugins[index]);
          }
        } else {
          throw new Error('Expected a list of plugins, not `' + plugins + '`')
        }
      }

      function addPlugin(plugin, value) {
        var entry = find(plugin);

        if (entry) {
          if (isPlainObj(entry[1]) && isPlainObj(value)) {
            value = extend(entry[1], value);
          }

          entry[1] = value;
        } else {
          attachers.push(slice$2.call(arguments));
        }
      }
    }

    function find(plugin) {
      var length = attachers.length;
      var index = -1;
      var entry;

      while (++index < length) {
        entry = attachers[index];

        if (entry[0] === plugin) {
          return entry
        }
      }
    }

    // Parse a file (in string or vfile representation) into a unist node using
    // the `Parser` on the processor.
    function parse(doc) {
      var file = vfile(doc);
      var Parser;

      freeze();
      Parser = processor.Parser;
      assertParser('parse', Parser);

      if (newable(Parser, 'parse')) {
        return new Parser(String(file), file).parse()
      }

      return Parser(String(file), file) // eslint-disable-line new-cap
    }

    // Run transforms on a unist node representation of a file (in string or
    // vfile representation), async.
    function run(node, file, cb) {
      assertNode(node);
      freeze();

      if (!cb && typeof file === 'function') {
        cb = file;
        file = null;
      }

      if (!cb) {
        return new Promise(executor)
      }

      executor(null, cb);

      function executor(resolve, reject) {
        transformers.run(node, vfile(file), done);

        function done(err, tree, file) {
          tree = tree || node;
          if (err) {
            reject(err);
          } else if (resolve) {
            resolve(tree);
          } else {
            cb(null, tree, file);
          }
        }
      }
    }

    // Run transforms on a unist node representation of a file (in string or
    // vfile representation), sync.
    function runSync(node, file) {
      var complete = false;
      var result;

      run(node, file, done);

      assertDone('runSync', 'run', complete);

      return result

      function done(err, tree) {
        complete = true;
        bail_1(err);
        result = tree;
      }
    }

    // Stringify a unist node representation of a file (in string or vfile
    // representation) into a string using the `Compiler` on the processor.
    function stringify(node, doc) {
      var file = vfile(doc);
      var Compiler;

      freeze();
      Compiler = processor.Compiler;
      assertCompiler('stringify', Compiler);
      assertNode(node);

      if (newable(Compiler, 'compile')) {
        return new Compiler(node, file).compile()
      }

      return Compiler(node, file) // eslint-disable-line new-cap
    }

    // Parse a file (in string or vfile representation) into a unist node using
    // the `Parser` on the processor, then run transforms on that node, and
    // compile the resulting node using the `Compiler` on the processor, and
    // store that result on the vfile.
    function process(doc, cb) {
      freeze();
      assertParser('process', processor.Parser);
      assertCompiler('process', processor.Compiler);

      if (!cb) {
        return new Promise(executor)
      }

      executor(null, cb);

      function executor(resolve, reject) {
        var file = vfile(doc);

        pipeline.run(processor, {file: file}, done);

        function done(err) {
          if (err) {
            reject(err);
          } else if (resolve) {
            resolve(file);
          } else {
            cb(null, file);
          }
        }
      }
    }

    // Process the given document (in string or vfile representation), sync.
    function processSync(doc) {
      var complete = false;
      var file;

      freeze();
      assertParser('processSync', processor.Parser);
      assertCompiler('processSync', processor.Compiler);
      file = vfile(doc);

      process(file, done);

      assertDone('processSync', 'process', complete);

      return file

      function done(err) {
        complete = true;
        bail_1(err);
      }
    }
  }

  // Check if `value` is a constructor.
  function newable(value, name) {
    return (
      typeof value === 'function' &&
      value.prototype &&
      // A function with keys in its prototype is probably a constructor.
      // Classes’ prototype methods are not enumerable, so we check if some value
      // exists in the prototype.
      (keys(value.prototype) || name in value.prototype)
    )
  }

  // Check if `value` is an object with keys.
  function keys(value) {
    var key;
    for (key in value) {
      return true
    }

    return false
  }

  // Assert a parser is available.
  function assertParser(name, Parser) {
    if (typeof Parser !== 'function') {
      throw new Error('Cannot `' + name + '` without `Parser`')
    }
  }

  // Assert a compiler is available.
  function assertCompiler(name, Compiler) {
    if (typeof Compiler !== 'function') {
      throw new Error('Cannot `' + name + '` without `Compiler`')
    }
  }

  // Assert the processor is not frozen.
  function assertUnfrozen(name, frozen) {
    if (frozen) {
      throw new Error(
        'Cannot invoke `' +
          name +
          '` on a frozen processor.\nCreate a new processor first, by invoking it: use `processor()` instead of `processor`.'
      )
    }
  }

  // Assert `node` is a unist node.
  function assertNode(node) {
    if (!node || typeof node.type !== 'string') {
      throw new Error('Expected node, got `' + node + '`')
    }
  }

  // Assert that `complete` is `true`.
  function assertDone(name, asyncName, complete) {
    if (!complete) {
      throw new Error(
        '`' + name + '` finished async. Use `' + asyncName + '` instead'
      )
    }
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var nearley = createCommonjsModule(function (module) {
  (function(root, factory) {
      if ( module.exports) {
          module.exports = factory();
      } else {
          root.nearley = factory();
      }
  }(commonjsGlobal, function() {

      function Rule(name, symbols, postprocess) {
          this.id = ++Rule.highestId;
          this.name = name;
          this.symbols = symbols;        // a list of literal | regex class | nonterminal
          this.postprocess = postprocess;
          return this;
      }
      Rule.highestId = 0;

      Rule.prototype.toString = function(withCursorAt) {
          var symbolSequence = (typeof withCursorAt === "undefined")
                               ? this.symbols.map(getSymbolShortDisplay).join(' ')
                               : (   this.symbols.slice(0, withCursorAt).map(getSymbolShortDisplay).join(' ')
                                   + " ● "
                                   + this.symbols.slice(withCursorAt).map(getSymbolShortDisplay).join(' ')     );
          return this.name + " → " + symbolSequence;
      };


      // a State is a rule at a position from a given starting point in the input stream (reference)
      function State(rule, dot, reference, wantedBy) {
          this.rule = rule;
          this.dot = dot;
          this.reference = reference;
          this.data = [];
          this.wantedBy = wantedBy;
          this.isComplete = this.dot === rule.symbols.length;
      }

      State.prototype.toString = function() {
          return "{" + this.rule.toString(this.dot) + "}, from: " + (this.reference || 0);
      };

      State.prototype.nextState = function(child) {
          var state = new State(this.rule, this.dot + 1, this.reference, this.wantedBy);
          state.left = this;
          state.right = child;
          if (state.isComplete) {
              state.data = state.build();
              // Having right set here will prevent the right state and its children
              // form being garbage collected
              state.right = undefined;
          }
          return state;
      };

      State.prototype.build = function() {
          var children = [];
          var node = this;
          do {
              children.push(node.right.data);
              node = node.left;
          } while (node.left);
          children.reverse();
          return children;
      };

      State.prototype.finish = function() {
          if (this.rule.postprocess) {
              this.data = this.rule.postprocess(this.data, this.reference, Parser.fail);
          }
      };


      function Column(grammar, index) {
          this.grammar = grammar;
          this.index = index;
          this.states = [];
          this.wants = {}; // states indexed by the non-terminal they expect
          this.scannable = []; // list of states that expect a token
          this.completed = {}; // states that are nullable
      }


      Column.prototype.process = function(nextColumn) {
          var states = this.states;
          var wants = this.wants;
          var completed = this.completed;

          for (var w = 0; w < states.length; w++) { // nb. we push() during iteration
              var state = states[w];

              if (state.isComplete) {
                  state.finish();
                  if (state.data !== Parser.fail) {
                      // complete
                      var wantedBy = state.wantedBy;
                      for (var i = wantedBy.length; i--; ) { // this line is hot
                          var left = wantedBy[i];
                          this.complete(left, state);
                      }

                      // special-case nullables
                      if (state.reference === this.index) {
                          // make sure future predictors of this rule get completed.
                          var exp = state.rule.name;
                          (this.completed[exp] = this.completed[exp] || []).push(state);
                      }
                  }

              } else {
                  // queue scannable states
                  var exp = state.rule.symbols[state.dot];
                  if (typeof exp !== 'string') {
                      this.scannable.push(state);
                      continue;
                  }

                  // predict
                  if (wants[exp]) {
                      wants[exp].push(state);

                      if (completed.hasOwnProperty(exp)) {
                          var nulls = completed[exp];
                          for (var i = 0; i < nulls.length; i++) {
                              var right = nulls[i];
                              this.complete(state, right);
                          }
                      }
                  } else {
                      wants[exp] = [state];
                      this.predict(exp);
                  }
              }
          }
      };

      Column.prototype.predict = function(exp) {
          var rules = this.grammar.byName[exp] || [];

          for (var i = 0; i < rules.length; i++) {
              var r = rules[i];
              var wantedBy = this.wants[exp];
              var s = new State(r, 0, this.index, wantedBy);
              this.states.push(s);
          }
      };

      Column.prototype.complete = function(left, right) {
          var copy = left.nextState(right);
          this.states.push(copy);
      };


      function Grammar(rules, start) {
          this.rules = rules;
          this.start = start || this.rules[0].name;
          var byName = this.byName = {};
          this.rules.forEach(function(rule) {
              if (!byName.hasOwnProperty(rule.name)) {
                  byName[rule.name] = [];
              }
              byName[rule.name].push(rule);
          });
      }

      // So we can allow passing (rules, start) directly to Parser for backwards compatibility
      Grammar.fromCompiled = function(rules, start) {
          var lexer = rules.Lexer;
          if (rules.ParserStart) {
            start = rules.ParserStart;
            rules = rules.ParserRules;
          }
          var rules = rules.map(function (r) { return (new Rule(r.name, r.symbols, r.postprocess)); });
          var g = new Grammar(rules, start);
          g.lexer = lexer; // nb. storing lexer on Grammar is iffy, but unavoidable
          return g;
      };


      function StreamLexer() {
        this.reset("");
      }

      StreamLexer.prototype.reset = function(data, state) {
          this.buffer = data;
          this.index = 0;
          this.line = state ? state.line : 1;
          this.lastLineBreak = state ? -state.col : 0;
      };

      StreamLexer.prototype.next = function() {
          if (this.index < this.buffer.length) {
              var ch = this.buffer[this.index++];
              if (ch === '\n') {
                this.line += 1;
                this.lastLineBreak = this.index;
              }
              return {value: ch};
          }
      };

      StreamLexer.prototype.save = function() {
        return {
          line: this.line,
          col: this.index - this.lastLineBreak,
        }
      };

      StreamLexer.prototype.formatError = function(token, message) {
          // nb. this gets called after consuming the offending token,
          // so the culprit is index-1
          var buffer = this.buffer;
          if (typeof buffer === 'string') {
              var lines = buffer
                  .split("\n")
                  .slice(
                      Math.max(0, this.line - 5), 
                      this.line
                  );

              var nextLineBreak = buffer.indexOf('\n', this.index);
              if (nextLineBreak === -1) nextLineBreak = buffer.length;
              var col = this.index - this.lastLineBreak;
              var lastLineDigits = String(this.line).length;
              message += " at line " + this.line + " col " + col + ":\n\n";
              message += lines
                  .map(function(line, i) {
                      return pad(this.line - lines.length + i + 1, lastLineDigits) + " " + line;
                  }, this)
                  .join("\n");
              message += "\n" + pad("", lastLineDigits + col) + "^\n";
              return message;
          } else {
              return message + " at index " + (this.index - 1);
          }

          function pad(n, length) {
              var s = String(n);
              return Array(length - s.length + 1).join(" ") + s;
          }
      };

      function Parser(rules, start, options) {
          if (rules instanceof Grammar) {
              var grammar = rules;
              var options = start;
          } else {
              var grammar = Grammar.fromCompiled(rules, start);
          }
          this.grammar = grammar;

          // Read options
          this.options = {
              keepHistory: false,
              lexer: grammar.lexer || new StreamLexer,
          };
          for (var key in (options || {})) {
              this.options[key] = options[key];
          }

          // Setup lexer
          this.lexer = this.options.lexer;
          this.lexerState = undefined;

          // Setup a table
          var column = new Column(grammar, 0);
          var table = this.table = [column];

          // I could be expecting anything.
          column.wants[grammar.start] = [];
          column.predict(grammar.start);
          // TODO what if start rule is nullable?
          column.process();
          this.current = 0; // token index
      }

      // create a reserved token for indicating a parse fail
      Parser.fail = {};

      Parser.prototype.feed = function(chunk) {
          var lexer = this.lexer;
          lexer.reset(chunk, this.lexerState);

          var token;
          while (true) {
              try {
                  token = lexer.next();
                  if (!token) {
                      break;
                  }
              } catch (e) {
                  // Create the next column so that the error reporter
                  // can display the correctly predicted states.
                  var nextColumn = new Column(this.grammar, this.current + 1);
                  this.table.push(nextColumn);
                  var err = new Error(this.reportLexerError(e));
                  err.offset = this.current;
                  err.token = e.token;
                  throw err;
              }
              // We add new states to table[current+1]
              var column = this.table[this.current];

              // GC unused states
              if (!this.options.keepHistory) {
                  delete this.table[this.current - 1];
              }

              var n = this.current + 1;
              var nextColumn = new Column(this.grammar, n);
              this.table.push(nextColumn);

              // Advance all tokens that expect the symbol
              var literal = token.text !== undefined ? token.text : token.value;
              var value = lexer.constructor === StreamLexer ? token.value : token;
              var scannable = column.scannable;
              for (var w = scannable.length; w--; ) {
                  var state = scannable[w];
                  var expect = state.rule.symbols[state.dot];
                  // Try to consume the token
                  // either regex or literal
                  if (expect.test ? expect.test(value) :
                      expect.type ? expect.type === token.type
                                  : expect.literal === literal) {
                      // Add it
                      var next = state.nextState({data: value, token: token, isToken: true, reference: n - 1});
                      nextColumn.states.push(next);
                  }
              }

              // Next, for each of the rules, we either
              // (a) complete it, and try to see if the reference row expected that
              //     rule
              // (b) predict the next nonterminal it expects by adding that
              //     nonterminal's start state
              // To prevent duplication, we also keep track of rules we have already
              // added

              nextColumn.process();

              // If needed, throw an error:
              if (nextColumn.states.length === 0) {
                  // No states at all! This is not good.
                  var err = new Error(this.reportError(token));
                  err.offset = this.current;
                  err.token = token;
                  throw err;
              }

              // maybe save lexer state
              if (this.options.keepHistory) {
                column.lexerState = lexer.save();
              }

              this.current++;
          }
          if (column) {
            this.lexerState = lexer.save();
          }

          // Incrementally keep track of results
          this.results = this.finish();

          // Allow chaining, for whatever it's worth
          return this;
      };

      Parser.prototype.reportLexerError = function(lexerError) {
          var tokenDisplay, lexerMessage;
          // Planning to add a token property to moo's thrown error
          // even on erroring tokens to be used in error display below
          var token = lexerError.token;
          if (token) {
              tokenDisplay = "input " + JSON.stringify(token.text[0]) + " (lexer error)";
              lexerMessage = this.lexer.formatError(token, "Syntax error");
          } else {
              tokenDisplay = "input (lexer error)";
              lexerMessage = lexerError.message;
          }
          return this.reportErrorCommon(lexerMessage, tokenDisplay);
      };

      Parser.prototype.reportError = function(token) {
          var tokenDisplay = (token.type ? token.type + " token: " : "") + JSON.stringify(token.value !== undefined ? token.value : token);
          var lexerMessage = this.lexer.formatError(token, "Syntax error");
          return this.reportErrorCommon(lexerMessage, tokenDisplay);
      };

      Parser.prototype.reportErrorCommon = function(lexerMessage, tokenDisplay) {
          var lines = [];
          lines.push(lexerMessage);
          var lastColumnIndex = this.table.length - 2;
          var lastColumn = this.table[lastColumnIndex];
          var expectantStates = lastColumn.states
              .filter(function(state) {
                  var nextSymbol = state.rule.symbols[state.dot];
                  return nextSymbol && typeof nextSymbol !== "string";
              });

          if (expectantStates.length === 0) {
              lines.push('Unexpected ' + tokenDisplay + '. I did not expect any more input. Here is the state of my parse table:\n');
              this.displayStateStack(lastColumn.states, lines);
          } else {
              lines.push('Unexpected ' + tokenDisplay + '. Instead, I was expecting to see one of the following:\n');
              // Display a "state stack" for each expectant state
              // - which shows you how this state came to be, step by step.
              // If there is more than one derivation, we only display the first one.
              var stateStacks = expectantStates
                  .map(function(state) {
                      return this.buildFirstStateStack(state, []) || [state];
                  }, this);
              // Display each state that is expecting a terminal symbol next.
              stateStacks.forEach(function(stateStack) {
                  var state = stateStack[0];
                  var nextSymbol = state.rule.symbols[state.dot];
                  var symbolDisplay = this.getSymbolDisplay(nextSymbol);
                  lines.push('A ' + symbolDisplay + ' based on:');
                  this.displayStateStack(stateStack, lines);
              }, this);
          }
          lines.push("");
          return lines.join("\n");
      };
      
      Parser.prototype.displayStateStack = function(stateStack, lines) {
          var lastDisplay;
          var sameDisplayCount = 0;
          for (var j = 0; j < stateStack.length; j++) {
              var state = stateStack[j];
              var display = state.rule.toString(state.dot);
              if (display === lastDisplay) {
                  sameDisplayCount++;
              } else {
                  if (sameDisplayCount > 0) {
                      lines.push('    ^ ' + sameDisplayCount + ' more lines identical to this');
                  }
                  sameDisplayCount = 0;
                  lines.push('    ' + display);
              }
              lastDisplay = display;
          }
      };

      Parser.prototype.getSymbolDisplay = function(symbol) {
          return getSymbolLongDisplay(symbol);
      };

      /*
      Builds a the first state stack. You can think of a state stack as the call stack
      of the recursive-descent parser which the Nearley parse algorithm simulates.
      A state stack is represented as an array of state objects. Within a
      state stack, the first item of the array will be the starting
      state, with each successive item in the array going further back into history.

      This function needs to be given a starting state and an empty array representing
      the visited states, and it returns an single state stack.

      */
      Parser.prototype.buildFirstStateStack = function(state, visited) {
          if (visited.indexOf(state) !== -1) {
              // Found cycle, return null
              // to eliminate this path from the results, because
              // we don't know how to display it meaningfully
              return null;
          }
          if (state.wantedBy.length === 0) {
              return [state];
          }
          var prevState = state.wantedBy[0];
          var childVisited = [state].concat(visited);
          var childResult = this.buildFirstStateStack(prevState, childVisited);
          if (childResult === null) {
              return null;
          }
          return [state].concat(childResult);
      };

      Parser.prototype.save = function() {
          var column = this.table[this.current];
          column.lexerState = this.lexerState;
          return column;
      };

      Parser.prototype.restore = function(column) {
          var index = column.index;
          this.current = index;
          this.table[index] = column;
          this.table.splice(index + 1);
          this.lexerState = column.lexerState;

          // Incrementally keep track of results
          this.results = this.finish();
      };

      // nb. deprecated: use save/restore instead!
      Parser.prototype.rewind = function(index) {
          if (!this.options.keepHistory) {
              throw new Error('set option `keepHistory` to enable rewinding')
          }
          // nb. recall column (table) indicies fall between token indicies.
          //        col 0   --   token 0   --   col 1
          this.restore(this.table[index]);
      };

      Parser.prototype.finish = function() {
          // Return the possible parsings
          var considerations = [];
          var start = this.grammar.start;
          var column = this.table[this.table.length - 1];
          column.states.forEach(function (t) {
              if (t.rule.name === start
                      && t.dot === t.rule.symbols.length
                      && t.reference === 0
                      && t.data !== Parser.fail) {
                  considerations.push(t);
              }
          });
          return considerations.map(function(c) {return c.data; });
      };

      function getSymbolLongDisplay(symbol) {
          var type = typeof symbol;
          if (type === "string") {
              return symbol;
          } else if (type === "object") {
              if (symbol.literal) {
                  return JSON.stringify(symbol.literal);
              } else if (symbol instanceof RegExp) {
                  return 'character matching ' + symbol;
              } else if (symbol.type) {
                  return symbol.type + ' token';
              } else if (symbol.test) {
                  return 'token matching ' + String(symbol.test);
              } else {
                  throw new Error('Unknown symbol type: ' + symbol);
              }
          }
      }

      function getSymbolShortDisplay(symbol) {
          var type = typeof symbol;
          if (type === "string") {
              return symbol;
          } else if (type === "object") {
              if (symbol.literal) {
                  return JSON.stringify(symbol.literal);
              } else if (symbol instanceof RegExp) {
                  return symbol.toString();
              } else if (symbol.type) {
                  return '%' + symbol.type;
              } else if (symbol.test) {
                  return '<' + String(symbol.test) + '>';
              } else {
                  throw new Error('Unknown symbol type: ' + symbol);
              }
          }
      }

      return {
          Parser: Parser,
          Grammar: Grammar,
          Rule: Rule,
      };

  }));
  });

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  var moo = createCommonjsModule(function (module) {
  (function(root, factory) {
    if ( module.exports) {
      module.exports = factory();
    } else {
      root.moo = factory();
    }
  }(commonjsGlobal, function() {

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var toString = Object.prototype.toString;
    var hasSticky = typeof new RegExp().sticky === 'boolean';

    /***************************************************************************/

    function isRegExp(o) { return o && toString.call(o) === '[object RegExp]' }
    function isObject(o) { return o && typeof o === 'object' && !isRegExp(o) && !Array.isArray(o) }

    function reEscape(s) {
      return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
    }
    function reGroups(s) {
      var re = new RegExp('|' + s);
      return re.exec('').length - 1
    }
    function reCapture(s) {
      return '(' + s + ')'
    }
    function reUnion(regexps) {
      if (!regexps.length) return '(?!)'
      var source =  regexps.map(function(s) {
        return "(?:" + s + ")"
      }).join('|');
      return "(?:" + source + ")"
    }

    function regexpOrLiteral(obj) {
      if (typeof obj === 'string') {
        return '(?:' + reEscape(obj) + ')'

      } else if (isRegExp(obj)) {
        // TODO: consider /u support
        if (obj.ignoreCase) throw new Error('RegExp /i flag not allowed')
        if (obj.global) throw new Error('RegExp /g flag is implied')
        if (obj.sticky) throw new Error('RegExp /y flag is implied')
        if (obj.multiline) throw new Error('RegExp /m flag is implied')
        return obj.source

      } else {
        throw new Error('Not a pattern: ' + obj)
      }
    }

    function objectToRules(object) {
      var keys = Object.getOwnPropertyNames(object);
      var result = [];
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var thing = object[key];
        var rules = [].concat(thing);
        if (key === 'include') {
          for (var j = 0; j < rules.length; j++) {
            result.push({include: rules[j]});
          }
          continue
        }
        var match = [];
        rules.forEach(function(rule) {
          if (isObject(rule)) {
            if (match.length) result.push(ruleOptions(key, match));
            result.push(ruleOptions(key, rule));
            match = [];
          } else {
            match.push(rule);
          }
        });
        if (match.length) result.push(ruleOptions(key, match));
      }
      return result
    }

    function arrayToRules(array) {
      var result = [];
      for (var i = 0; i < array.length; i++) {
        var obj = array[i];
        if (obj.include) {
          var include = [].concat(obj.include);
          for (var j = 0; j < include.length; j++) {
            result.push({include: include[j]});
          }
          continue
        }
        if (!obj.type) {
          throw new Error('Rule has no type: ' + JSON.stringify(obj))
        }
        result.push(ruleOptions(obj.type, obj));
      }
      return result
    }

    function ruleOptions(type, obj) {
      if (!isObject(obj)) {
        obj = { match: obj };
      }
      if (obj.include) {
        throw new Error('Matching rules cannot also include states')
      }

      // nb. error and fallback imply lineBreaks
      var options = {
        defaultType: type,
        lineBreaks: !!obj.error || !!obj.fallback,
        pop: false,
        next: null,
        push: null,
        error: false,
        fallback: false,
        value: null,
        type: null,
        shouldThrow: false,
      };

      // Avoid Object.assign(), so we support IE9+
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) {
          options[key] = obj[key];
        }
      }

      // type transform cannot be a string
      if (typeof options.type === 'string' && type !== options.type) {
        throw new Error("Type transform cannot be a string (type '" + options.type + "' for token '" + type + "')")
      }

      // convert to array
      var match = options.match;
      options.match = Array.isArray(match) ? match : match ? [match] : [];
      options.match.sort(function(a, b) {
        return isRegExp(a) && isRegExp(b) ? 0
             : isRegExp(b) ? -1 : isRegExp(a) ? +1 : b.length - a.length
      });
      return options
    }

    function toRules(spec) {
      return Array.isArray(spec) ? arrayToRules(spec) : objectToRules(spec)
    }

    var defaultErrorRule = ruleOptions('error', {lineBreaks: true, shouldThrow: true});
    function compileRules(rules, hasStates) {
      var errorRule = null;
      var fast = Object.create(null);
      var fastAllowed = true;
      var unicodeFlag = null;
      var groups = [];
      var parts = [];

      // If there is a fallback rule, then disable fast matching
      for (var i = 0; i < rules.length; i++) {
        if (rules[i].fallback) {
          fastAllowed = false;
        }
      }

      for (var i = 0; i < rules.length; i++) {
        var options = rules[i];

        if (options.include) {
          // all valid inclusions are removed by states() preprocessor
          throw new Error('Inheritance is not allowed in stateless lexers')
        }

        if (options.error || options.fallback) {
          // errorRule can only be set once
          if (errorRule) {
            if (!options.fallback === !errorRule.fallback) {
              throw new Error("Multiple " + (options.fallback ? "fallback" : "error") + " rules not allowed (for token '" + options.defaultType + "')")
            } else {
              throw new Error("fallback and error are mutually exclusive (for token '" + options.defaultType + "')")
            }
          }
          errorRule = options;
        }

        var match = options.match.slice();
        if (fastAllowed) {
          while (match.length && typeof match[0] === 'string' && match[0].length === 1) {
            var word = match.shift();
            fast[word.charCodeAt(0)] = options;
          }
        }

        // Warn about inappropriate state-switching options
        if (options.pop || options.push || options.next) {
          if (!hasStates) {
            throw new Error("State-switching options are not allowed in stateless lexers (for token '" + options.defaultType + "')")
          }
          if (options.fallback) {
            throw new Error("State-switching options are not allowed on fallback tokens (for token '" + options.defaultType + "')")
          }
        }

        // Only rules with a .match are included in the RegExp
        if (match.length === 0) {
          continue
        }
        fastAllowed = false;

        groups.push(options);

        // Check unicode flag is used everywhere or nowhere
        for (var j = 0; j < match.length; j++) {
          var obj = match[j];
          if (!isRegExp(obj)) {
            continue
          }

          if (unicodeFlag === null) {
            unicodeFlag = obj.unicode;
          } else if (unicodeFlag !== obj.unicode && options.fallback === false) {
            throw new Error('If one rule is /u then all must be')
          }
        }

        // convert to RegExp
        var pat = reUnion(match.map(regexpOrLiteral));

        // validate
        var regexp = new RegExp(pat);
        if (regexp.test("")) {
          throw new Error("RegExp matches empty string: " + regexp)
        }
        var groupCount = reGroups(pat);
        if (groupCount > 0) {
          throw new Error("RegExp has capture groups: " + regexp + "\nUse (?: … ) instead")
        }

        // try and detect rules matching newlines
        if (!options.lineBreaks && regexp.test('\n')) {
          throw new Error('Rule should declare lineBreaks: ' + regexp)
        }

        // store regex
        parts.push(reCapture(pat));
      }


      // If there's no fallback rule, use the sticky flag so we only look for
      // matches at the current index.
      //
      // If we don't support the sticky flag, then fake it using an irrefutable
      // match (i.e. an empty pattern).
      var fallbackRule = errorRule && errorRule.fallback;
      var flags = hasSticky && !fallbackRule ? 'ym' : 'gm';
      var suffix = hasSticky || fallbackRule ? '' : '|';

      if (unicodeFlag === true) flags += "u";
      var combined = new RegExp(reUnion(parts) + suffix, flags);
      return {regexp: combined, groups: groups, fast: fast, error: errorRule || defaultErrorRule}
    }

    function compile(rules) {
      var result = compileRules(toRules(rules));
      return new Lexer({start: result}, 'start')
    }

    function checkStateGroup(g, name, map) {
      var state = g && (g.push || g.next);
      if (state && !map[state]) {
        throw new Error("Missing state '" + state + "' (in token '" + g.defaultType + "' of state '" + name + "')")
      }
      if (g && g.pop && +g.pop !== 1) {
        throw new Error("pop must be 1 (in token '" + g.defaultType + "' of state '" + name + "')")
      }
    }
    function compileStates(states, start) {
      var all = states.$all ? toRules(states.$all) : [];
      delete states.$all;

      var keys = Object.getOwnPropertyNames(states);
      if (!start) start = keys[0];

      var ruleMap = Object.create(null);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        ruleMap[key] = toRules(states[key]).concat(all);
      }
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var rules = ruleMap[key];
        var included = Object.create(null);
        for (var j = 0; j < rules.length; j++) {
          var rule = rules[j];
          if (!rule.include) continue
          var splice = [j, 1];
          if (rule.include !== key && !included[rule.include]) {
            included[rule.include] = true;
            var newRules = ruleMap[rule.include];
            if (!newRules) {
              throw new Error("Cannot include nonexistent state '" + rule.include + "' (in state '" + key + "')")
            }
            for (var k = 0; k < newRules.length; k++) {
              var newRule = newRules[k];
              if (rules.indexOf(newRule) !== -1) continue
              splice.push(newRule);
            }
          }
          rules.splice.apply(rules, splice);
          j--;
        }
      }

      var map = Object.create(null);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        map[key] = compileRules(ruleMap[key], true);
      }

      for (var i = 0; i < keys.length; i++) {
        var name = keys[i];
        var state = map[name];
        var groups = state.groups;
        for (var j = 0; j < groups.length; j++) {
          checkStateGroup(groups[j], name, map);
        }
        var fastKeys = Object.getOwnPropertyNames(state.fast);
        for (var j = 0; j < fastKeys.length; j++) {
          checkStateGroup(state.fast[fastKeys[j]], name, map);
        }
      }

      return new Lexer(map, start)
    }

    function keywordTransform(map) {
      var reverseMap = Object.create(null);
      var byLength = Object.create(null);
      var types = Object.getOwnPropertyNames(map);
      for (var i = 0; i < types.length; i++) {
        var tokenType = types[i];
        var item = map[tokenType];
        var keywordList = Array.isArray(item) ? item : [item];
        keywordList.forEach(function(keyword) {
          (byLength[keyword.length] = byLength[keyword.length] || []).push(keyword);
          if (typeof keyword !== 'string') {
            throw new Error("keyword must be string (in keyword '" + tokenType + "')")
          }
          reverseMap[keyword] = tokenType;
        });
      }

      // fast string lookup
      // https://jsperf.com/string-lookups
      function str(x) { return JSON.stringify(x) }
      var source = '';
      source += 'switch (value.length) {\n';
      for (var length in byLength) {
        var keywords = byLength[length];
        source += 'case ' + length + ':\n';
        source += 'switch (value) {\n';
        keywords.forEach(function(keyword) {
          var tokenType = reverseMap[keyword];
          source += 'case ' + str(keyword) + ': return ' + str(tokenType) + '\n';
        });
        source += '}\n';
      }
      source += '}\n';
      return Function('value', source) // type
    }

    /***************************************************************************/

    var Lexer = function(states, state) {
      this.startState = state;
      this.states = states;
      this.buffer = '';
      this.stack = [];
      this.reset();
    };

    Lexer.prototype.reset = function(data, info) {
      this.buffer = data || '';
      this.index = 0;
      this.line = info ? info.line : 1;
      this.col = info ? info.col : 1;
      this.queuedToken = info ? info.queuedToken : null;
      this.queuedThrow = info ? info.queuedThrow : null;
      this.setState(info ? info.state : this.startState);
      this.stack = info && info.stack ? info.stack.slice() : [];
      return this
    };

    Lexer.prototype.save = function() {
      return {
        line: this.line,
        col: this.col,
        state: this.state,
        stack: this.stack.slice(),
        queuedToken: this.queuedToken,
        queuedThrow: this.queuedThrow,
      }
    };

    Lexer.prototype.setState = function(state) {
      if (!state || this.state === state) return
      this.state = state;
      var info = this.states[state];
      this.groups = info.groups;
      this.error = info.error;
      this.re = info.regexp;
      this.fast = info.fast;
    };

    Lexer.prototype.popState = function() {
      this.setState(this.stack.pop());
    };

    Lexer.prototype.pushState = function(state) {
      this.stack.push(this.state);
      this.setState(state);
    };

    var eat = hasSticky ? function(re, buffer) { // assume re is /y
      return re.exec(buffer)
    } : function(re, buffer) { // assume re is /g
      var match = re.exec(buffer);
      // will always match, since we used the |(?:) trick
      if (match[0].length === 0) {
        return null
      }
      return match
    };

    Lexer.prototype._getGroup = function(match) {
      var groupCount = this.groups.length;
      for (var i = 0; i < groupCount; i++) {
        if (match[i + 1] !== undefined) {
          return this.groups[i]
        }
      }
      throw new Error('Cannot find token type for matched text')
    };

    function tokenToString() {
      return this.value
    }

    Lexer.prototype.next = function() {
      var index = this.index;

      // If a fallback token matched, we don't need to re-run the RegExp
      if (this.queuedGroup) {
        var token = this._token(this.queuedGroup, this.queuedText, index);
        this.queuedGroup = null;
        this.queuedText = "";
        return token
      }

      var buffer = this.buffer;
      if (index === buffer.length) {
        return // EOF
      }

      // Fast matching for single characters
      var group = this.fast[buffer.charCodeAt(index)];
      if (group) {
        return this._token(group, buffer.charAt(index), index)
      }

      // Execute RegExp
      var re = this.re;
      re.lastIndex = index;
      var match = eat(re, buffer);

      // Error tokens match the remaining buffer
      var error = this.error;
      if (match == null) {
        return this._token(error, buffer.slice(index, buffer.length), index)
      }

      var group = this._getGroup(match);
      var text = match[0];

      if (error.fallback && match.index !== index) {
        this.queuedGroup = group;
        this.queuedText = text;

        // Fallback tokens contain the unmatched portion of the buffer
        return this._token(error, buffer.slice(index, match.index), index)
      }

      return this._token(group, text, index)
    };

    Lexer.prototype._token = function(group, text, offset) {
      // count line breaks
      var lineBreaks = 0;
      if (group.lineBreaks) {
        var matchNL = /\n/g;
        var nl = 1;
        if (text === '\n') {
          lineBreaks = 1;
        } else {
          while (matchNL.exec(text)) { lineBreaks++; nl = matchNL.lastIndex; }
        }
      }

      var token = {
        type: (typeof group.type === 'function' && group.type(text)) || group.defaultType,
        value: typeof group.value === 'function' ? group.value(text) : text,
        text: text,
        toString: tokenToString,
        offset: offset,
        lineBreaks: lineBreaks,
        line: this.line,
        col: this.col,
      };
      // nb. adding more props to token object will make V8 sad!

      var size = text.length;
      this.index += size;
      this.line += lineBreaks;
      if (lineBreaks !== 0) {
        this.col = size - nl + 1;
      } else {
        this.col += size;
      }

      // throw, if no rule with {error: true}
      if (group.shouldThrow) {
        throw new Error(this.formatError(token, "invalid syntax"))
      }

      if (group.pop) this.popState();
      else if (group.push) this.pushState(group.push);
      else if (group.next) this.setState(group.next);

      return token
    };

    if (typeof Symbol !== 'undefined' && Symbol.iterator) {
      var LexerIterator = function(lexer) {
        this.lexer = lexer;
      };

      LexerIterator.prototype.next = function() {
        var token = this.lexer.next();
        return {value: token, done: !token}
      };

      LexerIterator.prototype[Symbol.iterator] = function() {
        return this
      };

      Lexer.prototype[Symbol.iterator] = function() {
        return new LexerIterator(this)
      };
    }

    Lexer.prototype.formatError = function(token, message) {
      if (token == null) {
        // An undefined token indicates EOF
        var text = this.buffer.slice(this.index);
        var token = {
          text: text,
          offset: this.index,
          lineBreaks: text.indexOf('\n') === -1 ? 0 : 1,
          line: this.line,
          col: this.col,
        };
      }
      var start = Math.max(0, token.offset - token.col + 1);
      var eol = token.lineBreaks ? token.text.indexOf('\n') : token.text.length;
      var firstLine = this.buffer.substring(start, token.offset + eol);
      message += " at line " + token.line + " col " + token.col + ":\n\n";
      message += "  " + firstLine + "\n";
      message += "  " + Array(token.col).join(" ") + "^";
      return message
    };

    Lexer.prototype.clone = function() {
      return new Lexer(this.states, this.state)
    };

    Lexer.prototype.has = function(tokenType) {
      return true
    };


    return {
      compile: compile,
      states: compileStates,
      error: Object.freeze({error: true}),
      fallback: Object.freeze({fallback: true}),
      keywords: keywordTransform,
    }

  }));
  });

  // Found this seed-based random generator somewhere
  // Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

  var seed = 1;

  /**
   * return a random number based on a seed
   * @param seed
   * @returns {number}
   */
  function getNextValue() {
      seed = (seed * 9301 + 49297) % 233280;
      return seed/(233280.0);
  }

  function setSeed(_seed_) {
      seed = _seed_;
  }

  var randomFromSeed = {
      nextValue: getNextValue,
      seed: setSeed
  };

  var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
  var alphabet;
  var previousSeed;

  var shuffled;

  function reset() {
      shuffled = false;
  }

  function setCharacters(_alphabet_) {
      if (!_alphabet_) {
          if (alphabet !== ORIGINAL) {
              alphabet = ORIGINAL;
              reset();
          }
          return;
      }

      if (_alphabet_ === alphabet) {
          return;
      }

      if (_alphabet_.length !== ORIGINAL.length) {
          throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
      }

      var unique = _alphabet_.split('').filter(function(item, ind, arr){
         return ind !== arr.lastIndexOf(item);
      });

      if (unique.length) {
          throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
      }

      alphabet = _alphabet_;
      reset();
  }

  function characters(_alphabet_) {
      setCharacters(_alphabet_);
      return alphabet;
  }

  function setSeed$1(seed) {
      randomFromSeed.seed(seed);
      if (previousSeed !== seed) {
          reset();
          previousSeed = seed;
      }
  }

  function shuffle() {
      if (!alphabet) {
          setCharacters(ORIGINAL);
      }

      var sourceArray = alphabet.split('');
      var targetArray = [];
      var r = randomFromSeed.nextValue();
      var characterIndex;

      while (sourceArray.length > 0) {
          r = randomFromSeed.nextValue();
          characterIndex = Math.floor(r * sourceArray.length);
          targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
      }
      return targetArray.join('');
  }

  function getShuffled() {
      if (shuffled) {
          return shuffled;
      }
      shuffled = shuffle();
      return shuffled;
  }

  /**
   * lookup shuffled letter
   * @param index
   * @returns {string}
   */
  function lookup(index) {
      var alphabetShuffled = getShuffled();
      return alphabetShuffled[index];
  }

  function get () {
    return alphabet || ORIGINAL;
  }

  var alphabet_1 = {
      get: get,
      characters: characters,
      seed: setSeed$1,
      lookup: lookup,
      shuffled: getShuffled
  };

  var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

  var randomByte;

  if (!crypto || !crypto.getRandomValues) {
      randomByte = function(size) {
          var bytes = [];
          for (var i = 0; i < size; i++) {
              bytes.push(Math.floor(Math.random() * 256));
          }
          return bytes;
      };
  } else {
      randomByte = function(size) {
          return crypto.getRandomValues(new Uint8Array(size));
      };
  }

  var randomByteBrowser = randomByte;

  // This file replaces `format.js` in bundlers like webpack or Rollup,
  // according to `browser` config in `package.json`.

  var format_browser = function (random, alphabet, size) {
    // We can’t use bytes bigger than the alphabet. To make bytes values closer
    // to the alphabet, we apply bitmask on them. We look for the closest
    // `2 ** x - 1` number, which will be bigger than alphabet size. If we have
    // 30 symbols in the alphabet, we will take 31 (00011111).
    // We do not use faster Math.clz32, because it is not available in browsers.
    var mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
    // Bitmask is not a perfect solution (in our example it will pass 31 bytes,
    // which is bigger than the alphabet). As a result, we will need more bytes,
    // than ID size, because we will refuse bytes bigger than the alphabet.

    // Every hardware random generator call is costly,
    // because we need to wait for entropy collection. This is why often it will
    // be faster to ask for few extra bytes in advance, to avoid additional calls.

    // Here we calculate how many random bytes should we call in advance.
    // It depends on ID length, mask / alphabet size and magic number 1.6
    // (which was selected according benchmarks).

    // -~f => Math.ceil(f) if n is float number
    // -~i => i + 1 if n is integer number
    var step = -~(1.6 * mask * size / alphabet.length);
    var id = '';

    while (true) {
      var bytes = random(step);
      // Compact alternative for `for (var i = 0; i < step; i++)`
      var i = step;
      while (i--) {
        // If random byte is bigger than alphabet even after bitmask,
        // we refuse it by `|| ''`.
        id += alphabet[bytes[i] & mask] || '';
        // More compact than `id.length + 1 === size`
        if (id.length === +size) return id
      }
    }
  };

  function generate(number) {
      var loopCounter = 0;
      var done;

      var str = '';

      while (!done) {
          str = str + format_browser(randomByteBrowser, alphabet_1.get(), 1);
          done = number < (Math.pow(16, loopCounter + 1 ) );
          loopCounter++;
      }
      return str;
  }

  var generate_1 = generate;

  // Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
  // This number should be updated every year or so to keep the generated id short.
  // To regenerate `new Date() - 0` and bump the version. Always bump the version!
  var REDUCE_TIME = 1567752802062;

  // don't change unless we change the algos or REDUCE_TIME
  // must be an integer and less than 16
  var version$1 = 7;

  // Counter is used when shortid is called multiple times in one second.
  var counter;

  // Remember the last time shortid was called in case counter is needed.
  var previousSeconds;

  /**
   * Generate unique id
   * Returns string id
   */
  function build(clusterWorkerId) {
      var str = '';

      var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

      if (seconds === previousSeconds) {
          counter++;
      } else {
          counter = 0;
          previousSeconds = seconds;
      }

      str = str + generate_1(version$1);
      str = str + generate_1(clusterWorkerId);
      if (counter > 0) {
          str = str + generate_1(counter);
      }
      str = str + generate_1(seconds);
      return str;
  }

  var build_1 = build;

  function isShortId(id) {
      if (!id || typeof id !== 'string' || id.length < 6 ) {
          return false;
      }

      var nonAlphabetic = new RegExp('[^' +
        alphabet_1.get().replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&') +
      ']');
      return !nonAlphabetic.test(id);
  }

  var isValid = isShortId;

  var lib = createCommonjsModule(function (module) {





  // if you are using cluster or multiple servers use this to make each instance
  // has a unique value for worker
  // Note: I don't know if this is automatically set when using third
  // party cluster solutions such as pm2.
  var clusterWorkerId =  0;

  /**
   * Set the seed.
   * Highly recommended if you don't want people to try to figure out your id schema.
   * exposed as shortid.seed(int)
   * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
   */
  function seed(seedValue) {
      alphabet_1.seed(seedValue);
      return module.exports;
  }

  /**
   * Set the cluster worker or machine id
   * exposed as shortid.worker(int)
   * @param workerId worker must be positive integer.  Number less than 16 is recommended.
   * returns shortid module so it can be chained.
   */
  function worker(workerId) {
      clusterWorkerId = workerId;
      return module.exports;
  }

  /**
   *
   * sets new characters to use in the alphabet
   * returns the shuffled alphabet
   */
  function characters(newCharacters) {
      if (newCharacters !== undefined) {
          alphabet_1.characters(newCharacters);
      }

      return alphabet_1.shuffled();
  }

  /**
   * Generate unique id
   * Returns string id
   */
  function generate() {
    return build_1(clusterWorkerId);
  }

  // Export all other functions as properties of the generate function
  module.exports = generate;
  module.exports.generate = generate;
  module.exports.seed = seed;
  module.exports.worker = worker;
  module.exports.characters = characters;
  module.exports.isValid = isValid;
  });

  var shortid = lib;

  var lookup$1 = [];
  var revLookup = [];
  var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
  var inited = false;
  function init () {
    inited = true;
    var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    for (var i = 0, len = code.length; i < len; ++i) {
      lookup$1[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }

    revLookup['-'.charCodeAt(0)] = 62;
    revLookup['_'.charCodeAt(0)] = 63;
  }

  function toByteArray (b64) {
    if (!inited) {
      init();
    }
    var i, j, l, tmp, placeHolders, arr;
    var len = b64.length;

    if (len % 4 > 0) {
      throw new Error('Invalid string. Length must be a multiple of 4')
    }

    // the number of equal signs (place holders)
    // if there are two placeholders, than the two characters before it
    // represent one byte
    // if there is only one, then the three characters before it represent 2 bytes
    // this is just a cheap hack to not do indexOf twice
    placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

    // base64 is 4/3 + up to two characters of the original data
    arr = new Arr(len * 3 / 4 - placeHolders);

    // if there are placeholders, only get up to the last complete 4 chars
    l = placeHolders > 0 ? len - 4 : len;

    var L = 0;

    for (i = 0, j = 0; i < l; i += 4, j += 3) {
      tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
      arr[L++] = (tmp >> 16) & 0xFF;
      arr[L++] = (tmp >> 8) & 0xFF;
      arr[L++] = tmp & 0xFF;
    }

    if (placeHolders === 2) {
      tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
      arr[L++] = tmp & 0xFF;
    } else if (placeHolders === 1) {
      tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
      arr[L++] = (tmp >> 8) & 0xFF;
      arr[L++] = tmp & 0xFF;
    }

    return arr
  }

  function tripletToBase64 (num) {
    return lookup$1[num >> 18 & 0x3F] + lookup$1[num >> 12 & 0x3F] + lookup$1[num >> 6 & 0x3F] + lookup$1[num & 0x3F]
  }

  function encodeChunk (uint8, start, end) {
    var tmp;
    var output = [];
    for (var i = start; i < end; i += 3) {
      tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
      output.push(tripletToBase64(tmp));
    }
    return output.join('')
  }

  function fromByteArray (uint8) {
    if (!inited) {
      init();
    }
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
    var output = '';
    var parts = [];
    var maxChunkLength = 16383; // must be multiple of 3

    // go through the array every three bytes, we'll deal with trailing stuff later
    for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
      parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
    }

    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
      tmp = uint8[len - 1];
      output += lookup$1[tmp >> 2];
      output += lookup$1[(tmp << 4) & 0x3F];
      output += '==';
    } else if (extraBytes === 2) {
      tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
      output += lookup$1[tmp >> 10];
      output += lookup$1[(tmp >> 4) & 0x3F];
      output += lookup$1[(tmp << 2) & 0x3F];
      output += '=';
    }

    parts.push(output);

    return parts.join('')
  }

  function read (buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? (nBytes - 1) : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];

    i += d;

    e = s & ((1 << (-nBits)) - 1);
    s >>= (-nBits);
    nBits += eLen;
    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

    m = e & ((1 << (-nBits)) - 1);
    e >>= (-nBits);
    nBits += mLen;
    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

    if (e === 0) {
      e = 1 - eBias;
    } else if (e === eMax) {
      return m ? NaN : ((s ? -1 : 1) * Infinity)
    } else {
      m = m + Math.pow(2, mLen);
      e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
  }

  function write (buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
    var i = isLE ? 0 : (nBytes - 1);
    var d = isLE ? 1 : -1;
    var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

    value = Math.abs(value);

    if (isNaN(value) || value === Infinity) {
      m = isNaN(value) ? 1 : 0;
      e = eMax;
    } else {
      e = Math.floor(Math.log(value) / Math.LN2);
      if (value * (c = Math.pow(2, -e)) < 1) {
        e--;
        c *= 2;
      }
      if (e + eBias >= 1) {
        value += rt / c;
      } else {
        value += rt * Math.pow(2, 1 - eBias);
      }
      if (value * c >= 2) {
        e++;
        c /= 2;
      }

      if (e + eBias >= eMax) {
        m = 0;
        e = eMax;
      } else if (e + eBias >= 1) {
        m = (value * c - 1) * Math.pow(2, mLen);
        e = e + eBias;
      } else {
        m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
        e = 0;
      }
    }

    for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

    e = (e << mLen) | m;
    eLen += mLen;
    for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

    buffer[offset + i - d] |= s * 128;
  }

  var toString$1 = {}.toString;

  var isArray$1 = Array.isArray || function (arr) {
    return toString$1.call(arr) == '[object Array]';
  };

  var INSPECT_MAX_BYTES = 50;

  /**
   * If `Buffer.TYPED_ARRAY_SUPPORT`:
   *   === true    Use Uint8Array implementation (fastest)
   *   === false   Use Object implementation (most compatible, even IE6)
   *
   * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
   * Opera 11.6+, iOS 4.2+.
   *
   * Due to various browser bugs, sometimes the Object implementation will be used even
   * when the browser supports typed arrays.
   *
   * Note:
   *
   *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
   *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
   *
   *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
   *
   *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
   *     incorrect length in some situations.

   * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
   * get the Object implementation, which is slower but behaves correctly.
   */
  Buffer.TYPED_ARRAY_SUPPORT = global$1.TYPED_ARRAY_SUPPORT !== undefined
    ? global$1.TYPED_ARRAY_SUPPORT
    : true;

  /*
   * Export kMaxLength after typed array support is determined.
   */
  var _kMaxLength = kMaxLength();

  function kMaxLength () {
    return Buffer.TYPED_ARRAY_SUPPORT
      ? 0x7fffffff
      : 0x3fffffff
  }

  function createBuffer (that, length) {
    if (kMaxLength() < length) {
      throw new RangeError('Invalid typed array length')
    }
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      // Return an augmented `Uint8Array` instance, for best performance
      that = new Uint8Array(length);
      that.__proto__ = Buffer.prototype;
    } else {
      // Fallback: Return an object instance of the Buffer class
      if (that === null) {
        that = new Buffer(length);
      }
      that.length = length;
    }

    return that
  }

  /**
   * The Buffer constructor returns instances of `Uint8Array` that have their
   * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
   * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
   * and the `Uint8Array` methods. Square bracket notation works as expected -- it
   * returns a single octet.
   *
   * The `Uint8Array` prototype remains unmodified.
   */

  function Buffer (arg, encodingOrOffset, length) {
    if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
      return new Buffer(arg, encodingOrOffset, length)
    }

    // Common case.
    if (typeof arg === 'number') {
      if (typeof encodingOrOffset === 'string') {
        throw new Error(
          'If encoding is specified then the first argument must be a string'
        )
      }
      return allocUnsafe(this, arg)
    }
    return from(this, arg, encodingOrOffset, length)
  }

  Buffer.poolSize = 8192; // not used by this implementation

  // TODO: Legacy, not needed anymore. Remove in next major version.
  Buffer._augment = function (arr) {
    arr.__proto__ = Buffer.prototype;
    return arr
  };

  function from (that, value, encodingOrOffset, length) {
    if (typeof value === 'number') {
      throw new TypeError('"value" argument must not be a number')
    }

    if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
      return fromArrayBuffer(that, value, encodingOrOffset, length)
    }

    if (typeof value === 'string') {
      return fromString(that, value, encodingOrOffset)
    }

    return fromObject(that, value)
  }

  /**
   * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
   * if value is a number.
   * Buffer.from(str[, encoding])
   * Buffer.from(array)
   * Buffer.from(buffer)
   * Buffer.from(arrayBuffer[, byteOffset[, length]])
   **/
  Buffer.from = function (value, encodingOrOffset, length) {
    return from(null, value, encodingOrOffset, length)
  };

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    Buffer.prototype.__proto__ = Uint8Array.prototype;
    Buffer.__proto__ = Uint8Array;
  }

  function assertSize (size) {
    if (typeof size !== 'number') {
      throw new TypeError('"size" argument must be a number')
    } else if (size < 0) {
      throw new RangeError('"size" argument must not be negative')
    }
  }

  function alloc (that, size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(that, size)
    }
    if (fill !== undefined) {
      // Only pay attention to encoding if it's a string. This
      // prevents accidentally sending in a number that would
      // be interpretted as a start offset.
      return typeof encoding === 'string'
        ? createBuffer(that, size).fill(fill, encoding)
        : createBuffer(that, size).fill(fill)
    }
    return createBuffer(that, size)
  }

  /**
   * Creates a new filled Buffer instance.
   * alloc(size[, fill[, encoding]])
   **/
  Buffer.alloc = function (size, fill, encoding) {
    return alloc(null, size, fill, encoding)
  };

  function allocUnsafe (that, size) {
    assertSize(size);
    that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) {
      for (var i = 0; i < size; ++i) {
        that[i] = 0;
      }
    }
    return that
  }

  /**
   * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
   * */
  Buffer.allocUnsafe = function (size) {
    return allocUnsafe(null, size)
  };
  /**
   * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
   */
  Buffer.allocUnsafeSlow = function (size) {
    return allocUnsafe(null, size)
  };

  function fromString (that, string, encoding) {
    if (typeof encoding !== 'string' || encoding === '') {
      encoding = 'utf8';
    }

    if (!Buffer.isEncoding(encoding)) {
      throw new TypeError('"encoding" must be a valid string encoding')
    }

    var length = byteLength(string, encoding) | 0;
    that = createBuffer(that, length);

    var actual = that.write(string, encoding);

    if (actual !== length) {
      // Writing a hex string, for example, that contains invalid characters will
      // cause everything after the first invalid character to be ignored. (e.g.
      // 'abxxcd' will be treated as 'ab')
      that = that.slice(0, actual);
    }

    return that
  }

  function fromArrayLike (that, array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0;
    that = createBuffer(that, length);
    for (var i = 0; i < length; i += 1) {
      that[i] = array[i] & 255;
    }
    return that
  }

  function fromArrayBuffer (that, array, byteOffset, length) {

    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('\'offset\' is out of bounds')
    }

    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('\'length\' is out of bounds')
    }

    if (byteOffset === undefined && length === undefined) {
      array = new Uint8Array(array);
    } else if (length === undefined) {
      array = new Uint8Array(array, byteOffset);
    } else {
      array = new Uint8Array(array, byteOffset, length);
    }

    if (Buffer.TYPED_ARRAY_SUPPORT) {
      // Return an augmented `Uint8Array` instance, for best performance
      that = array;
      that.__proto__ = Buffer.prototype;
    } else {
      // Fallback: Return an object instance of the Buffer class
      that = fromArrayLike(that, array);
    }
    return that
  }

  function fromObject (that, obj) {
    if (internalIsBuffer(obj)) {
      var len = checked(obj.length) | 0;
      that = createBuffer(that, len);

      if (that.length === 0) {
        return that
      }

      obj.copy(that, 0, 0, len);
      return that
    }

    if (obj) {
      if ((typeof ArrayBuffer !== 'undefined' &&
          obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
        if (typeof obj.length !== 'number' || isnan(obj.length)) {
          return createBuffer(that, 0)
        }
        return fromArrayLike(that, obj)
      }

      if (obj.type === 'Buffer' && isArray$1(obj.data)) {
        return fromArrayLike(that, obj.data)
      }
    }

    throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
  }

  function checked (length) {
    // Note: cannot use `length < kMaxLength()` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= kMaxLength()) {
      throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                           'size: 0x' + kMaxLength().toString(16) + ' bytes')
    }
    return length | 0
  }

  function SlowBuffer (length) {
    if (+length != length) { // eslint-disable-line eqeqeq
      length = 0;
    }
    return Buffer.alloc(+length)
  }
  Buffer.isBuffer = isBuffer$2;
  function internalIsBuffer (b) {
    return !!(b != null && b._isBuffer)
  }

  Buffer.compare = function compare (a, b) {
    if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
      throw new TypeError('Arguments must be Buffers')
    }

    if (a === b) return 0

    var x = a.length;
    var y = b.length;

    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break
      }
    }

    if (x < y) return -1
    if (y < x) return 1
    return 0
  };

  Buffer.isEncoding = function isEncoding (encoding) {
    switch (String(encoding).toLowerCase()) {
      case 'hex':
      case 'utf8':
      case 'utf-8':
      case 'ascii':
      case 'latin1':
      case 'binary':
      case 'base64':
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return true
      default:
        return false
    }
  };

  Buffer.concat = function concat (list, length) {
    if (!isArray$1(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }

    if (list.length === 0) {
      return Buffer.alloc(0)
    }

    var i;
    if (length === undefined) {
      length = 0;
      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }

    var buffer = Buffer.allocUnsafe(length);
    var pos = 0;
    for (i = 0; i < list.length; ++i) {
      var buf = list[i];
      if (!internalIsBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers')
      }
      buf.copy(buffer, pos);
      pos += buf.length;
    }
    return buffer
  };

  function byteLength (string, encoding) {
    if (internalIsBuffer(string)) {
      return string.length
    }
    if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
        (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
      return string.byteLength
    }
    if (typeof string !== 'string') {
      string = '' + string;
    }

    var len = string.length;
    if (len === 0) return 0

    // Use a for loop to avoid recursion
    var loweredCase = false;
    for (;;) {
      switch (encoding) {
        case 'ascii':
        case 'latin1':
        case 'binary':
          return len
        case 'utf8':
        case 'utf-8':
        case undefined:
          return utf8ToBytes(string).length
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return len * 2
        case 'hex':
          return len >>> 1
        case 'base64':
          return base64ToBytes(string).length
        default:
          if (loweredCase) return utf8ToBytes(string).length // assume utf8
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer.byteLength = byteLength;

  function slowToString (encoding, start, end) {
    var loweredCase = false;

    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.

    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) {
      start = 0;
    }
    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) {
      return ''
    }

    if (end === undefined || end > this.length) {
      end = this.length;
    }

    if (end <= 0) {
      return ''
    }

    // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0;
    start >>>= 0;

    if (end <= start) {
      return ''
    }

    if (!encoding) encoding = 'utf8';

    while (true) {
      switch (encoding) {
        case 'hex':
          return hexSlice(this, start, end)

        case 'utf8':
        case 'utf-8':
          return utf8Slice(this, start, end)

        case 'ascii':
          return asciiSlice(this, start, end)

        case 'latin1':
        case 'binary':
          return latin1Slice(this, start, end)

        case 'base64':
          return base64Slice(this, start, end)

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return utf16leSlice(this, start, end)

        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
          encoding = (encoding + '').toLowerCase();
          loweredCase = true;
      }
    }
  }

  // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
  // Buffer instances.
  Buffer.prototype._isBuffer = true;

  function swap (b, n, m) {
    var i = b[n];
    b[n] = b[m];
    b[m] = i;
  }

  Buffer.prototype.swap16 = function swap16 () {
    var len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 16-bits')
    }
    for (var i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this
  };

  Buffer.prototype.swap32 = function swap32 () {
    var len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 32-bits')
    }
    for (var i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this
  };

  Buffer.prototype.swap64 = function swap64 () {
    var len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError('Buffer size must be a multiple of 64-bits')
    }
    for (var i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this
  };

  Buffer.prototype.toString = function toString () {
    var length = this.length | 0;
    if (length === 0) return ''
    if (arguments.length === 0) return utf8Slice(this, 0, length)
    return slowToString.apply(this, arguments)
  };

  Buffer.prototype.equals = function equals (b) {
    if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
    if (this === b) return true
    return Buffer.compare(this, b) === 0
  };

  Buffer.prototype.inspect = function inspect () {
    var str = '';
    var max = INSPECT_MAX_BYTES;
    if (this.length > 0) {
      str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
      if (this.length > max) str += ' ... ';
    }
    return '<Buffer ' + str + '>'
  };

  Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
    if (!internalIsBuffer(target)) {
      throw new TypeError('Argument must be a Buffer')
    }

    if (start === undefined) {
      start = 0;
    }
    if (end === undefined) {
      end = target ? target.length : 0;
    }
    if (thisStart === undefined) {
      thisStart = 0;
    }
    if (thisEnd === undefined) {
      thisEnd = this.length;
    }

    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError('out of range index')
    }

    if (thisStart >= thisEnd && start >= end) {
      return 0
    }
    if (thisStart >= thisEnd) {
      return -1
    }
    if (start >= end) {
      return 1
    }

    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;

    if (this === target) return 0

    var x = thisEnd - thisStart;
    var y = end - start;
    var len = Math.min(x, y);

    var thisCopy = this.slice(thisStart, thisEnd);
    var targetCopy = target.slice(start, end);

    for (var i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break
      }
    }

    if (x < y) return -1
    if (y < x) return 1
    return 0
  };

  // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
  // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
  //
  // Arguments:
  // - buffer - a Buffer to search
  // - val - a string, Buffer, or number
  // - byteOffset - an index into `buffer`; will be clamped to an int32
  // - encoding - an optional encoding, relevant is val is a string
  // - dir - true for indexOf, false for lastIndexOf
  function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0) return -1

    // Normalize byteOffset
    if (typeof byteOffset === 'string') {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 0x7fffffff) {
      byteOffset = 0x7fffffff;
    } else if (byteOffset < -0x80000000) {
      byteOffset = -0x80000000;
    }
    byteOffset = +byteOffset;  // Coerce to Number.
    if (isNaN(byteOffset)) {
      // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
      byteOffset = dir ? 0 : (buffer.length - 1);
    }

    // Normalize byteOffset: negative offsets start from the end of the buffer
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
      if (dir) return -1
      else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir) byteOffset = 0;
      else return -1
    }

    // Normalize val
    if (typeof val === 'string') {
      val = Buffer.from(val, encoding);
    }

    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if (internalIsBuffer(val)) {
      // Special case: looking for empty string/buffer always fails
      if (val.length === 0) {
        return -1
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
    } else if (typeof val === 'number') {
      val = val & 0xFF; // Search for a byte value [0-255]
      if (Buffer.TYPED_ARRAY_SUPPORT &&
          typeof Uint8Array.prototype.indexOf === 'function') {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
        }
      }
      return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
    }

    throw new TypeError('val must be string, number or Buffer')
  }

  function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;

    if (encoding !== undefined) {
      encoding = String(encoding).toLowerCase();
      if (encoding === 'ucs2' || encoding === 'ucs-2' ||
          encoding === 'utf16le' || encoding === 'utf-16le') {
        if (arr.length < 2 || val.length < 2) {
          return -1
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }

    function read (buf, i) {
      if (indexSize === 1) {
        return buf[i]
      } else {
        return buf.readUInt16BE(i * indexSize)
      }
    }

    var i;
    if (dir) {
      var foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1) foundIndex = i;
          if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
        } else {
          if (foundIndex !== -1) i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        var found = true;
        for (var j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false;
            break
          }
        }
        if (found) return i
      }
    }

    return -1
  }

  Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1
  };

  Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
  };

  Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
  };

  function hexWrite (buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }

    // must be an even number of digits
    var strLen = string.length;
    if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

    if (length > strLen / 2) {
      length = strLen / 2;
    }
    for (var i = 0; i < length; ++i) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (isNaN(parsed)) return i
      buf[offset + i] = parsed;
    }
    return i
  }

  function utf8Write (buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
  }

  function asciiWrite (buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length)
  }

  function latin1Write (buf, string, offset, length) {
    return asciiWrite(buf, string, offset, length)
  }

  function base64Write (buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length)
  }

  function ucs2Write (buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
  }

  Buffer.prototype.write = function write (string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
      encoding = 'utf8';
      length = this.length;
      offset = 0;
    // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === 'string') {
      encoding = offset;
      length = this.length;
      offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
      offset = offset | 0;
      if (isFinite(length)) {
        length = length | 0;
        if (encoding === undefined) encoding = 'utf8';
      } else {
        encoding = length;
        length = undefined;
      }
    // legacy write(string, encoding, offset, length) - remove in v0.13
    } else {
      throw new Error(
        'Buffer.write(string, encoding, offset[, length]) is no longer supported'
      )
    }

    var remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;

    if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
      throw new RangeError('Attempt to write outside buffer bounds')
    }

    if (!encoding) encoding = 'utf8';

    var loweredCase = false;
    for (;;) {
      switch (encoding) {
        case 'hex':
          return hexWrite(this, string, offset, length)

        case 'utf8':
        case 'utf-8':
          return utf8Write(this, string, offset, length)

        case 'ascii':
          return asciiWrite(this, string, offset, length)

        case 'latin1':
        case 'binary':
          return latin1Write(this, string, offset, length)

        case 'base64':
          // Warning: maxLength not taken into account in base64Write
          return base64Write(this, string, offset, length)

        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return ucs2Write(this, string, offset, length)

        default:
          if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
          encoding = ('' + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };

  Buffer.prototype.toJSON = function toJSON () {
    return {
      type: 'Buffer',
      data: Array.prototype.slice.call(this._arr || this, 0)
    }
  };

  function base64Slice (buf, start, end) {
    if (start === 0 && end === buf.length) {
      return fromByteArray(buf)
    } else {
      return fromByteArray(buf.slice(start, end))
    }
  }

  function utf8Slice (buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];

    var i = start;
    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence = (firstByte > 0xEF) ? 4
        : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
        : 1;

      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint;

        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 0x80) {
              codePoint = firstByte;
            }
            break
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
              if (tempCodePoint > 0x7F) {
                codePoint = tempCodePoint;
              }
            }
            break
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
              if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                codePoint = tempCodePoint;
              }
            }
            break
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
              if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                codePoint = tempCodePoint;
              }
            }
        }
      }

      if (codePoint === null) {
        // we did not generate a valid codePoint so insert a
        // replacement char (U+FFFD) and advance only 1 byte
        codePoint = 0xFFFD;
        bytesPerSequence = 1;
      } else if (codePoint > 0xFFFF) {
        // encode to utf16 (surrogate pair dance)
        codePoint -= 0x10000;
        res.push(codePoint >>> 10 & 0x3FF | 0xD800);
        codePoint = 0xDC00 | codePoint & 0x3FF;
      }

      res.push(codePoint);
      i += bytesPerSequence;
    }

    return decodeCodePointsArray(res)
  }

  // Based on http://stackoverflow.com/a/22747272/680742, the browser with
  // the lowest limit is Chrome, with 0x10000 args.
  // We go 1 magnitude less, for safety
  var MAX_ARGUMENTS_LENGTH = 0x1000;

  function decodeCodePointsArray (codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
    }

    // Decode in chunks to avoid "call stack size exceeded".
    var res = '';
    var i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
      );
    }
    return res
  }

  function asciiSlice (buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);

    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 0x7F);
    }
    return ret
  }

  function latin1Slice (buf, start, end) {
    var ret = '';
    end = Math.min(buf.length, end);

    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret
  }

  function hexSlice (buf, start, end) {
    var len = buf.length;

    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;

    var out = '';
    for (var i = start; i < end; ++i) {
      out += toHex(buf[i]);
    }
    return out
  }

  function utf16leSlice (buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = '';
    for (var i = 0; i < bytes.length; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res
  }

  Buffer.prototype.slice = function slice (start, end) {
    var len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;

    if (start < 0) {
      start += len;
      if (start < 0) start = 0;
    } else if (start > len) {
      start = len;
    }

    if (end < 0) {
      end += len;
      if (end < 0) end = 0;
    } else if (end > len) {
      end = len;
    }

    if (end < start) end = start;

    var newBuf;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      newBuf = this.subarray(start, end);
      newBuf.__proto__ = Buffer.prototype;
    } else {
      var sliceLen = end - start;
      newBuf = new Buffer(sliceLen, undefined);
      for (var i = 0; i < sliceLen; ++i) {
        newBuf[i] = this[i + start];
      }
    }

    return newBuf
  };

  /*
   * Need to make sure that buffer isn't trying to write out of bounds.
   */
  function checkOffset (offset, ext, length) {
    if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
    if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
  }

  Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }

    return val
  };

  Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      checkOffset(offset, byteLength, this.length);
    }

    var val = this[offset + --byteLength];
    var mul = 1;
    while (byteLength > 0 && (mul *= 0x100)) {
      val += this[offset + --byteLength] * mul;
    }

    return val
  };

  Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset]
  };

  Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | (this[offset + 1] << 8)
  };

  Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    return (this[offset] << 8) | this[offset + 1]
  };

  Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return ((this[offset]) |
        (this[offset + 1] << 8) |
        (this[offset + 2] << 16)) +
        (this[offset + 3] * 0x1000000)
  };

  Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset] * 0x1000000) +
      ((this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      this[offset + 3])
  };

  Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 0x100)) {
      val += this[offset + i] * mul;
    }
    mul *= 0x80;

    if (val >= mul) val -= Math.pow(2, 8 * byteLength);

    return val
  };

  Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);

    var i = byteLength;
    var mul = 1;
    var val = this[offset + --i];
    while (i > 0 && (mul *= 0x100)) {
      val += this[offset + --i] * mul;
    }
    mul *= 0x80;

    if (val >= mul) val -= Math.pow(2, 8 * byteLength);

    return val
  };

  Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return (this[offset])
    return ((0xff - this[offset] + 1) * -1)
  };

  Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset] | (this[offset + 1] << 8);
    return (val & 0x8000) ? val | 0xFFFF0000 : val
  };

  Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset + 1] | (this[offset] << 8);
    return (val & 0x8000) ? val | 0xFFFF0000 : val
  };

  Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16) |
      (this[offset + 3] << 24)
  };

  Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);

    return (this[offset] << 24) |
      (this[offset + 1] << 16) |
      (this[offset + 2] << 8) |
      (this[offset + 3])
  };

  Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return read(this, offset, true, 23, 4)
  };

  Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 4, this.length);
    return read(this, offset, false, 23, 4)
  };

  Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length);
    return read(this, offset, true, 52, 8)
  };

  Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
    if (!noAssert) checkOffset(offset, 8, this.length);
    return read(this, offset, false, 52, 8)
  };

  function checkInt (buf, value, offset, ext, max, min) {
    if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
    if (offset + ext > buf.length) throw new RangeError('Index out of range')
  }

  Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }

    var mul = 1;
    var i = 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    byteLength = byteLength | 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }

    var i = byteLength - 1;
    var mul = 1;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
      this[offset + i] = (value / mul) & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
    this[offset] = (value & 0xff);
    return offset + 1
  };

  function objectWriteUInt16 (buf, value, offset, littleEndian) {
    if (value < 0) value = 0xffff + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
      buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
        (littleEndian ? i : 1 - i) * 8;
    }
  }

  Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff);
      this[offset + 1] = (value >>> 8);
    } else {
      objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2
  };

  Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 8);
      this[offset + 1] = (value & 0xff);
    } else {
      objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2
  };

  function objectWriteUInt32 (buf, value, offset, littleEndian) {
    if (value < 0) value = 0xffffffff + value + 1;
    for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
      buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
    }
  }

  Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset + 3] = (value >>> 24);
      this[offset + 2] = (value >>> 16);
      this[offset + 1] = (value >>> 8);
      this[offset] = (value & 0xff);
    } else {
      objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4
  };

  Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 24);
      this[offset + 1] = (value >>> 16);
      this[offset + 2] = (value >>> 8);
      this[offset + 3] = (value & 0xff);
    } else {
      objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4
  };

  Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);

      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }

    var i = 0;
    var mul = 1;
    var sub = 0;
    this[offset] = value & 0xFF;
    while (++i < byteLength && (mul *= 0x100)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);

      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }

    var i = byteLength - 1;
    var mul = 1;
    var sub = 0;
    this[offset + i] = value & 0xFF;
    while (--i >= 0 && (mul *= 0x100)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
    }

    return offset + byteLength
  };

  Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
    if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = (value & 0xff);
    return offset + 1
  };

  Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff);
      this[offset + 1] = (value >>> 8);
    } else {
      objectWriteUInt16(this, value, offset, true);
    }
    return offset + 2
  };

  Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 8);
      this[offset + 1] = (value & 0xff);
    } else {
      objectWriteUInt16(this, value, offset, false);
    }
    return offset + 2
  };

  Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value & 0xff);
      this[offset + 1] = (value >>> 8);
      this[offset + 2] = (value >>> 16);
      this[offset + 3] = (value >>> 24);
    } else {
      objectWriteUInt32(this, value, offset, true);
    }
    return offset + 4
  };

  Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
    value = +value;
    offset = offset | 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (value < 0) value = 0xffffffff + value + 1;
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      this[offset] = (value >>> 24);
      this[offset + 1] = (value >>> 16);
      this[offset + 2] = (value >>> 8);
      this[offset + 3] = (value & 0xff);
    } else {
      objectWriteUInt32(this, value, offset, false);
    }
    return offset + 4
  };

  function checkIEEE754 (buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError('Index out of range')
    if (offset < 0) throw new RangeError('Index out of range')
  }

  function writeFloat (buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4);
    }
    write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4
  }

  Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert)
  };

  Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert)
  };

  function writeDouble (buf, value, offset, littleEndian, noAssert) {
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8);
    }
    write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8
  }

  Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert)
  };

  Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert)
  };

  // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
  Buffer.prototype.copy = function copy (target, targetStart, start, end) {
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;

    // Copy 0 bytes; we're done
    if (end === start) return 0
    if (target.length === 0 || this.length === 0) return 0

    // Fatal error conditions
    if (targetStart < 0) {
      throw new RangeError('targetStart out of bounds')
    }
    if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
    if (end < 0) throw new RangeError('sourceEnd out of bounds')

    // Are we oob?
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }

    var len = end - start;
    var i;

    if (this === target && start < targetStart && targetStart < end) {
      // descending copy from end
      for (i = len - 1; i >= 0; --i) {
        target[i + targetStart] = this[i + start];
      }
    } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
      // ascending copy from start
      for (i = 0; i < len; ++i) {
        target[i + targetStart] = this[i + start];
      }
    } else {
      Uint8Array.prototype.set.call(
        target,
        this.subarray(start, start + len),
        targetStart
      );
    }

    return len
  };

  // Usage:
  //    buffer.fill(number[, offset[, end]])
  //    buffer.fill(buffer[, offset[, end]])
  //    buffer.fill(string[, offset[, end]][, encoding])
  Buffer.prototype.fill = function fill (val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === 'string') {
      if (typeof start === 'string') {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === 'string') {
        encoding = end;
        end = this.length;
      }
      if (val.length === 1) {
        var code = val.charCodeAt(0);
        if (code < 256) {
          val = code;
        }
      }
      if (encoding !== undefined && typeof encoding !== 'string') {
        throw new TypeError('encoding must be a string')
      }
      if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
        throw new TypeError('Unknown encoding: ' + encoding)
      }
    } else if (typeof val === 'number') {
      val = val & 255;
    }

    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError('Out of range index')
    }

    if (end <= start) {
      return this
    }

    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;

    if (!val) val = 0;

    var i;
    if (typeof val === 'number') {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      var bytes = internalIsBuffer(val)
        ? val
        : utf8ToBytes(new Buffer(val, encoding).toString());
      var len = bytes.length;
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }

    return this
  };

  // HELPER FUNCTIONS
  // ================

  var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

  function base64clean (str) {
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = stringtrim(str).replace(INVALID_BASE64_RE, '');
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return ''
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while (str.length % 4 !== 0) {
      str = str + '=';
    }
    return str
  }

  function stringtrim (str) {
    if (str.trim) return str.trim()
    return str.replace(/^\s+|\s+$/g, '')
  }

  function toHex (n) {
    if (n < 16) return '0' + n.toString(16)
    return n.toString(16)
  }

  function utf8ToBytes (string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];

    for (var i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);

      // is surrogate component
      if (codePoint > 0xD7FF && codePoint < 0xE000) {
        // last char was a lead
        if (!leadSurrogate) {
          // no lead yet
          if (codePoint > 0xDBFF) {
            // unexpected trail
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            continue
          } else if (i + 1 === length) {
            // unpaired lead
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
            continue
          }

          // valid lead
          leadSurrogate = codePoint;

          continue
        }

        // 2 leads in a row
        if (codePoint < 0xDC00) {
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          leadSurrogate = codePoint;
          continue
        }

        // valid surrogate pair
        codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
      } else if (leadSurrogate) {
        // valid bmp char, but last char was a lead
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
      }

      leadSurrogate = null;

      // encode utf8
      if (codePoint < 0x80) {
        if ((units -= 1) < 0) break
        bytes.push(codePoint);
      } else if (codePoint < 0x800) {
        if ((units -= 2) < 0) break
        bytes.push(
          codePoint >> 0x6 | 0xC0,
          codePoint & 0x3F | 0x80
        );
      } else if (codePoint < 0x10000) {
        if ((units -= 3) < 0) break
        bytes.push(
          codePoint >> 0xC | 0xE0,
          codePoint >> 0x6 & 0x3F | 0x80,
          codePoint & 0x3F | 0x80
        );
      } else if (codePoint < 0x110000) {
        if ((units -= 4) < 0) break
        bytes.push(
          codePoint >> 0x12 | 0xF0,
          codePoint >> 0xC & 0x3F | 0x80,
          codePoint >> 0x6 & 0x3F | 0x80,
          codePoint & 0x3F | 0x80
        );
      } else {
        throw new Error('Invalid code point')
      }
    }

    return bytes
  }

  function asciiToBytes (str) {
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      // Node's code seems to be doing this and not & 0x7F..
      byteArray.push(str.charCodeAt(i) & 0xFF);
    }
    return byteArray
  }

  function utf16leToBytes (str, units) {
    var c, hi, lo;
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0) break

      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }

    return byteArray
  }


  function base64ToBytes (str) {
    return toByteArray(base64clean(str))
  }

  function blitBuffer (src, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
      if ((i + offset >= dst.length) || (i >= src.length)) break
      dst[i + offset] = src[i];
    }
    return i
  }

  function isnan (val) {
    return val !== val // eslint-disable-line no-self-compare
  }


  // the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
  // The _isBuffer check is for Safari 5-7 support, because it's missing
  // Object.prototype.constructor. Remove this eventually
  function isBuffer$2(obj) {
    return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
  }

  function isFastBuffer (obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
  }

  // For Node v0.10 support. Remove this eventually.
  function isSlowBuffer (obj) {
    return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
  }

  var bufferEs6 = {
    __proto__: null,
    INSPECT_MAX_BYTES: INSPECT_MAX_BYTES,
    kMaxLength: _kMaxLength,
    Buffer: Buffer,
    SlowBuffer: SlowBuffer,
    isBuffer: isBuffer$2
  };

  var safeBuffer = createCommonjsModule(function (module, exports) {
  /* eslint-disable node/no-deprecated-api */

  var Buffer = bufferEs6.Buffer;

  // alternative to using Object.keys for old browsers
  function copyProps (src, dst) {
    for (var key in src) {
      dst[key] = src[key];
    }
  }
  if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
    module.exports = bufferEs6;
  } else {
    // Copy properties from require('buffer')
    copyProps(bufferEs6, exports);
    exports.Buffer = SafeBuffer;
  }

  function SafeBuffer (arg, encodingOrOffset, length) {
    return Buffer(arg, encodingOrOffset, length)
  }

  // Copy static methods from Buffer
  copyProps(Buffer, SafeBuffer);

  SafeBuffer.from = function (arg, encodingOrOffset, length) {
    if (typeof arg === 'number') {
      throw new TypeError('Argument must not be a number')
    }
    return Buffer(arg, encodingOrOffset, length)
  };

  SafeBuffer.alloc = function (size, fill, encoding) {
    if (typeof size !== 'number') {
      throw new TypeError('Argument must be a number')
    }
    var buf = Buffer(size);
    if (fill !== undefined) {
      if (typeof encoding === 'string') {
        buf.fill(fill, encoding);
      } else {
        buf.fill(fill);
      }
    } else {
      buf.fill(0);
    }
    return buf
  };

  SafeBuffer.allocUnsafe = function (size) {
    if (typeof size !== 'number') {
      throw new TypeError('Argument must be a number')
    }
    return Buffer(size)
  };

  SafeBuffer.allocUnsafeSlow = function (size) {
    if (typeof size !== 'number') {
      throw new TypeError('Argument must be a number')
    }
    return bufferEs6.SlowBuffer(size)
  };
  });

  // base-x encoding / decoding
  // Copyright (c) 2018 base-x contributors
  // Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)
  // Distributed under the MIT software license, see the accompanying
  // file LICENSE or http://www.opensource.org/licenses/mit-license.php.
  // @ts-ignore
  var _Buffer = safeBuffer.Buffer;
  function base (ALPHABET) {
    if (ALPHABET.length >= 255) { throw new TypeError('Alphabet too long') }
    var BASE_MAP = new Uint8Array(256);
    for (var j = 0; j < BASE_MAP.length; j++) {
      BASE_MAP[j] = 255;
    }
    for (var i = 0; i < ALPHABET.length; i++) {
      var x = ALPHABET.charAt(i);
      var xc = x.charCodeAt(0);
      if (BASE_MAP[xc] !== 255) { throw new TypeError(x + ' is ambiguous') }
      BASE_MAP[xc] = i;
    }
    var BASE = ALPHABET.length;
    var LEADER = ALPHABET.charAt(0);
    var FACTOR = Math.log(BASE) / Math.log(256); // log(BASE) / log(256), rounded up
    var iFACTOR = Math.log(256) / Math.log(BASE); // log(256) / log(BASE), rounded up
    function encode (source) {
      if (Array.isArray(source) || source instanceof Uint8Array) { source = _Buffer.from(source); }
      if (!_Buffer.isBuffer(source)) { throw new TypeError('Expected Buffer') }
      if (source.length === 0) { return '' }
          // Skip & count leading zeroes.
      var zeroes = 0;
      var length = 0;
      var pbegin = 0;
      var pend = source.length;
      while (pbegin !== pend && source[pbegin] === 0) {
        pbegin++;
        zeroes++;
      }
          // Allocate enough space in big-endian base58 representation.
      var size = ((pend - pbegin) * iFACTOR + 1) >>> 0;
      var b58 = new Uint8Array(size);
          // Process the bytes.
      while (pbegin !== pend) {
        var carry = source[pbegin];
              // Apply "b58 = b58 * 256 + ch".
        var i = 0;
        for (var it1 = size - 1; (carry !== 0 || i < length) && (it1 !== -1); it1--, i++) {
          carry += (256 * b58[it1]) >>> 0;
          b58[it1] = (carry % BASE) >>> 0;
          carry = (carry / BASE) >>> 0;
        }
        if (carry !== 0) { throw new Error('Non-zero carry') }
        length = i;
        pbegin++;
      }
          // Skip leading zeroes in base58 result.
      var it2 = size - length;
      while (it2 !== size && b58[it2] === 0) {
        it2++;
      }
          // Translate the result into a string.
      var str = LEADER.repeat(zeroes);
      for (; it2 < size; ++it2) { str += ALPHABET.charAt(b58[it2]); }
      return str
    }
    function decodeUnsafe (source) {
      if (typeof source !== 'string') { throw new TypeError('Expected String') }
      if (source.length === 0) { return _Buffer.alloc(0) }
      var psz = 0;
          // Skip leading spaces.
      if (source[psz] === ' ') { return }
          // Skip and count leading '1's.
      var zeroes = 0;
      var length = 0;
      while (source[psz] === LEADER) {
        zeroes++;
        psz++;
      }
          // Allocate enough space in big-endian base256 representation.
      var size = (((source.length - psz) * FACTOR) + 1) >>> 0; // log(58) / log(256), rounded up.
      var b256 = new Uint8Array(size);
          // Process the characters.
      while (source[psz]) {
              // Decode character
        var carry = BASE_MAP[source.charCodeAt(psz)];
              // Invalid character
        if (carry === 255) { return }
        var i = 0;
        for (var it3 = size - 1; (carry !== 0 || i < length) && (it3 !== -1); it3--, i++) {
          carry += (BASE * b256[it3]) >>> 0;
          b256[it3] = (carry % 256) >>> 0;
          carry = (carry / 256) >>> 0;
        }
        if (carry !== 0) { throw new Error('Non-zero carry') }
        length = i;
        psz++;
      }
          // Skip trailing spaces.
      if (source[psz] === ' ') { return }
          // Skip leading zeroes in b256.
      var it4 = size - length;
      while (it4 !== size && b256[it4] === 0) {
        it4++;
      }
      var vch = _Buffer.allocUnsafe(zeroes + (size - it4));
      vch.fill(0x00, 0, zeroes);
      var j = zeroes;
      while (it4 !== size) {
        vch[j++] = b256[it4++];
      }
      return vch
    }
    function decode (string) {
      var buffer = decodeUnsafe(string);
      if (buffer) { return buffer }
      throw new Error('Non-base' + BASE + ' character')
    }
    return {
      encode: encode,
      decodeUnsafe: decodeUnsafe,
      decode: decode
    }
  }
  var src = base;

  var _boolean = /true|false|TRUE|FALSE\b(?!@)/;
  var hexadecimal$1 = /-?0x(?:[0-9a-fA-F]+)\b(?!@)/;
  var octal$1 = /-?0(?:[0-7]+)\b(?!@)/;
  var measurement$1 = /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?[a-zA-Z]+\b(?!@)/;
  var decimal$1 = /-?(?:[0-9]|[1-9][0-9]+)\.[0-9]+(?:[eE][-+]?[0-9]+)?\b(?!@)/;
  var integer$1 = /-?(?:[0-9]|[1-9][0-9]+)(?:[eE][-+]?[0-9]+)?\b(?!@)/;
  var taggedString$1 = /[a-zA-Z][0-9a-zA-Z_@]*`(?:\\[`bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^`\\])*`/;
  var doubleQuotedString$1 = /"(?:\\["bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/;
  var singleQuotedString$1 = /'(?:\\['bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^'\\])*'/;
  var tickedString$1 = /`(?:\\[`bfnrt/\\]|\\u[a-fA-F0-9]{4}|[^`\\])*`/;
  var symbol$1 = /[a-zA-Z_][0-9a-zA-Z_]*\b(?!@)/;
  var identifier$1 = /[0-9a-zA-Z_@]+\b@*/;

  var gramTokens = {
    __proto__: null,
    boolean: _boolean,
    hexadecimal: hexadecimal$1,
    octal: octal$1,
    measurement: measurement$1,
    decimal: decimal$1,
    integer: integer$1,
    taggedString: taggedString$1,
    doubleQuotedString: doubleQuotedString$1,
    singleQuotedString: singleQuotedString$1,
    tickedString: tickedString$1,
    symbol: symbol$1,
    identifier: identifier$1
  };

  /**
   * Utility functions for Gram element identifiers.
   *
   * @packageDocumentation
   */



  var alphabets = {
    base2: '01',
    base8: '01234567',
    base10: '0123456789',
    base11: '0123456789a',
    base16: '0123456789abcdef',
    base32: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
    zBase32: 'ybndrfg8ejkmcpqxot1uwisza345h769',
    crock32: '0123456789ABCDEFGHJKMNPQRSTVWXYZ',
    base32Hex: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
    base36: '0123456789abcdefghijklmnopqrstuvwxyz',
    base58: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
    base62: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    base64: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_@'
  };
  shortid.characters(alphabets.base64);
  var checkIdentifierRegex = /*#__PURE__*/new RegExp('^' + identifier$1.source + '$');
  /**
   * Checks whether the given string is a valid identifier.
   *
   */

  var isValidIdentifier = /*#__PURE__*/checkIdentifierRegex.test.bind(checkIdentifierRegex);
  /**
   *
   * @param n Converted to fixed-point number with no decimals.
   */

  var decodeInteger = function decodeInteger(n) {
    var base10 = src(alphabets.base10);
    if (n > Number.MAX_SAFE_INTEGER) throw Error('Value cannot exceed Number.MAX_SAFE_INTEGER.');
    return base10.decode(n.toFixed(0));
  };
  var integerToBase = function integerToBase(alphabet, n) {
    return src(alphabet).encode(decodeInteger(n));
  };
  var integerToBaseID = function integerToBaseID(alphabet, n) {
    return '_' + src(alphabet).encode(decodeInteger(n));
  };
  /**
   * Convert an arbitrary length base-10 integer literal into valid identifier in another base representation.
   *
   * @param alphabet alphabet for base-x output
   * @param n base-10 numeric string input
   */

  var integerLiteralToBaseID = function integerLiteralToBaseID(alphabet, n) {
    return '_' + src(alphabet).encode(src(alphabets.base10).decode(n));
  };
  /**
   * Identifier function which produces a pseudo-random, short identifier.
   *
   */

  var shortID = shortid.generate;
  /**
   * Identifier function
   *
   * @param i
   */

  var base36ID = function base36ID(i) {
    return "_" + i.toString(36);
  };
  var idFunctionNamed = function idFunctionNamed(idType) {
    return idType === 'number' ? function (i) {
      return "" + i;
    } : idType === 'shortid' ? function (_) {
      return shortID();
    } : idType === 'base36' ? base36ID : // : idType === 'base58'
    // ? base58ID
    function (_i) {
      return '';
    };
  };
  /**
   * Encodes the id to be valid, mapping:
   *
   * - [whitespace, period, comma, single and double quotes] --> '_'
   * - [all remainining non-valid identifier characters] --> '@'
   */

  var idEncoder = function idEncoder(idToEncode) {
    return idToEncode === undefined ? '' : isValidIdentifier(idToEncode) ? idToEncode : idToEncode.replace(/[\s.,'"]/gi, '_').replace(/[^_0-9a-zA-Z]/gi, '@');
  }; // const nodeRecordLens = Lens.fromProp<Node>()('record').asOptional();
  // const isNonArrayLiteral = (l:Literal|Literal[]): l is Literal =>
  //     (l !== undefined) && (!Array.isArray(l))
  // const literalValueLens = new Optional<Literal|Literal[],string>(
  //     (l:Literal|Literal[]) => isNonArrayLiteral(l) ? some(l.value) : none,
  //     value => literal => ({...literal, value}))
  // export const optionalPropertyValueFromNode = (key:string) => {
  //     return nodeRecordLens
  //     .compose(Lens.fromProp<Record>()(key))
  //     .asOptional()
  //     .compose(literalValueLens).getOption
  // }

  var gramIdentity = {
    alphabets: alphabets,
    isValidIdentifier: isValidIdentifier,
    shortID: shortID,
    base36ID: base36ID,
    idFunctionNamed: idFunctionNamed,
    idEncoder: idEncoder,
    integerLiteralToBaseID: integerLiteralToBaseID
  };

  var gramIdentity$1 = {
    __proto__: null,
    alphabets: alphabets,
    isValidIdentifier: isValidIdentifier,
    decodeInteger: decodeInteger,
    integerToBase: integerToBase,
    integerToBaseID: integerToBaseID,
    integerLiteralToBaseID: integerLiteralToBaseID,
    shortID: shortID,
    base36ID: base36ID,
    idFunctionNamed: idFunctionNamed,
    idEncoder: idEncoder,
    'default': gramIdentity
  };

  /**
   * # Gram AST Types
   *
   * These AST elements
   *
   * References:
   *
   * - [unist](https://github.com/syntax-tree/unist) - Universal Synax Tree
   * - [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
   * @packageDocumentation
   */
  ///////////////////////////////////////////////////////////////////////////////
  // Pathlike types...

  /**
   * Identity of all units.
   */
  var UNIT_ID = '0';
  /**
   * Type guard for GramUnit.
   *
   * @param o any object
   */

  var isGramUnit = function isGramUnit(o) {
    return !!o.type && o.type === 'unit';
  };
  /**
   * Type guard for GramNode.
   *
   * @param o any object
   */

  var isGramNode = function isGramNode(o) {
    return !!o.type && o.type === 'node';
  };
  /**
   * Type guard for GramEdge.
   *
   * @param o any object
   */

  var isGramEdge = function isGramEdge(o) {
    return 'type' in o && 'relation' in o && o.type === 'edge';
  };
  /**
   * Type guard for a Path.
   *
   * @param o any object
   */

  var isGramPath = function isGramPath(o) {
    return !!o.type && o.type === 'path';
  };

  function _extends$1() {
    _extends$1 = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$1.apply(this, arguments);
  }

  function normalizeChildren(children) {
    if (Array.isArray(children)) {
      return children;
    } else if (children instanceof Function) {
      var res = children();
      return normalizeChildren(res);
    } else if (typeof children === 'undefined') {
      return [];
    } else {
      return [children];
    }
  }
  /**
   * Build a path sequence that represents a graph
   * accumulating structure over time.
   *
   * @param paths sequence of paths through history
   * @param id optional reference identifier. The "name" of this graph instance.
   * @param labels optional labels
   * @param record optional graph-level data
   */


  var seq = function seq(paths, id, labels, record) {
    return _extends$1({
      type: 'seq'
    }, id && {
      id: id
    }, labels && {
      labels: labels
    }, record && {
      record: record
    }, {
      children: normalizeChildren(paths)
    });
  };
  /**
   * Reduce paths into a single path composed using the given relation.
   *
   * @parm relation the relation to apply to all sub-paths
   * @param paths sub-paths to be paired
   */

  var reduce = function reduce(relation, paths) {
    if (relation === void 0) {
      relation = 'pair';
    }

    var pathlist = normalizeChildren(paths);

    if (pathlist) {
      if (pathlist.length > 1) {
        return [pathlist.reduceRight(function (acc, curr) {
          return cons([curr, acc], {
            relation: relation
          });
        }, UNIT)];
      } else {
        return [pathlist[0]];
      }
    }

    return [];
  };
  /**
   * Build any path-like element
   *
   * @param members sub-paths to compose
   * @param attributes attributes
   */

  var cons = function cons(members, attributes) {
    if (attributes === void 0) {
      attributes = {};
    }

    var element = _extends$1({
      type: 'path',
      id: attributes.id
    }, attributes.labels && {
      labels: attributes.labels
    }, attributes.record && {
      record: attributes.record
    }, {
      children: members.filter(function (child) {
        return child && !isGramUnit(child);
      })
    });

    if (element.children.length === 0) {
      if (element.id || element.labels && element.labels.length > 0 || element.record) {
        element.type = 'node';
        element.id = element.id || gramIdentity$1.shortID();
        return element;
      } else {
        return UNIT;
      }
    } else if (element.children.length === 1) {
      var inner = element.children[0];

      if (element.id) {
        if (isGramUnit(inner)) {
          element.type = 'node';
          element.children = [];
          return element;
        }

        return element;
      } else {
        if (isGramUnit(inner)) return inner;
        element.id = gramIdentity$1.shortID();
        if (isGramNode(inner)) return inner;
        if (isGramEdge(inner)) return inner;
        if (isGramPath(inner)) return inner;
      }
    } else if (element.children.length === 2) {
      if (attributes.relation && attributes.relation !== 'pair' && isGramNode(element.children[0]) && isGramNode(element.children[1])) {
        element.type = 'edge';
        element.id = element.id || gramIdentity$1.shortID();
        element.relation = attributes.relation;
        return element;
      }
    }

    element.id = element.id || gramIdentity$1.shortID();
    element.relation = attributes.relation || 'pair';
    return element;
  };
  /**
   * Singleton instance of GramUnit
   */

  var UNIT = {
    type: 'unit',
    id: UNIT_ID,
    labels: undefined,
    record: undefined,
    children: []
  };
  /**
   * Build a GramNode.
   *
   * @param id identifier
   * @param labels
   * @param record
   * @param annotation
   */

  var node = function node(id, labels, record) {
    return _extends$1({
      type: 'node',
      id: id || gramIdentity$1.shortID()
    }, labels && {
      labels: labels
    }, record && {
      record: record
    }, {
      children: []
    });
  };
  var record = function record(properties) {
    return properties.reduce(function (acc, p) {
      acc[p.name] = p.value;
      return acc;
    }, {});
  };
  var property = function property(name, value) {
    var Node = {
      type: 'property',
      name: name,
      value: value
    };
    return Node;
  };

  var _boolean$1 = function _boolean(value) {
    return {
      type: 'boolean',
      value: value ? 'true' : 'false'
    };
  };
  var string = function string(value) {
    return {
      type: 'string',
      value: value
    };
  };
  var tagged = function tagged(tag, value) {
    return {
      type: 'tagged',
      value: value,
      tag: tag
    };
  };
  var integer$2 = function integer(value) {
    return {
      type: 'integer',
      value: String(value)
    };
  };
  var decimal$2 = function decimal(value) {
    return {
      type: 'decimal',
      value: String(value)
    };
  };
  var hexadecimal$2 = function hexadecimal(value) {
    return {
      type: 'hexadecimal',
      value: value
    };
  };
  var octal$2 = function octal(value) {
    return {
      type: 'octal',
      value: value
    };
  };
  var measurement$2 = function measurement(unit, value) {
    return {
      type: 'measurement',
      value: String(value),
      unit: unit
    };
  };
  var flatten = function flatten(xs, depth) {
    if (depth === void 0) {
      depth = 1;
    }

    return xs.flat(depth).filter(function (x) {
      return x !== null;
    });
  };

  function id(d) {
    return d[0];
  }

  var lexer = /*#__PURE__*/moo.compile({
    whitespace: {
      match: /\s+/,
      lineBreaks: true
    },
    lineComment: {
      match: /\/\/.*?\n?$/
    },
    hexadecimal: gramTokens.hexadecimal,
    octal: gramTokens.octal,
    measurement: gramTokens.measurement,
    decimal: gramTokens.decimal,
    integer: gramTokens.integer,
    taggedString: {
      match: gramTokens.taggedString
    },
    "boolean": ['true', 'TRUE', 'True', 'false', 'FALSE', 'False'],
    symbol: gramTokens.symbol,
    identifier: gramTokens.identifier,
    doubleQuotedString: {
      match: gramTokens.doubleQuotedString,
      value: function value(s) {
        return s.slice(1, -1);
      }
    },
    singleQuotedString: {
      match: gramTokens.singleQuotedString,
      value: function value(s) {
        return s.slice(1, -1);
      }
    },
    tickedString: {
      match: gramTokens.tickedString,
      value: function value(s) {
        return s.slice(1, -1);
      }
    },
    '-->': '-->',
    '--': '--',
    '<--': '<--',
    '-[]->': '-[]->',
    '-[]-': '-[]-',
    '<-[]-': '<-[]-',
    '<-[': '<-[',
    ']->': ']->',
    '-[': '-[',
    ']-': ']-',
    '{': '{',
    '}': '}',
    '[': '[',
    ']': ']',
    '(': '(',
    ')': ')',
    ',': ',',
    ':': ':',
    '`': '`',
    "'": "'"
  });

  var empty = function empty() {
    return null;
  };

  var text = function text(_ref) {
    var token = _ref[0];
    return token.text;
  };

  function extractPairs(pairGroups) {
    return pairGroups.map(function (pairGroup) {
      return pairGroup[3];
    });
  }

  function extractArray(valueGroups) {
    return valueGroups.map(function (valueGroup) {
      return valueGroup[3];
    });
  }

  function separateTagFromString(taggedStringValue) {
    var valueParts = taggedStringValue.match(/([^`]+)`(.+)`$/);
    if (valueParts === null || valueParts === undefined) throw Error("Malformed tagged string: " + taggedStringValue);
    return {
      tag: valueParts[1],
      value: valueParts[2]
    };
  }

  function separateNumberFromUnits(measurementValue) {
    var valueParts = measurementValue.match(/(-?[0-9.]+)([a-zA-Z]+)/);
    if (valueParts === null || valueParts === undefined) throw Error("Malformed measurement : " + measurementValue);
    return {
      value: valueParts[1],
      unit: valueParts[2]
    };
  }

  var grammar = {
    Lexer: lexer,
    ParserRules: [{
      name: 'Gram$ebnf$1$subexpression$1$ebnf$1',
      symbols: [{
        literal: ','
      }],
      postprocess: id
    }, {
      name: 'Gram$ebnf$1$subexpression$1$ebnf$1',
      symbols: [],
      postprocess: function postprocess() {
        return null;
      }
    }, {
      name: 'Gram$ebnf$1$subexpression$1',
      symbols: ['Pathlike', 'Gram$ebnf$1$subexpression$1$ebnf$1', '_'],
      postprocess: function postprocess(_ref2) {
        var pp = _ref2[0];
        return pp;
      }
    }, {
      name: 'Gram$ebnf$1',
      symbols: ['Gram$ebnf$1$subexpression$1']
    }, {
      name: 'Gram$ebnf$1$subexpression$2$ebnf$1',
      symbols: [{
        literal: ','
      }],
      postprocess: id
    }, {
      name: 'Gram$ebnf$1$subexpression$2$ebnf$1',
      symbols: [],
      postprocess: function postprocess() {
        return null;
      }
    }, {
      name: 'Gram$ebnf$1$subexpression$2',
      symbols: ['Pathlike', 'Gram$ebnf$1$subexpression$2$ebnf$1', '_'],
      postprocess: function postprocess(_ref3) {
        var pp = _ref3[0];
        return pp;
      }
    }, {
      name: 'Gram$ebnf$1',
      symbols: ['Gram$ebnf$1', 'Gram$ebnf$1$subexpression$2'],
      postprocess: function postprocess(d) {
        return d[0].concat([d[1]]);
      }
    }, {
      name: 'Gram$ebnf$2',
      symbols: ['EOL'],
      postprocess: id
    }, {
      name: 'Gram$ebnf$2',
      symbols: [],
      postprocess: function postprocess() {
        return null;
      }
    }, {
      name: 'Gram',
      symbols: ['Gram$ebnf$1', 'Gram$ebnf$2'],
      postprocess: function postprocess(_ref4) {
        var pp = _ref4[0];
        return seq(flatten(pp));
      }
    }, {
      name: 'Pathlike',
      symbols: ['EdgeExpression'],
      postprocess: id
    }, {
      name: 'Pathlike',
      symbols: ['PathComposition'],
      postprocess: id
    }, {
      name: 'Pathlike',
      symbols: ['Comment'],
      postprocess: id
    }, {
      name: 'EdgeExpression',
      symbols: ['Node', 'Edge', 'EdgeExpression'],
      postprocess: function postprocess(_ref5) {
        var np = _ref5[0],
            es = _ref5[1],
            ep = _ref5[2];
        return cons([np, ep], {
          relation: es.relation,
          id: es.id,
          labels: es.labels,
          record: es.record
        });
      }
    }, {
      name: 'EdgeExpression',
      symbols: ['Node'],
      postprocess: id
    }, {
      name: 'Node',
      symbols: [{
        literal: '('
      }, '_', 'Attributes', {
        literal: ')'
      }],
      postprocess: function postprocess(_ref6) {
        var content = _ref6[2];
        return node(content.id, content.labels, content.record);
      }
    }, {
      name: 'Edge',
      symbols: [{
        literal: '-['
      }, '_', 'Attributes', {
        literal: ']->'
      }],
      postprocess: function postprocess(_ref7) {
        var content = _ref7[2];
        return _extends({
          relation: 'right'
        }, content);
      }
    }, {
      name: 'Edge',
      symbols: [{
        literal: '-['
      }, '_', 'Attributes', {
        literal: ']-'
      }],
      postprocess: function postprocess(_ref8) {
        var content = _ref8[2];
        return _extends({
          relation: 'either'
        }, content);
      }
    }, {
      name: 'Edge',
      symbols: [{
        literal: '<-['
      }, '_', 'Attributes', {
        literal: ']-'
      }],
      postprocess: function postprocess(_ref9) {
        var content = _ref9[2];
        return _extends({
          relation: 'left'
        }, content);
      }
    }, {
      name: 'Edge',
      symbols: [{
        literal: '-[]->'
      }],
      postprocess: function postprocess() {
        return {
          relation: 'right'
        };
      }
    }, {
      name: 'Edge',
      symbols: [{
        literal: '-[]-'
      }],
      postprocess: function postprocess() {
        return {
          relation: 'either'
        };
      }
    }, {
      name: 'Edge',
      symbols: [{
        literal: '<-[]-'
      }],
      postprocess: function postprocess() {
        return {
          relation: 'left'
        };
      }
    }, {
      name: 'Edge',
      symbols: [{
        literal: '-->'
      }],
      postprocess: function postprocess() {
        return {
          relation: 'right'
        };
      }
    }, {
      name: 'Edge',
      symbols: [{
        literal: '--'
      }],
      postprocess: function postprocess() {
        return {
          relation: 'either'
        };
      }
    }, {
      name: 'Edge',
      symbols: [{
        literal: '<--'
      }],
      postprocess: function postprocess() {
        return {
          relation: 'left'
        };
      }
    }, {
      name: 'PathComposition$ebnf$1',
      symbols: ['Pathlike'],
      postprocess: id
    }, {
      name: 'PathComposition$ebnf$1',
      symbols: [],
      postprocess: function postprocess() {
        return null;
      }
    }, {
      name: 'PathComposition',
      symbols: [{
        literal: '['
      }, '_', 'Attributes', '_', 'PathComposition$ebnf$1', '_', {
        literal: ']'
      }],
      postprocess: function postprocess(_ref10) {
        var attr = _ref10[2],
            sub = _ref10[4];
        return cons(sub ? [sub] : [], attr);
      }
    }, {
      name: 'PathComposition',
      symbols: [{
        literal: '['
      }, '_', 'Attributes', '_', 'Relation', '_', 'Pathlike', '_', 'Pathlike', '_', {
        literal: ']'
      }],
      postprocess: function postprocess(_ref11) {
        var attr = _ref11[2],
            relation = _ref11[4],
            lhs = _ref11[6],
            rhs = _ref11[8];
        return cons([lhs, rhs], {
          relation: relation,
          id: attr.id,
          labels: attr.labels,
          record: attr.record
        });
      }
    }, {
      name: 'PathComposition$ebnf$2$subexpression$1$ebnf$1',
      symbols: [{
        literal: ','
      }],
      postprocess: id
    }, {
      name: 'PathComposition$ebnf$2$subexpression$1$ebnf$1',
      symbols: [],
      postprocess: function postprocess() {
        return null;
      }
    }, {
      name: 'PathComposition$ebnf$2$subexpression$1',
      symbols: ['Pathlike', 'PathComposition$ebnf$2$subexpression$1$ebnf$1', '_'],
      postprocess: function postprocess(_ref12) {
        var pp = _ref12[0];
        return pp;
      }
    }, {
      name: 'PathComposition$ebnf$2',
      symbols: ['PathComposition$ebnf$2$subexpression$1']
    }, {
      name: 'PathComposition$ebnf$2$subexpression$2$ebnf$1',
      symbols: [{
        literal: ','
      }],
      postprocess: id
    }, {
      name: 'PathComposition$ebnf$2$subexpression$2$ebnf$1',
      symbols: [],
      postprocess: function postprocess() {
        return null;
      }
    }, {
      name: 'PathComposition$ebnf$2$subexpression$2',
      symbols: ['Pathlike', 'PathComposition$ebnf$2$subexpression$2$ebnf$1', '_'],
      postprocess: function postprocess(_ref13) {
        var pp = _ref13[0];
        return pp;
      }
    }, {
      name: 'PathComposition$ebnf$2',
      symbols: ['PathComposition$ebnf$2', 'PathComposition$ebnf$2$subexpression$2'],
      postprocess: function postprocess(d) {
        return d[0].concat([d[1]]);
      }
    }, {
      name: 'PathComposition',
      symbols: [{
        literal: '['
      }, '_', 'Attributes', '_', 'PathComposition$ebnf$2', {
        literal: ']'
      }],
      postprocess: function postprocess(_ref14) {
        var attr = _ref14[2],
            pp = _ref14[4];
        return cons(reduce('pair', flatten(pp)), attr);
      }
    }, {
      name: 'Relation',
      symbols: [{
        literal: ','
      }],
      postprocess: function postprocess() {
        return 'pair';
      }
    }, {
      name: 'Relation',
      symbols: [{
        literal: '-->'
      }],
      postprocess: function postprocess() {
        return 'right';
      }
    }, {
      name: 'Relation',
      symbols: [{
        literal: '--'
      }],
      postprocess: function postprocess() {
        return 'either';
      }
    }, {
      name: 'Relation',
      symbols: [{
        literal: '<--'
      }],
      postprocess: function postprocess() {
        return 'left';
      }
    }, {
      name: 'Attributes$ebnf$1',
      symbols: ['Identity'],
      postprocess: id
    }, {
      name: 'Attributes$ebnf$1',
      symbols: [],
      postprocess: function postprocess() {
        return null;
      }
    }, {
      name: 'Attributes$ebnf$2',
      symbols: ['LabelList'],
      postprocess: id
    }, {
      name: 'Attributes$ebnf$2',
      symbols: [],
      postprocess: function postprocess() {
        return null;
      }
    }, {
      name: 'Attributes$ebnf$3',
      symbols: ['Record'],
      postprocess: id
    }, {
      name: 'Attributes$ebnf$3',
      symbols: [],
      postprocess: function postprocess() {
        return null;
      }
    }, {
      name: 'Attributes',
      symbols: ['Attributes$ebnf$1', '_', 'Attributes$ebnf$2', '_', 'Attributes$ebnf$3'],
      postprocess: function postprocess(_ref15) {
        var id = _ref15[0],
            labels = _ref15[2],
            record = _ref15[4];
        return {
          id: id,
          labels: labels,
          record: record
        };
      }
    }, {
      name: 'LabelList$ebnf$1',
      symbols: ['Label']
    }, {
      name: 'LabelList$ebnf$1',
      symbols: ['LabelList$ebnf$1', 'Label'],
      postprocess: function postprocess(d) {
        return d[0].concat([d[1]]);
      }
    }, {
      name: 'LabelList',
      symbols: ['LabelList$ebnf$1'],
      postprocess: function postprocess(_ref16) {
        var labels = _ref16[0];
        return labels;
      }
    }, {
      name: 'Label',
      symbols: [{
        literal: ':'
      }, 'Symbol'],
      postprocess: function postprocess(_ref17) {
        var label = _ref17[1];
        return label;
      }
    }, {
      name: 'Identity',
      symbols: [/*#__PURE__*/lexer.has('identifier') ? {
        type: 'identifier'
      } : identifier],
      postprocess: text
    }, {
      name: 'Identity',
      symbols: [/*#__PURE__*/lexer.has('symbol') ? {
        type: 'symbol'
      } : symbol],
      postprocess: text
    }, {
      name: 'Identity',
      symbols: [/*#__PURE__*/lexer.has('integer') ? {
        type: 'integer'
      } : integer],
      postprocess: text
    }, {
      name: 'Identity',
      symbols: [/*#__PURE__*/lexer.has('octal') ? {
        type: 'octal'
      } : octal],
      postprocess: text
    }, {
      name: 'Identity',
      symbols: [/*#__PURE__*/lexer.has('hexadecimal') ? {
        type: 'hexadecimal'
      } : hexadecimal],
      postprocess: text
    }, {
      name: 'Identity',
      symbols: [/*#__PURE__*/lexer.has('measurement') ? {
        type: 'measurement'
      } : measurement],
      postprocess: text
    }, {
      name: 'Identity',
      symbols: [/*#__PURE__*/lexer.has('tickedString') ? {
        type: 'tickedString'
      } : tickedString],
      postprocess: function postprocess(_ref18) {
        var t = _ref18[0];
        return t.text.slice(1, -1);
      }
    }, {
      name: 'Symbol',
      symbols: [/*#__PURE__*/lexer.has('symbol') ? {
        type: 'symbol'
      } : symbol],
      postprocess: text
    }, {
      name: 'Symbol',
      symbols: [/*#__PURE__*/lexer.has('tickedString') ? {
        type: 'tickedString'
      } : tickedString],
      postprocess: function postprocess(_ref19) {
        var t = _ref19[0];
        return t.text.slice(1, -1);
      }
    }, {
      name: 'Record',
      symbols: [{
        literal: '{'
      }, '_', {
        literal: '}'
      }],
      postprocess: empty
    }, {
      name: 'Record$ebnf$1',
      symbols: []
    }, {
      name: 'Record$ebnf$1$subexpression$1',
      symbols: ['_', {
        literal: ','
      }, '_', 'Property']
    }, {
      name: 'Record$ebnf$1',
      symbols: ['Record$ebnf$1', 'Record$ebnf$1$subexpression$1'],
      postprocess: function postprocess(d) {
        return d[0].concat([d[1]]);
      }
    }, {
      name: 'Record',
      symbols: [{
        literal: '{'
      }, '_', 'Property', 'Record$ebnf$1', {
        literal: '}'
      }],
      postprocess: function postprocess(_ref20) {
        var p = _ref20[2],
            ps = _ref20[3];
        return record([p].concat(extractPairs(ps)));
      }
    }, {
      name: 'Property',
      symbols: ['Symbol', '_', {
        literal: ':'
      }, '_', 'Value'],
      postprocess: function postprocess(_ref21) {
        var k = _ref21[0],
            v = _ref21[4];
        return property(k, v);
      }
    }, {
      name: 'Value',
      symbols: ['StringLiteral'],
      postprocess: id
    }, {
      name: 'Value',
      symbols: ['NumericLiteral'],
      postprocess: id
    }, {
      name: 'Value',
      symbols: [/*#__PURE__*/lexer.has('boolean') ? {
        type: 'boolean'
      } : boolean],
      postprocess: function postprocess(d) {
        return _boolean$1(JSON.parse(d[0].value.toLowerCase()));
      }
    }, {
      name: 'Value$ebnf$1',
      symbols: []
    }, {
      name: 'Value$ebnf$1$subexpression$1',
      symbols: ['_', {
        literal: ','
      }, '_', 'Value']
    }, {
      name: 'Value$ebnf$1',
      symbols: ['Value$ebnf$1', 'Value$ebnf$1$subexpression$1'],
      postprocess: function postprocess(d) {
        return d[0].concat([d[1]]);
      }
    }, {
      name: 'Value',
      symbols: [{
        literal: '['
      }, '_', 'Value', 'Value$ebnf$1', {
        literal: ']'
      }],
      postprocess: function postprocess(_ref22) {
        var v = _ref22[2],
            vs = _ref22[3];
        return [v].concat(extractArray(vs));
      }
    }, {
      name: 'StringLiteral',
      symbols: [/*#__PURE__*/lexer.has('singleQuotedString') ? {
        type: 'singleQuotedString'
      } : singleQuotedString],
      postprocess: function postprocess(d) {
        return string(d[0].value);
      }
    }, {
      name: 'StringLiteral',
      symbols: [/*#__PURE__*/lexer.has('doubleQuotedString') ? {
        type: 'doubleQuotedString'
      } : doubleQuotedString],
      postprocess: function postprocess(d) {
        return string(d[0].value);
      }
    }, {
      name: 'StringLiteral',
      symbols: [/*#__PURE__*/lexer.has('tickedString') ? {
        type: 'tickedString'
      } : tickedString],
      postprocess: function postprocess(d) {
        return string(d[0].value);
      }
    }, {
      name: 'StringLiteral',
      symbols: [/*#__PURE__*/lexer.has('taggedString') ? {
        type: 'taggedString'
      } : taggedString],
      postprocess: function postprocess(d) {
        var parts = separateTagFromString(d[0].value);
        return tagged(parts.tag, parts.value);
      }
    }, {
      name: 'NumericLiteral',
      symbols: [/*#__PURE__*/lexer.has('integer') ? {
        type: 'integer'
      } : integer],
      postprocess: function postprocess(d) {
        return integer$2(d[0].value);
      }
    }, {
      name: 'NumericLiteral',
      symbols: [/*#__PURE__*/lexer.has('decimal') ? {
        type: 'decimal'
      } : decimal],
      postprocess: function postprocess(d) {
        return decimal$2(d[0].value);
      }
    }, {
      name: 'NumericLiteral',
      symbols: [/*#__PURE__*/lexer.has('hexadecimal') ? {
        type: 'hexadecimal'
      } : hexadecimal],
      postprocess: function postprocess(d) {
        return hexadecimal$2(d[0].value);
      }
    }, {
      name: 'NumericLiteral',
      symbols: [/*#__PURE__*/lexer.has('octal') ? {
        type: 'octal'
      } : octal],
      postprocess: function postprocess(d) {
        return octal$2(d[0].value);
      }
    }, {
      name: 'NumericLiteral',
      symbols: [/*#__PURE__*/lexer.has('measurement') ? {
        type: 'measurement'
      } : measurement],
      postprocess: function postprocess(d) {
        var parts = separateNumberFromUnits(d[0].value);
        return measurement$2(parts.unit, parts.value);
      }
    }, {
      name: '_',
      symbols: []
    }, {
      name: '_',
      symbols: [/*#__PURE__*/lexer.has('whitespace') ? {
        type: 'whitespace'
      } : whitespace],
      postprocess: empty
    }, {
      name: 'Comment',
      symbols: [/*#__PURE__*/lexer.has('lineComment') ? {
        type: 'lineComment'
      } : lineComment],
      postprocess: empty
    }, {
      name: 'EOL',
      symbols: [{
        literal: '\n'
      }],
      postprocess: empty
    }],
    ParserStart: 'Gram'
  };

  var INCOMPLETE_PARSE = 'Incomplete parse.';
  var SYNTAX_ERROR = 'Syntax error at';

  var gramErrors = {
    __proto__: null,
    INCOMPLETE_PARSE: INCOMPLETE_PARSE,
    SYNTAX_ERROR: SYNTAX_ERROR
  };

  var lexerLocation = function lexerLocation(state) {
    return {
      line: state.line,
      column: state.col
    };
  };

  var tokenLocation = function tokenLocation(token) {
    return {
      line: token.line,
      column: token.col
    };
  };

  var parse = function parse(text, file) {
    var nearleyParser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

    try {
      var parsed = nearleyParser.feed(text);

      if (parsed.results[0] === undefined && parsed.lexerState) {
        var location = lexerLocation(parsed.lexerState);
        file.fail(INCOMPLETE_PARSE, location);
      }

      return parsed.results[0] || {
        type: 'error'
      };
    } catch (e) {
      var _location = e.token ? tokenLocation(e.token) : {
        line: 0,
        column: 0
      };

      file.fail(e.message, _location);
    }
  };

  var gramParserPlugin = function gramParserPlugin() {
    this.Parser = parse;
  };

  var toAST = function toAST(src) {
    var processor = unified_1().use(gramParserPlugin).freeze();
    return processor.parse(src);
  };

  exports.errors = gramErrors;
  exports.gramParserPlugin = gramParserPlugin;
  exports.toAST = toAST;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gram-parse.umd.development.js.map

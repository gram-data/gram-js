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
    } else if (typeof options === 'string' || isBuffer(options)) {
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
    return isBuffer(value) ? value.toString(encoding) : String(value)
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
  var checkIdentifierRegex = /*#__PURE__*/new RegExp('^' + identifier$1.source + '$');
  /**
   * Checks whether the given string is a valid identifier.
   *
   */

  var isValidIdentifier = function isValidIdentifier(s) {
    return s && checkIdentifierRegex.test(s);
  };

  var gramTokens = {
    __proto__: null,
    "boolean": _boolean,
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
    identifier: identifier$1,
    isValidIdentifier: isValidIdentifier
  };
  /**
   * Type guard for a Path.
   *
   * @param o any object
   */


  var isGramPath = function isGramPath(o) {
    return !!o.type && o.type === 'path';
  };
  /**
   * Constant identity for empty paths: `ø`.
   */


  var EMPTY_PATH_ID = 'ø';
  /**
   * Type guard for GramEmptyPath.
   *
   * @param o any object
   */

  var isGramEmptyPath = function isGramEmptyPath(o) {
    return isGramPath(o) && o.id === EMPTY_PATH_ID;
  };
  /**
   * Type guard for GramNode.
   *
   * @param o any object
   */


  var isGramNode = function isGramNode(o) {
    return isGramPath(o) && o.children && o.children.length === 0 && o.id !== EMPTY_PATH_ID;
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
   * Build a path sequence that represents a graph.
   *
   * @param paths sequence of paths through history
   * @param id optional reference identifier. The "name" of this graph instance.
   * @param labels optional labels
   * @param record optional graph-level data
   */


  var seq = function seq(paths, id, labels, record) {
    return _extends$1({
      type: 'seq',
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
   * Build a path.
   *
   * @param members sub-paths to compose
   * @param attributes attributes
   */


  var cons = function cons(members, attributes) {
    if (attributes === void 0) {
      attributes = {};
    }

    var element = _extends$1({
      type: 'path'
    }, attributes.id && {
      id: attributes.id
    }, attributes.labels && {
      labels: attributes.labels
    }, attributes.record && {
      record: attributes.record
    });

    if (members === undefined) {
      if (element.id && element.id !== EMPTY_PATH_ID) {
        element.children = [];
        return element;
      }

      element.children = undefined;
      return EMPTY_PATH;
    } else if (members.length === 0) {
      if (element.id === EMPTY_PATH_ID) {
        return EMPTY_PATH;
      }

      element.children = [];
      return element;
    } else if (members.length === 1) {
      var lhs = members[0];

      if (isGramEmptyPath(lhs)) {
        element.children = [];
        return element;
      } else {
        element.children = [lhs];
        return element;
      }
    } else if (members.length === 2) {
      if (attributes.kind && attributes.kind !== 'pair' && isGramNode(members[0]) && isGramNode(members[1])) {
        element.kind = attributes.kind;
        element.children = [members[0], members[1]];
        return element;
      } else if (isGramEmptyPath(members[0]) && isGramEmptyPath(members[1])) {
        element.kind = attributes.kind;
        element.children = [];
        return element;
      }

      element.children = [members[0], members[1]];
    }

    element.kind = attributes.kind || 'pair';
    return element;
  };
  /**
   * Singleton instance of GramEmptyPath
   */


  var EMPTY_PATH = {
    type: 'path',
    id: EMPTY_PATH_ID,
    labels: undefined,
    record: undefined,
    children: []
  };
  /**
   * Convenience function for retrieving the singleton GramEmptyPath.
   */

  var empty = function empty() {
    return EMPTY_PATH;
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
      type: 'path'
    }, id && {
      id: id
    }, labels && {
      labels: labels
    }, record && {
      record: record
    }, {
      children: []
    });
  };
  /**
   * Build a path
   *
   * @param children
   * @param id
   * @param labels
   * @param record
   */
  // export const path = (
  //   members: [GramPath] | [GramPath, GramPath],
  //   id?: string,
  //   labels?: string[],
  //   record?: GramRecord
  // ): GramPath => ({
  //   type: 'path',
  //   id,
  //   ...(labels && { labels }),
  //   ...(record && { record }),
  //   children: members,
  // });

  /**
   * Build a pair
   *
   * @param children
   * @param id
   * @param labels
   * @param record
   */


  var path$1 = function path(kind, members, id, labels, record) {
    return _extends$1({
      type: 'path',
      kind: kind,
      id: id
    }, labels && {
      labels: labels
    }, record && {
      record: record
    }, {
      children: members
    });
  };
  /**
   * Build a pair
   *
   * @param children
   * @param id
   * @param labels
   * @param record
   */


  var pair = function pair(members, id, labels, record) {
    return path$1('pair', members, id, labels, record);
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
      value: typeof value === 'number' ? value.toString(16) : value
    };
  };

  var octal$2 = function octal(value) {
    return {
      type: 'octal',
      value: typeof value === 'number' ? value.toString(8) : value
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
    "'": "'",
    ø: 'ø'
  });

  var empty$1 = function empty() {
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
      name: 'GramSeq$ebnf$1$subexpression$1',
      symbols: ['Path', '_'],
      postprocess: function postprocess(_ref2) {
        var pp = _ref2[0];
        return pp;
      }
    }, {
      name: 'GramSeq$ebnf$1',
      symbols: ['GramSeq$ebnf$1$subexpression$1']
    }, {
      name: 'GramSeq$ebnf$1$subexpression$2',
      symbols: ['Path', '_'],
      postprocess: function postprocess(_ref3) {
        var pp = _ref3[0];
        return pp;
      }
    }, {
      name: 'GramSeq$ebnf$1',
      symbols: ['GramSeq$ebnf$1', 'GramSeq$ebnf$1$subexpression$2'],
      postprocess: function postprocess(d) {
        return d[0].concat([d[1]]);
      }
    }, {
      name: 'GramSeq$ebnf$2',
      symbols: ['EOL'],
      postprocess: id
    }, {
      name: 'GramSeq$ebnf$2',
      symbols: [],
      postprocess: function postprocess() {
        return null;
      }
    }, {
      name: 'GramSeq',
      symbols: ['GramSeq$ebnf$1', 'GramSeq$ebnf$2'],
      postprocess: function postprocess(_ref4) {
        var pp = _ref4[0];
        return seq(flatten(pp));
      }
    }, {
      name: 'Path',
      symbols: ['NodePattern'],
      postprocess: id
    }, {
      name: 'Path',
      symbols: ['PathComposition'],
      postprocess: id
    }, {
      name: 'Path',
      symbols: ['PathPair'],
      postprocess: id
    }, {
      name: 'NodePattern',
      symbols: ['Node', '_', 'Edge', '_', 'NodePattern'],
      postprocess: function postprocess(_ref5) {
        var np = _ref5[0],
            es = _ref5[2],
            ep = _ref5[4];
        return cons([np, ep], {
          kind: es.kind,
          id: es.id,
          labels: es.labels,
          record: es.record
        });
      }
    }, {
      name: 'NodePattern',
      symbols: ['Node'],
      postprocess: id
    }, {
      name: 'Node',
      symbols: [{
        literal: '('
      }, '_', 'Attributes', '_', {
        literal: ')'
      }],
      postprocess: function postprocess(_ref6) {
        var attrs = _ref6[2];
        return node(attrs.id, attrs.labels, attrs.record);
      }
    }, {
      name: 'Edge',
      symbols: [{
        literal: '-['
      }, '_', 'Attributes', {
        literal: ']->'
      }],
      postprocess: function postprocess(_ref7) {
        var attrs = _ref7[2];
        return _extends({
          kind: 'right'
        }, attrs);
      }
    }, {
      name: 'Edge',
      symbols: [{
        literal: '-['
      }, '_', 'Attributes', {
        literal: ']-'
      }],
      postprocess: function postprocess(_ref8) {
        var attrs = _ref8[2];
        return _extends({
          kind: 'either'
        }, attrs);
      }
    }, {
      name: 'Edge',
      symbols: [{
        literal: '<-['
      }, '_', 'Attributes', {
        literal: ']-'
      }],
      postprocess: function postprocess(_ref9) {
        var attrs = _ref9[2];
        return _extends({
          kind: 'left'
        }, attrs);
      }
    }, {
      name: 'Edge',
      symbols: [{
        literal: '-[]->'
      }],
      postprocess: function postprocess() {
        return {
          kind: 'right'
        };
      }
    }, {
      name: 'Edge',
      symbols: [{
        literal: '-[]-'
      }],
      postprocess: function postprocess() {
        return {
          kind: 'either'
        };
      }
    }, {
      name: 'Edge',
      symbols: [{
        literal: '<-[]-'
      }],
      postprocess: function postprocess() {
        return {
          kind: 'left'
        };
      }
    }, {
      name: 'Edge',
      symbols: [{
        literal: '-->'
      }],
      postprocess: function postprocess() {
        return {
          kind: 'right'
        };
      }
    }, {
      name: 'Edge',
      symbols: [{
        literal: '--'
      }],
      postprocess: function postprocess() {
        return {
          kind: 'either'
        };
      }
    }, {
      name: 'Edge',
      symbols: [{
        literal: '<--'
      }],
      postprocess: function postprocess() {
        return {
          kind: 'left'
        };
      }
    }, {
      name: 'PathComposition',
      symbols: ['PathPoint'],
      postprocess: id
    }, {
      name: 'PathComposition',
      symbols: ['PathAnnotation'],
      postprocess: id
    }, {
      name: 'PathComposition',
      symbols: ['PathExpression'],
      postprocess: id
    }, {
      name: 'PathPoint',
      symbols: [{
        literal: '['
      }, '_', 'Attributes', '_', {
        literal: ']'
      }],
      postprocess: function postprocess(_ref10) {
        var attr = _ref10[2];

        if ((attr.id || attr.labels || attr.record) && attr.id !== 'ø') {
          // console.log(attr);
          return node(attr.id, attr.labels, attr.record);
        } else {
          return empty();
        }
      }
    }, {
      name: 'PathAnnotation',
      symbols: [{
        literal: '['
      }, '_', 'Attributes', '_', 'Path', {
        literal: ']'
      }],
      postprocess: function postprocess(_ref11) {
        var attr = _ref11[2],
            lhs = _ref11[4];
        // console.log('annotate()', lhs)
        return cons([lhs], {
          id: attr.id,
          labels: attr.labels,
          record: attr.record
        });
      }
    }, {
      name: 'PathExpression$ebnf$1',
      symbols: ['Kind'],
      postprocess: id
    }, {
      name: 'PathExpression$ebnf$1',
      symbols: [],
      postprocess: function postprocess() {
        return null;
      }
    }, {
      name: 'PathExpression',
      symbols: [{
        literal: '['
      }, '_', 'Attributes', '_', 'PathExpression$ebnf$1', '_', 'Path', '_', 'Path', '_', {
        literal: ']'
      }],
      postprocess: function postprocess(_ref12) {
        var attrs = _ref12[2],
            kind = _ref12[4],
            lhs = _ref12[6],
            rhs = _ref12[8];
        return cons([lhs, rhs], {
          kind: kind,
          id: attrs.id,
          labels: attrs.labels,
          record: attrs.record
        });
      }
    }, {
      name: 'PathPair$subexpression$1',
      symbols: ['NodePattern']
    }, {
      name: 'PathPair$subexpression$1',
      symbols: ['PathComposition']
    }, {
      name: 'PathPair',
      symbols: ['PathPair$subexpression$1', '_', {
        literal: ','
      }, '_', 'Path'],
      postprocess: function postprocess(_ref13) {
        var lp = _ref13[0],
            rp = _ref13[4];
        return pair([lp[0], rp]);
      }
    }, {
      name: 'Kind',
      symbols: [{
        literal: ','
      }],
      postprocess: function postprocess() {
        return 'pair';
      }
    }, {
      name: 'Kind',
      symbols: [{
        literal: '-->'
      }],
      postprocess: function postprocess() {
        return 'right';
      }
    }, {
      name: 'Kind',
      symbols: [{
        literal: '--'
      }],
      postprocess: function postprocess() {
        return 'either';
      }
    }, {
      name: 'Kind',
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
      name: 'Attributes$ebnf$2$subexpression$1',
      symbols: ['_', 'LabelList'],
      postprocess: function postprocess(_ref14) {
        var ll = _ref14[1];
        return ll;
      }
    }, {
      name: 'Attributes$ebnf$2',
      symbols: ['Attributes$ebnf$2$subexpression$1'],
      postprocess: id
    }, {
      name: 'Attributes$ebnf$2',
      symbols: [],
      postprocess: function postprocess() {
        return null;
      }
    }, {
      name: 'Attributes$ebnf$3$subexpression$1',
      symbols: ['_', 'Record'],
      postprocess: function postprocess(_ref15) {
        var r = _ref15[1];
        return r;
      }
    }, {
      name: 'Attributes$ebnf$3',
      symbols: ['Attributes$ebnf$3$subexpression$1'],
      postprocess: id
    }, {
      name: 'Attributes$ebnf$3',
      symbols: [],
      postprocess: function postprocess() {
        return null;
      }
    }, {
      name: 'Attributes',
      symbols: ['Attributes$ebnf$1', 'Attributes$ebnf$2', 'Attributes$ebnf$3'],
      postprocess: function postprocess(_ref16) {
        var id = _ref16[0],
            labels = _ref16[1],
            record = _ref16[2];
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
      postprocess: function postprocess(_ref17) {
        var labels = _ref17[0];
        return labels;
      }
    }, {
      name: 'Label',
      symbols: [{
        literal: ':'
      }, 'Symbol'],
      postprocess: function postprocess(_ref18) {
        var label = _ref18[1];
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
      symbols: [{
        literal: 'ø'
      }],
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
      postprocess: function postprocess(_ref19) {
        var t = _ref19[0];
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
      postprocess: function postprocess(_ref20) {
        var t = _ref20[0];
        return t.text.slice(1, -1);
      }
    }, {
      name: 'Record',
      symbols: [{
        literal: '{'
      }, '_', {
        literal: '}'
      }],
      postprocess: empty$1
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
      }, '_', 'Property', 'Record$ebnf$1', '_', {
        literal: '}'
      }],
      postprocess: function postprocess(_ref21) {
        var p = _ref21[2],
            ps = _ref21[3];
        return [p].concat(extractPairs(ps));
      }
    }, {
      name: 'Property',
      symbols: ['Symbol', '_', {
        literal: ':'
      }, '_', 'Value'],
      postprocess: function postprocess(_ref22) {
        var k = _ref22[0],
            v = _ref22[4];
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
      postprocess: function postprocess(_ref23) {
        var v = _ref23[2],
            vs = _ref23[3];
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
      postprocess: empty$1
    }, {
      name: 'Comment',
      symbols: [/*#__PURE__*/lexer.has('lineComment') ? {
        type: 'lineComment'
      } : lineComment],
      postprocess: empty$1
    }, {
      name: 'EOL',
      symbols: [{
        literal: '\n'
      }],
      postprocess: empty$1
    }],
    ParserStart: 'GramSeq'
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

      if (parsed.results.length > 1) {
        file.info('[WARN] parsing is ambiguous');
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

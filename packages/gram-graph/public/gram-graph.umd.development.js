(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory((global.gram = global.gram || {}, global.gram.graph = {})));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _function = /*#__PURE__*/createCommonjsModule(function (module, exports) {
	  /**
	   * @since 2.0.0
	   */

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.bindTo_ = exports.bind_ = exports.hole = exports.pipe = exports.untupled = exports.tupled = exports.absurd = exports.decrement = exports.increment = exports.tuple = exports.flow = exports.flip = exports.constVoid = exports.constUndefined = exports.constNull = exports.constFalse = exports.constTrue = exports.constant = exports.not = exports.unsafeCoerce = exports.identity = void 0;
	  /**
	   * @since 2.0.0
	   */

	  function identity(a) {
	    return a;
	  }

	  exports.identity = identity;
	  /**
	   * @since 2.0.0
	   */

	  exports.unsafeCoerce = identity;
	  /**
	   * @since 2.0.0
	   */

	  function not(predicate) {
	    return function (a) {
	      return !predicate(a);
	    };
	  }

	  exports.not = not;
	  /**
	   * @since 2.0.0
	   */

	  function constant(a) {
	    return function () {
	      return a;
	    };
	  }

	  exports.constant = constant;
	  /**
	   * A thunk that returns always `true`
	   *
	   * @since 2.0.0
	   */

	  exports.constTrue = function () {
	    return true;
	  };
	  /**
	   * A thunk that returns always `false`
	   *
	   * @since 2.0.0
	   */


	  exports.constFalse = function () {
	    return false;
	  };
	  /**
	   * A thunk that returns always `null`
	   *
	   * @since 2.0.0
	   */


	  exports.constNull = function () {
	    return null;
	  };
	  /**
	   * A thunk that returns always `undefined`
	   *
	   * @since 2.0.0
	   */


	  exports.constUndefined = function () {
	    return;
	  };
	  /**
	   * A thunk that returns always `void`
	   *
	   * @since 2.0.0
	   */


	  exports.constVoid = function () {
	    return;
	  }; // TODO: remove in v3

	  /**
	   * Flips the order of the arguments of a function of two arguments.
	   *
	   * @since 2.0.0
	   */


	  function flip(f) {
	    return function (b, a) {
	      return f(a, b);
	    };
	  }

	  exports.flip = flip;

	  function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
	    switch (arguments.length) {
	      case 1:
	        return ab;

	      case 2:
	        return function () {
	          return bc(ab.apply(this, arguments));
	        };

	      case 3:
	        return function () {
	          return cd(bc(ab.apply(this, arguments)));
	        };

	      case 4:
	        return function () {
	          return de(cd(bc(ab.apply(this, arguments))));
	        };

	      case 5:
	        return function () {
	          return ef(de(cd(bc(ab.apply(this, arguments)))));
	        };

	      case 6:
	        return function () {
	          return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
	        };

	      case 7:
	        return function () {
	          return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
	        };

	      case 8:
	        return function () {
	          return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
	        };

	      case 9:
	        return function () {
	          return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
	        };
	    }

	    return;
	  }

	  exports.flow = flow;
	  /**
	   * @since 2.0.0
	   */

	  function tuple() {
	    var t = [];

	    for (var _i = 0; _i < arguments.length; _i++) {
	      t[_i] = arguments[_i];
	    }

	    return t;
	  }

	  exports.tuple = tuple;
	  /**
	   * @since 2.0.0
	   */

	  function increment(n) {
	    return n + 1;
	  }

	  exports.increment = increment;
	  /**
	   * @since 2.0.0
	   */

	  function decrement(n) {
	    return n - 1;
	  }

	  exports.decrement = decrement;
	  /**
	   * @since 2.0.0
	   */

	  function absurd(_) {
	    throw new Error('Called `absurd` function which should be uncallable');
	  }

	  exports.absurd = absurd;
	  /**
	   * Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.
	   *
	   * @example
	   * import { tupled } from 'fp-ts/function'
	   *
	   * const add = tupled((x: number, y: number): number => x + y)
	   *
	   * assert.strictEqual(add([1, 2]), 3)
	   *
	   * @since 2.4.0
	   */

	  function tupled(f) {
	    return function (a) {
	      return f.apply(void 0, a);
	    };
	  }

	  exports.tupled = tupled;
	  /**
	   * Inverse function of `tupled`
	   *
	   * @since 2.4.0
	   */

	  function untupled(f) {
	    return function () {
	      var a = [];

	      for (var _i = 0; _i < arguments.length; _i++) {
	        a[_i] = arguments[_i];
	      }

	      return f(a);
	    };
	  }

	  exports.untupled = untupled;

	  function pipe(a, ab, bc, cd, de, ef, fg, gh, hi, ij, jk, kl, lm, mn, no, op, pq, qr, rs, st) {
	    switch (arguments.length) {
	      case 1:
	        return a;

	      case 2:
	        return ab(a);

	      case 3:
	        return bc(ab(a));

	      case 4:
	        return cd(bc(ab(a)));

	      case 5:
	        return de(cd(bc(ab(a))));

	      case 6:
	        return ef(de(cd(bc(ab(a)))));

	      case 7:
	        return fg(ef(de(cd(bc(ab(a))))));

	      case 8:
	        return gh(fg(ef(de(cd(bc(ab(a)))))));

	      case 9:
	        return hi(gh(fg(ef(de(cd(bc(ab(a))))))));

	      case 10:
	        return ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))));

	      case 11:
	        return jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))));

	      case 12:
	        return kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))));

	      case 13:
	        return lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))));

	      case 14:
	        return mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))));

	      case 15:
	        return no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))));

	      case 16:
	        return op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))));

	      case 17:
	        return pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))))));

	      case 18:
	        return qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))))));

	      case 19:
	        return rs(qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a))))))))))))))))));

	      case 20:
	        return st(rs(qr(pq(op(no(mn(lm(kl(jk(ij(hi(gh(fg(ef(de(cd(bc(ab(a)))))))))))))))))));
	    }

	    return;
	  }

	  exports.pipe = pipe;
	  /**
	   * Type hole simulation
	   *
	   * @since 2.7.0
	   */

	  exports.hole = absurd;
	  /**
	   * @internal
	   */

	  exports.bind_ = function (a, name, b) {
	    var _a;

	    return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
	  };
	  /**
	   * @internal
	   */


	  exports.bindTo_ = function (name) {
	    return function (b) {
	      var _a;

	      return _a = {}, _a[name] = b, _a;
	    };
	  };
	});
	var _function_4 = _function.pipe;

	var Option = /*#__PURE__*/createCommonjsModule(function (module, exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.apS = exports.bind = exports.bindTo = exports.getRefinement = exports.exists = exports.elem = exports.option = exports.MonadThrow = exports.Witherable = exports.Traversable = exports.Filterable = exports.Compactable = exports.Extend = exports.Alternative = exports.Alt = exports.Foldable = exports.Monad = exports.Applicative = exports.Functor = exports.getMonoid = exports.getLastMonoid = exports.getFirstMonoid = exports.getApplyMonoid = exports.getApplySemigroup = exports.getOrd = exports.getEq = exports.getShow = exports.URI = exports.wilt = exports.wither = exports.sequence = exports.traverse = exports.partitionMap = exports.partition = exports.filterMap = exports.filter = exports.separate = exports.compact = exports.reduceRight = exports.foldMap = exports.reduce = exports.duplicate = exports.extend = exports.throwError = exports.zero = exports.alt = exports.flatten = exports.chainFirst = exports.chain = exports.of = exports.apSecond = exports.apFirst = exports.ap = exports.map = exports.mapNullable = exports.getOrElse = exports.getOrElseW = exports.toUndefined = exports.toNullable = exports.fold = exports.fromEither = exports.getRight = exports.getLeft = exports.tryCatch = exports.fromPredicate = exports.fromNullable = exports.some = exports.none = exports.isNone = exports.isSome = void 0; // -------------------------------------------------------------------------------------
	  // guards
	  // -------------------------------------------------------------------------------------

	  /**
	   * Returns `true` if the option is an instance of `Some`, `false` otherwise
	   *
	   * @example
	   * import { some, none, isSome } from 'fp-ts/Option'
	   *
	   * assert.strictEqual(isSome(some(1)), true)
	   * assert.strictEqual(isSome(none), false)
	   *
	   * @category guards
	   * @since 2.0.0
	   */

	  exports.isSome = function (fa) {
	    return fa._tag === 'Some';
	  };
	  /**
	   * Returns `true` if the option is `None`, `false` otherwise
	   *
	   * @example
	   * import { some, none, isNone } from 'fp-ts/Option'
	   *
	   * assert.strictEqual(isNone(some(1)), false)
	   * assert.strictEqual(isNone(none), true)
	   *
	   * @category guards
	   * @since 2.0.0
	   */


	  exports.isNone = function (fa) {
	    return fa._tag === 'None';
	  }; // -------------------------------------------------------------------------------------
	  // constructors
	  // -------------------------------------------------------------------------------------

	  /**
	   * @category constructors
	   * @since 2.0.0
	   */


	  exports.none = {
	    _tag: 'None'
	  };
	  /**
	   * @category constructors
	   * @since 2.0.0
	   */

	  exports.some = function (a) {
	    return {
	      _tag: 'Some',
	      value: a
	    };
	  };
	  /**
	   * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
	   * returns the value wrapped in a `Some`
	   *
	   * @example
	   * import { none, some, fromNullable } from 'fp-ts/Option'
	   *
	   * assert.deepStrictEqual(fromNullable(undefined), none)
	   * assert.deepStrictEqual(fromNullable(null), none)
	   * assert.deepStrictEqual(fromNullable(1), some(1))
	   *
	   * @category constructors
	   * @since 2.0.0
	   */


	  function fromNullable(a) {
	    return a == null ? exports.none : exports.some(a);
	  }

	  exports.fromNullable = fromNullable;

	  function fromPredicate(predicate) {
	    return function (a) {
	      return predicate(a) ? exports.some(a) : exports.none;
	    };
	  }

	  exports.fromPredicate = fromPredicate;
	  /**
	   * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in
	   * `Some`
	   *
	   * @example
	   * import { none, some, tryCatch } from 'fp-ts/Option'
	   *
	   * assert.deepStrictEqual(
	   *   tryCatch(() => {
	   *     throw new Error()
	   *   }),
	   *   none
	   * )
	   * assert.deepStrictEqual(tryCatch(() => 1), some(1))
	   *
	   * @category constructors
	   * @since 2.0.0
	   */

	  function tryCatch(f) {
	    try {
	      return exports.some(f());
	    } catch (e) {
	      return exports.none;
	    }
	  }

	  exports.tryCatch = tryCatch;
	  /**
	   * Returns an `E` value if possible
	   *
	   * @category constructors
	   * @since 2.0.0
	   */

	  function getLeft(ma) {
	    return ma._tag === 'Right' ? exports.none : exports.some(ma.left);
	  }

	  exports.getLeft = getLeft;
	  /**
	   * Returns an `A` value if possible
	   *
	   * @category constructors
	   * @since 2.0.0
	   */

	  function getRight(ma) {
	    return ma._tag === 'Left' ? exports.none : exports.some(ma.right);
	  }

	  exports.getRight = getRight;
	  /**
	   * Derivable from `MonadThrow`.
	   *
	   * @category constructors
	   * @since 2.0.0
	   */

	  exports.fromEither = function (ma) {
	    return ma._tag === 'Left' ? exports.none : exports.some(ma.right);
	  }; // -------------------------------------------------------------------------------------
	  // destructors
	  // -------------------------------------------------------------------------------------

	  /**
	   * Takes a default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
	   * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
	   *
	   * @example
	   * import { some, none, fold } from 'fp-ts/Option'
	   * import { pipe } from 'fp-ts/function'
	   *
	   * assert.strictEqual(
	   *   pipe(
	   *     some(1),
	   *     fold(() => 'a none', a => `a some containing ${a}`)
	   *   ),
	   *   'a some containing 1'
	   * )
	   *
	   * assert.strictEqual(
	   *   pipe(
	   *     none,
	   *     fold(() => 'a none', a => `a some containing ${a}`)
	   *   ),
	   *   'a none'
	   * )
	   *
	   * @category destructors
	   * @since 2.0.0
	   */


	  function fold(onNone, onSome) {
	    return function (ma) {
	      return exports.isNone(ma) ? onNone() : onSome(ma.value);
	    };
	  }

	  exports.fold = fold;
	  /**
	   * Extracts the value out of the structure, if it exists. Otherwise returns `null`.
	   *
	   * @example
	   * import { some, none, toNullable } from 'fp-ts/Option'
	   * import { pipe } from 'fp-ts/function'
	   *
	   * assert.strictEqual(
	   *   pipe(
	   *     some(1),
	   *     toNullable
	   *   ),
	   *   1
	   * )
	   * assert.strictEqual(
	   *   pipe(
	   *     none,
	   *     toNullable
	   *   ),
	   *   null
	   * )
	   *
	   * @category destructors
	   * @since 2.0.0
	   */

	  function toNullable(ma) {
	    return exports.isNone(ma) ? null : ma.value;
	  }

	  exports.toNullable = toNullable;
	  /**
	   * Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.
	   *
	   * @example
	   * import { some, none, toUndefined } from 'fp-ts/Option'
	   * import { pipe } from 'fp-ts/function'
	   *
	   * assert.strictEqual(
	   *   pipe(
	   *     some(1),
	   *     toUndefined
	   *   ),
	   *   1
	   * )
	   * assert.strictEqual(
	   *   pipe(
	   *     none,
	   *     toUndefined
	   *   ),
	   *   undefined
	   * )
	   *
	   * @category destructors
	   * @since 2.0.0
	   */

	  function toUndefined(ma) {
	    return exports.isNone(ma) ? undefined : ma.value;
	  }

	  exports.toUndefined = toUndefined;
	  /**
	   * Less strict version of [`getOrElse`](#getOrElse).
	   *
	   * @category destructors
	   * @since 2.6.0
	   */

	  exports.getOrElseW = function (onNone) {
	    return function (ma) {
	      return exports.isNone(ma) ? onNone() : ma.value;
	    };
	  };
	  /**
	   * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
	   *
	   * @example
	   * import { some, none, getOrElse } from 'fp-ts/Option'
	   * import { pipe } from 'fp-ts/function'
	   *
	   * assert.strictEqual(
	   *   pipe(
	   *     some(1),
	   *     getOrElse(() => 0)
	   *   ),
	   *   1
	   * )
	   * assert.strictEqual(
	   *   pipe(
	   *     none,
	   *     getOrElse(() => 0)
	   *   ),
	   *   0
	   * )
	   *
	   * @category destructors
	   * @since 2.0.0
	   */


	  exports.getOrElse = exports.getOrElseW; // -------------------------------------------------------------------------------------
	  // combinators
	  // -------------------------------------------------------------------------------------

	  /**
	   * This is `chain` + `fromNullable`, useful when working with optional values
	   *
	   * @example
	   * import { some, none, fromNullable, mapNullable } from 'fp-ts/Option'
	   * import { pipe } from 'fp-ts/function'
	   *
	   * interface Employee {
	   *   company?: {
	   *     address?: {
	   *       street?: {
	   *         name?: string
	   *       }
	   *     }
	   *   }
	   * }
	   *
	   * const employee1: Employee = { company: { address: { street: { name: 'high street' } } } }
	   *
	   * assert.deepStrictEqual(
	   *   pipe(
	   *     fromNullable(employee1.company),
	   *     mapNullable(company => company.address),
	   *     mapNullable(address => address.street),
	   *     mapNullable(street => street.name)
	   *   ),
	   *   some('high street')
	   * )
	   *
	   * const employee2: Employee = { company: { address: { street: {} } } }
	   *
	   * assert.deepStrictEqual(
	   *   pipe(
	   *     fromNullable(employee2.company),
	   *     mapNullable(company => company.address),
	   *     mapNullable(address => address.street),
	   *     mapNullable(street => street.name)
	   *   ),
	   *   none
	   * )
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  function mapNullable(f) {
	    return function (ma) {
	      return exports.isNone(ma) ? exports.none : fromNullable(f(ma.value));
	    };
	  }

	  exports.mapNullable = mapNullable; // -------------------------------------------------------------------------------------
	  // non-pipeables
	  // -------------------------------------------------------------------------------------

	  var map_ = function map_(fa, f) {
	    return _function.pipe(fa, exports.map(f));
	  };

	  var ap_ = function ap_(fab, fa) {
	    return _function.pipe(fab, exports.ap(fa));
	  };

	  var chain_ = function chain_(ma, f) {
	    return _function.pipe(ma, exports.chain(f));
	  };

	  var reduce_ = function reduce_(fa, b, f) {
	    return _function.pipe(fa, exports.reduce(b, f));
	  };

	  var foldMap_ = function foldMap_(M) {
	    var foldMapM = exports.foldMap(M);
	    return function (fa, f) {
	      return _function.pipe(fa, foldMapM(f));
	    };
	  };

	  var reduceRight_ = function reduceRight_(fa, b, f) {
	    return _function.pipe(fa, exports.reduceRight(b, f));
	  };

	  var traverse_ = function traverse_(F) {
	    var traverseF = exports.traverse(F);
	    return function (ta, f) {
	      return _function.pipe(ta, traverseF(f));
	    };
	  };
	  /* istanbul ignore next */


	  var alt_ = function alt_(fa, that) {
	    return _function.pipe(fa, exports.alt(that));
	  };
	  /* istanbul ignore next */


	  var filter_ = function filter_(fa, predicate) {
	    return _function.pipe(fa, exports.filter(predicate));
	  };
	  /* istanbul ignore next */


	  var filterMap_ = function filterMap_(fa, f) {
	    return _function.pipe(fa, exports.filterMap(f));
	  };
	  /* istanbul ignore next */


	  var extend_ = function extend_(wa, f) {
	    return _function.pipe(wa, exports.extend(f));
	  };
	  /* istanbul ignore next */


	  var partition_ = function partition_(fa, predicate) {
	    return _function.pipe(fa, exports.partition(predicate));
	  };
	  /* istanbul ignore next */


	  var partitionMap_ = function partitionMap_(fa, f) {
	    return _function.pipe(fa, exports.partitionMap(f));
	  };
	  /* istanbul ignore next */


	  var wither_ = function wither_(F) {
	    var witherF = exports.wither(F);
	    return function (fa, f) {
	      return _function.pipe(fa, witherF(f));
	    };
	  };
	  /* istanbul ignore next */


	  var wilt_ = function wilt_(F) {
	    var wiltF = exports.wilt(F);
	    return function (fa, f) {
	      return _function.pipe(fa, wiltF(f));
	    };
	  }; // -------------------------------------------------------------------------------------
	  // pipeables
	  // -------------------------------------------------------------------------------------

	  /**
	   * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
	   * use the type constructor `F` to represent some computational context.
	   *
	   * @category Functor
	   * @since 2.0.0
	   */


	  exports.map = function (f) {
	    return function (fa) {
	      return exports.isNone(fa) ? exports.none : exports.some(f(fa.value));
	    };
	  };
	  /**
	   * Apply a function to an argument under a type constructor.
	   *
	   * @category Apply
	   * @since 2.0.0
	   */


	  exports.ap = function (fa) {
	    return function (fab) {
	      return exports.isNone(fab) ? exports.none : exports.isNone(fa) ? exports.none : exports.some(fab.value(fa.value));
	    };
	  };
	  /**
	   * Combine two effectful actions, keeping only the result of the first.
	   *
	   * Derivable from `Apply`.
	   *
	   * @category combinators
	   * @since 2.0.0
	   */


	  exports.apFirst = function (fb) {
	    return _function.flow(exports.map(function (a) {
	      return function () {
	        return a;
	      };
	    }), exports.ap(fb));
	  };
	  /**
	   * Combine two effectful actions, keeping only the result of the second.
	   *
	   * Derivable from `Apply`.
	   *
	   * @category combinators
	   * @since 2.0.0
	   */


	  exports.apSecond = function (fb) {
	    return _function.flow(exports.map(function () {
	      return function (b) {
	        return b;
	      };
	    }), exports.ap(fb));
	  };
	  /**
	   * Wrap a value into the type constructor.
	   *
	   * @category Applicative
	   * @since 2.7.0
	   */


	  exports.of = exports.some;
	  /**
	   * Composes computations in sequence, using the return value of one computation to determine the next computation.
	   *
	   * @category Monad
	   * @since 2.0.0
	   */

	  exports.chain = function (f) {
	    return function (ma) {
	      return exports.isNone(ma) ? exports.none : f(ma.value);
	    };
	  };
	  /**
	   * Composes computations in sequence, using the return value of one computation to determine the next computation and
	   * keeping only the result of the first.
	   *
	   * Derivable from `Monad`.
	   *
	   * @category combinators
	   * @since 2.0.0
	   */


	  exports.chainFirst = function (f) {
	    return exports.chain(function (a) {
	      return _function.pipe(f(a), exports.map(function () {
	        return a;
	      }));
	    });
	  };
	  /**
	   * Derivable from `Monad`.
	   *
	   * @category combinators
	   * @since 2.0.0
	   */


	  exports.flatten = /*#__PURE__*/exports.chain(_function.identity);
	  /**
	   * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
	   * types of kind `* -> *`.
	   *
	   * In case of `Option` returns the left-most non-`None` value.
	   *
	   * @example
	   * import * as O from 'fp-ts/Option'
	   * import { pipe } from 'fp-ts/function'
	   *
	   * assert.deepStrictEqual(
	   *   pipe(
	   *     O.some('a'),
	   *     O.alt(() => O.some('b'))
	   *   ),
	   *   O.some('a')
	   * )
	   * assert.deepStrictEqual(
	   *   pipe(
	   *     O.none,
	   *     O.alt(() => O.some('b'))
	   *   ),
	   *   O.some('b')
	   * )
	   *
	   * @category Alt
	   * @since 2.0.0
	   */

	  exports.alt = function (that) {
	    return function (fa) {
	      return exports.isNone(fa) ? that() : fa;
	    };
	  };
	  /**
	   * @category Alternative
	   * @since 2.7.0
	   */


	  exports.zero = function () {
	    return exports.none;
	  };
	  /**
	   * @category MonadThrow
	   * @since 2.7.0
	   */


	  exports.throwError = function () {
	    return exports.none;
	  };
	  /**
	   * @category Extend
	   * @since 2.0.0
	   */


	  exports.extend = function (f) {
	    return function (wa) {
	      return exports.isNone(wa) ? exports.none : exports.some(f(wa));
	    };
	  };
	  /**
	   * Derivable from `Extend`.
	   *
	   * @category combinators
	   * @since 2.0.0
	   */


	  exports.duplicate = /*#__PURE__*/exports.extend(_function.identity);
	  /**
	   * @category Foldable
	   * @since 2.0.0
	   */

	  exports.reduce = function (b, f) {
	    return function (fa) {
	      return exports.isNone(fa) ? b : f(b, fa.value);
	    };
	  };
	  /**
	   * @category Foldable
	   * @since 2.0.0
	   */


	  exports.foldMap = function (M) {
	    return function (f) {
	      return function (fa) {
	        return exports.isNone(fa) ? M.empty : f(fa.value);
	      };
	    };
	  };
	  /**
	   * @category Foldable
	   * @since 2.0.0
	   */


	  exports.reduceRight = function (b, f) {
	    return function (fa) {
	      return exports.isNone(fa) ? b : f(fa.value, b);
	    };
	  };
	  /**
	   * @category Compactable
	   * @since 2.0.0
	   */


	  exports.compact = exports.flatten;
	  var defaultSeparate = {
	    left: exports.none,
	    right: exports.none
	  };
	  /**
	   * @category Compactable
	   * @since 2.0.0
	   */

	  exports.separate = function (ma) {
	    var o = _function.pipe(ma, exports.map(function (e) {
	      return {
	        left: getLeft(e),
	        right: getRight(e)
	      };
	    }));
	    return exports.isNone(o) ? defaultSeparate : o.value;
	  };
	  /**
	   * @category Filterable
	   * @since 2.0.0
	   */


	  exports.filter = function (predicate) {
	    return function (fa) {
	      return exports.isNone(fa) ? exports.none : predicate(fa.value) ? fa : exports.none;
	    };
	  };
	  /**
	   * @category Filterable
	   * @since 2.0.0
	   */


	  exports.filterMap = function (f) {
	    return function (fa) {
	      return exports.isNone(fa) ? exports.none : f(fa.value);
	    };
	  };
	  /**
	   * @category Filterable
	   * @since 2.0.0
	   */


	  exports.partition = function (predicate) {
	    return function (fa) {
	      return {
	        left: _function.pipe(fa, exports.filter(function (a) {
	          return !predicate(a);
	        })),
	        right: _function.pipe(fa, exports.filter(predicate))
	      };
	    };
	  };
	  /**
	   * @category Filterable
	   * @since 2.0.0
	   */


	  exports.partitionMap = function (f) {
	    return function (fa) {
	      return exports.separate(_function.pipe(fa, exports.map(f)));
	    };
	  };
	  /**
	   * @category Traversable
	   * @since 2.6.3
	   */


	  exports.traverse = function (F) {
	    return function (f) {
	      return function (ta) {
	        return exports.isNone(ta) ? F.of(exports.none) : F.map(f(ta.value), exports.some);
	      };
	    };
	  };
	  /**
	   * @category Traversable
	   * @since 2.6.3
	   */


	  exports.sequence = function (F) {
	    return function (ta) {
	      return exports.isNone(ta) ? F.of(exports.none) : F.map(ta.value, exports.some);
	    };
	  };
	  /**
	   * @category Witherable
	   * @since 2.6.5
	   */


	  exports.wither = function (F) {
	    return function (f) {
	      return function (fa) {
	        return exports.isNone(fa) ? F.of(exports.none) : f(fa.value);
	      };
	    };
	  };
	  /**
	   * @category Witherable
	   * @since 2.6.5
	   */


	  exports.wilt = function (F) {
	    return function (f) {
	      return function (fa) {
	        var o = _function.pipe(fa, exports.map(function (a) {
	          return F.map(f(a), function (e) {
	            return {
	              left: getLeft(e),
	              right: getRight(e)
	            };
	          });
	        }));
	        return exports.isNone(o) ? F.of({
	          left: exports.none,
	          right: exports.none
	        }) : o.value;
	      };
	    };
	  }; // -------------------------------------------------------------------------------------
	  // instances
	  // -------------------------------------------------------------------------------------

	  /**
	   * @category instances
	   * @since 2.0.0
	   */


	  exports.URI = 'Option';
	  /**
	   * @category instances
	   * @since 2.0.0
	   */

	  function getShow(S) {
	    return {
	      show: function show(ma) {
	        return exports.isNone(ma) ? 'none' : "some(" + S.show(ma.value) + ")";
	      }
	    };
	  }

	  exports.getShow = getShow;
	  /**
	   * @example
	   * import { none, some, getEq } from 'fp-ts/Option'
	   * import { eqNumber } from 'fp-ts/Eq'
	   *
	   * const E = getEq(eqNumber)
	   * assert.strictEqual(E.equals(none, none), true)
	   * assert.strictEqual(E.equals(none, some(1)), false)
	   * assert.strictEqual(E.equals(some(1), none), false)
	   * assert.strictEqual(E.equals(some(1), some(2)), false)
	   * assert.strictEqual(E.equals(some(1), some(1)), true)
	   *
	   * @category instances
	   * @since 2.0.0
	   */

	  function getEq(E) {
	    return {
	      equals: function equals(x, y) {
	        return x === y || (exports.isNone(x) ? exports.isNone(y) : exports.isNone(y) ? false : E.equals(x.value, y.value));
	      }
	    };
	  }

	  exports.getEq = getEq;
	  /**
	   * The `Ord` instance allows `Option` values to be compared with
	   * `compare`, whenever there is an `Ord` instance for
	   * the type the `Option` contains.
	   *
	   * `None` is considered to be less than any `Some` value.
	   *
	   *
	   * @example
	   * import { none, some, getOrd } from 'fp-ts/Option'
	   * import { ordNumber } from 'fp-ts/Ord'
	   *
	   * const O = getOrd(ordNumber)
	   * assert.strictEqual(O.compare(none, none), 0)
	   * assert.strictEqual(O.compare(none, some(1)), -1)
	   * assert.strictEqual(O.compare(some(1), none), 1)
	   * assert.strictEqual(O.compare(some(1), some(2)), -1)
	   * assert.strictEqual(O.compare(some(1), some(1)), 0)
	   *
	   * @category instances
	   * @since 2.0.0
	   */

	  function getOrd(O) {
	    return {
	      equals: getEq(O).equals,
	      compare: function compare(x, y) {
	        return x === y ? 0 : exports.isSome(x) ? exports.isSome(y) ? O.compare(x.value, y.value) : 1 : -1;
	      }
	    };
	  }

	  exports.getOrd = getOrd;
	  /**
	   * `Apply` semigroup
	   *
	   * | x       | y       | concat(x, y)       |
	   * | ------- | ------- | ------------------ |
	   * | none    | none    | none               |
	   * | some(a) | none    | none               |
	   * | none    | some(a) | none               |
	   * | some(a) | some(b) | some(concat(a, b)) |
	   *
	   * @example
	   * import { getApplySemigroup, some, none } from 'fp-ts/Option'
	   * import { semigroupSum } from 'fp-ts/Semigroup'
	   *
	   * const S = getApplySemigroup(semigroupSum)
	   * assert.deepStrictEqual(S.concat(none, none), none)
	   * assert.deepStrictEqual(S.concat(some(1), none), none)
	   * assert.deepStrictEqual(S.concat(none, some(1)), none)
	   * assert.deepStrictEqual(S.concat(some(1), some(2)), some(3))
	   *
	   * @category instances
	   * @since 2.0.0
	   */

	  function getApplySemigroup(S) {
	    return {
	      concat: function concat(x, y) {
	        return exports.isSome(x) && exports.isSome(y) ? exports.some(S.concat(x.value, y.value)) : exports.none;
	      }
	    };
	  }

	  exports.getApplySemigroup = getApplySemigroup;
	  /**
	   * @category instances
	   * @since 2.0.0
	   */

	  function getApplyMonoid(M) {
	    return {
	      concat: getApplySemigroup(M).concat,
	      empty: exports.some(M.empty)
	    };
	  }

	  exports.getApplyMonoid = getApplyMonoid;
	  /**
	   * Monoid returning the left-most non-`None` value
	   *
	   * | x       | y       | concat(x, y) |
	   * | ------- | ------- | ------------ |
	   * | none    | none    | none         |
	   * | some(a) | none    | some(a)      |
	   * | none    | some(a) | some(a)      |
	   * | some(a) | some(b) | some(a)      |
	   *
	   * @example
	   * import { getFirstMonoid, some, none } from 'fp-ts/Option'
	   *
	   * const M = getFirstMonoid<number>()
	   * assert.deepStrictEqual(M.concat(none, none), none)
	   * assert.deepStrictEqual(M.concat(some(1), none), some(1))
	   * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
	   * assert.deepStrictEqual(M.concat(some(1), some(2)), some(1))
	   *
	   * @category instances
	   * @since 2.0.0
	   */

	  function getFirstMonoid() {
	    return {
	      concat: function concat(x, y) {
	        return exports.isNone(x) ? y : x;
	      },
	      empty: exports.none
	    };
	  }

	  exports.getFirstMonoid = getFirstMonoid;
	  /**
	   * Monoid returning the right-most non-`None` value
	   *
	   * | x       | y       | concat(x, y) |
	   * | ------- | ------- | ------------ |
	   * | none    | none    | none         |
	   * | some(a) | none    | some(a)      |
	   * | none    | some(a) | some(a)      |
	   * | some(a) | some(b) | some(b)      |
	   *
	   * @example
	   * import { getLastMonoid, some, none } from 'fp-ts/Option'
	   *
	   * const M = getLastMonoid<number>()
	   * assert.deepStrictEqual(M.concat(none, none), none)
	   * assert.deepStrictEqual(M.concat(some(1), none), some(1))
	   * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
	   * assert.deepStrictEqual(M.concat(some(1), some(2)), some(2))
	   *
	   * @category instances
	   * @since 2.0.0
	   */

	  function getLastMonoid() {
	    return {
	      concat: function concat(x, y) {
	        return exports.isNone(y) ? x : y;
	      },
	      empty: exports.none
	    };
	  }

	  exports.getLastMonoid = getLastMonoid;
	  /**
	   * Monoid returning the left-most non-`None` value. If both operands are `Some`s then the inner values are
	   * concatenated using the provided `Semigroup`
	   *
	   * | x       | y       | concat(x, y)       |
	   * | ------- | ------- | ------------------ |
	   * | none    | none    | none               |
	   * | some(a) | none    | some(a)            |
	   * | none    | some(a) | some(a)            |
	   * | some(a) | some(b) | some(concat(a, b)) |
	   *
	   * @example
	   * import { getMonoid, some, none } from 'fp-ts/Option'
	   * import { semigroupSum } from 'fp-ts/Semigroup'
	   *
	   * const M = getMonoid(semigroupSum)
	   * assert.deepStrictEqual(M.concat(none, none), none)
	   * assert.deepStrictEqual(M.concat(some(1), none), some(1))
	   * assert.deepStrictEqual(M.concat(none, some(1)), some(1))
	   * assert.deepStrictEqual(M.concat(some(1), some(2)), some(3))
	   *
	   * @category instances
	   * @since 2.0.0
	   */

	  function getMonoid(S) {
	    return {
	      concat: function concat(x, y) {
	        return exports.isNone(x) ? y : exports.isNone(y) ? x : exports.some(S.concat(x.value, y.value));
	      },
	      empty: exports.none
	    };
	  }

	  exports.getMonoid = getMonoid;
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Functor = {
	    URI: exports.URI,
	    map: map_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Applicative = {
	    URI: exports.URI,
	    map: map_,
	    ap: ap_,
	    of: exports.of
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Monad = {
	    URI: exports.URI,
	    map: map_,
	    ap: ap_,
	    of: exports.of,
	    chain: chain_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Foldable = {
	    URI: exports.URI,
	    reduce: reduce_,
	    foldMap: foldMap_,
	    reduceRight: reduceRight_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Alt = {
	    URI: exports.URI,
	    map: map_,
	    alt: alt_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Alternative = {
	    URI: exports.URI,
	    map: map_,
	    ap: ap_,
	    of: exports.of,
	    alt: alt_,
	    zero: exports.zero
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Extend = {
	    URI: exports.URI,
	    map: map_,
	    extend: extend_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Compactable = {
	    URI: exports.URI,
	    compact: exports.compact,
	    separate: exports.separate
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Filterable = {
	    URI: exports.URI,
	    map: map_,
	    compact: exports.compact,
	    separate: exports.separate,
	    filter: filter_,
	    filterMap: filterMap_,
	    partition: partition_,
	    partitionMap: partitionMap_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Traversable = {
	    URI: exports.URI,
	    map: map_,
	    reduce: reduce_,
	    foldMap: foldMap_,
	    reduceRight: reduceRight_,
	    traverse: traverse_,
	    sequence: exports.sequence
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Witherable = {
	    URI: exports.URI,
	    map: map_,
	    reduce: reduce_,
	    foldMap: foldMap_,
	    reduceRight: reduceRight_,
	    traverse: traverse_,
	    sequence: exports.sequence,
	    compact: exports.compact,
	    separate: exports.separate,
	    filter: filter_,
	    filterMap: filterMap_,
	    partition: partition_,
	    partitionMap: partitionMap_,
	    wither: wither_,
	    wilt: wilt_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.MonadThrow = {
	    URI: exports.URI,
	    map: map_,
	    ap: ap_,
	    of: exports.of,
	    chain: chain_,
	    throwError: exports.throwError
	  }; // TODO: remove in v3

	  /**
	   * @category instances
	   * @since 2.0.0
	   */

	  exports.option = {
	    URI: exports.URI,
	    map: map_,
	    of: exports.of,
	    ap: ap_,
	    chain: chain_,
	    reduce: reduce_,
	    foldMap: foldMap_,
	    reduceRight: reduceRight_,
	    traverse: traverse_,
	    sequence: exports.sequence,
	    zero: exports.zero,
	    alt: alt_,
	    extend: extend_,
	    compact: exports.compact,
	    separate: exports.separate,
	    filter: filter_,
	    filterMap: filterMap_,
	    partition: partition_,
	    partitionMap: partitionMap_,
	    wither: wither_,
	    wilt: wilt_,
	    throwError: exports.throwError
	  }; // -------------------------------------------------------------------------------------
	  // utils
	  // -------------------------------------------------------------------------------------

	  /**
	   * Returns `true` if `ma` contains `a`
	   *
	   * @example
	   * import { some, none, elem } from 'fp-ts/Option'
	   * import { eqNumber } from 'fp-ts/Eq'
	   *
	   * assert.strictEqual(elem(eqNumber)(1, some(1)), true)
	   * assert.strictEqual(elem(eqNumber)(2, some(1)), false)
	   * assert.strictEqual(elem(eqNumber)(1, none), false)
	   *
	   * @since 2.0.0
	   */

	  function elem(E) {
	    return function (a, ma) {
	      return exports.isNone(ma) ? false : E.equals(a, ma.value);
	    };
	  }

	  exports.elem = elem;
	  /**
	   * Returns `true` if the predicate is satisfied by the wrapped value
	   *
	   * @example
	   * import { some, none, exists } from 'fp-ts/Option'
	   * import { pipe } from 'fp-ts/function'
	   *
	   * assert.strictEqual(
	   *   pipe(
	   *     some(1),
	   *     exists(n => n > 0)
	   *   ),
	   *   true
	   * )
	   * assert.strictEqual(
	   *   pipe(
	   *     some(1),
	   *     exists(n => n > 1)
	   *   ),
	   *   false
	   * )
	   * assert.strictEqual(
	   *   pipe(
	   *     none,
	   *     exists(n => n > 0)
	   *   ),
	   *   false
	   * )
	   *
	   * @since 2.0.0
	   */

	  function exists(predicate) {
	    return function (ma) {
	      return exports.isNone(ma) ? false : predicate(ma.value);
	    };
	  }

	  exports.exists = exists;
	  /**
	   * Returns a `Refinement` (i.e. a custom type guard) from a `Option` returning function.
	   * This function ensures that a custom type guard definition is type-safe.
	   *
	   * ```ts
	   * import { some, none, getRefinement } from 'fp-ts/Option'
	   *
	   * type A = { type: 'A' }
	   * type B = { type: 'B' }
	   * type C = A | B
	   *
	   * const isA = (c: C): c is A => c.type === 'B' // <= typo but typescript doesn't complain
	   * const isA = getRefinement<C, A>(c => (c.type === 'B' ? some(c) : none)) // static error: Type '"B"' is not assignable to type '"A"'
	   * ```
	   *
	   * @since 2.0.0
	   */

	  function getRefinement(getOption) {
	    return function (a) {
	      return exports.isSome(getOption(a));
	    };
	  }

	  exports.getRefinement = getRefinement; // -------------------------------------------------------------------------------------
	  // do notation
	  // -------------------------------------------------------------------------------------

	  /**
	   * @since 2.8.0
	   */

	  exports.bindTo = function (name) {
	    return exports.map(_function.bindTo_(name));
	  };
	  /**
	   * @since 2.8.0
	   */


	  exports.bind = function (name, f) {
	    return exports.chain(function (a) {
	      return _function.pipe(f(a), exports.map(function (b) {
	        return _function.bind_(a, name, b);
	      }));
	    });
	  }; // -------------------------------------------------------------------------------------
	  // pipeable sequence S
	  // -------------------------------------------------------------------------------------

	  /**
	   * @since 2.8.0
	   */


	  exports.apS = function (name, fb) {
	    return _function.flow(exports.map(function (a) {
	      return function (b) {
	        return _function.bind_(a, name, b);
	      };
	    }), exports.ap(fb));
	  };
	});

	var Ordering = /*#__PURE__*/createCommonjsModule(function (module, exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.invert = exports.monoidOrdering = exports.semigroupOrdering = exports.eqOrdering = exports.sign = void 0;
	  /**
	   * @since 2.0.0
	   */

	  function sign(n) {
	    return n <= -1 ? -1 : n >= 1 ? 1 : 0;
	  }

	  exports.sign = sign;
	  /**
	   * @category instances
	   * @since 2.0.0
	   */

	  exports.eqOrdering = {
	    equals: function equals(x, y) {
	      return x === y;
	    }
	  };
	  /**
	   * Use `monoidOrdering` instead
	   *
	   * @category instances
	   * @since 2.0.0
	   * @deprecated
	   */

	  exports.semigroupOrdering = {
	    concat: function concat(x, y) {
	      return x !== 0 ? x : y;
	    }
	  };
	  /**
	   * @category instances
	   * @since 2.4.0
	   */

	  exports.monoidOrdering = {
	    // tslint:disable-next-line: deprecation
	    concat: exports.semigroupOrdering.concat,
	    empty: 0
	  };
	  /**
	   * @since 2.0.0
	   */

	  function invert(O) {
	    switch (O) {
	      case -1:
	        return 1;

	      case 1:
	        return -1;

	      default:
	        return 0;
	    }
	  }

	  exports.invert = invert;
	});

	var Ord = /*#__PURE__*/createCommonjsModule(function (module, exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.ord = exports.Contravariant = exports.ordDate = exports.URI = exports.contramap = exports.getDualOrd = exports.getTupleOrd = exports.getMonoid = exports.getSemigroup = exports.fromCompare = exports.between = exports.clamp = exports.max = exports.min = exports.geq = exports.leq = exports.gt = exports.lt = exports.ordBoolean = exports.ordNumber = exports.ordString = void 0; // default compare for primitive types

	  function compare(x, y) {
	    return x < y ? -1 : x > y ? 1 : 0;
	  }

	  function strictEqual(a, b) {
	    return a === b;
	  }
	  /**
	   * @category instances
	   * @since 2.0.0
	   */


	  exports.ordString = {
	    equals: strictEqual,
	    compare: compare
	  };
	  /**
	   * @category instances
	   * @since 2.0.0
	   */

	  exports.ordNumber = {
	    equals: strictEqual,
	    compare: compare
	  };
	  /**
	   * @category instances
	   * @since 2.0.0
	   */

	  exports.ordBoolean = {
	    equals: strictEqual,
	    compare: compare
	  }; // TODO: curry in v3

	  /**
	   * Test whether one value is _strictly less than_ another
	   *
	   * @since 2.0.0
	   */

	  function lt(O) {
	    return function (x, y) {
	      return O.compare(x, y) === -1;
	    };
	  }

	  exports.lt = lt; // TODO: curry in v3

	  /**
	   * Test whether one value is _strictly greater than_ another
	   *
	   * @since 2.0.0
	   */

	  function gt(O) {
	    return function (x, y) {
	      return O.compare(x, y) === 1;
	    };
	  }

	  exports.gt = gt; // TODO: curry in v3

	  /**
	   * Test whether one value is _non-strictly less than_ another
	   *
	   * @since 2.0.0
	   */

	  function leq(O) {
	    return function (x, y) {
	      return O.compare(x, y) !== 1;
	    };
	  }

	  exports.leq = leq; // TODO: curry in v3

	  /**
	   * Test whether one value is _non-strictly greater than_ another
	   *
	   * @since 2.0.0
	   */

	  function geq(O) {
	    return function (x, y) {
	      return O.compare(x, y) !== -1;
	    };
	  }

	  exports.geq = geq; // TODO: curry in v3

	  /**
	   * Take the minimum of two values. If they are considered equal, the first argument is chosen
	   *
	   * @since 2.0.0
	   */

	  function min(O) {
	    return function (x, y) {
	      return O.compare(x, y) === 1 ? y : x;
	    };
	  }

	  exports.min = min; // TODO: curry in v3

	  /**
	   * Take the maximum of two values. If they are considered equal, the first argument is chosen
	   *
	   * @since 2.0.0
	   */

	  function max(O) {
	    return function (x, y) {
	      return O.compare(x, y) === -1 ? y : x;
	    };
	  }

	  exports.max = max;
	  /**
	   * Clamp a value between a minimum and a maximum
	   *
	   * @since 2.0.0
	   */

	  function clamp(O) {
	    var minO = min(O);
	    var maxO = max(O);
	    return function (low, hi) {
	      return function (x) {
	        return maxO(minO(x, hi), low);
	      };
	    };
	  }

	  exports.clamp = clamp;
	  /**
	   * Test whether a value is between a minimum and a maximum (inclusive)
	   *
	   * @since 2.0.0
	   */

	  function between(O) {
	    var lessThanO = lt(O);
	    var greaterThanO = gt(O);
	    return function (low, hi) {
	      return function (x) {
	        return lessThanO(x, low) || greaterThanO(x, hi) ? false : true;
	      };
	    };
	  }

	  exports.between = between;
	  /**
	   * @category constructors
	   * @since 2.0.0
	   */

	  function fromCompare(compare) {
	    var optimizedCompare = function optimizedCompare(x, y) {
	      return x === y ? 0 : compare(x, y);
	    };

	    return {
	      equals: function equals(x, y) {
	        return optimizedCompare(x, y) === 0;
	      },
	      compare: optimizedCompare
	    };
	  }

	  exports.fromCompare = fromCompare;
	  /**
	   * Use `getMonoid` instead
	   *
	   * @category instances
	   * @since 2.0.0
	   * @deprecated
	   */

	  function getSemigroup() {
	    return {
	      concat: function concat(x, y) {
	        return fromCompare(function (a, b) {
	          return Ordering.monoidOrdering.concat(x.compare(a, b), y.compare(a, b));
	        });
	      }
	    };
	  }

	  exports.getSemigroup = getSemigroup;
	  /**
	   * Returns a `Monoid` such that:
	   *
	   * - its `concat(ord1, ord2)` operation will order first by `ord1`, and then by `ord2`
	   * - its `empty` value is an `Ord` that always considers compared elements equal
	   *
	   * @example
	   * import { sort } from 'fp-ts/Array'
	   * import { contramap, getDualOrd, getMonoid, ordBoolean, ordNumber, ordString } from 'fp-ts/Ord'
	   * import { pipe } from 'fp-ts/function'
	   * import { fold } from 'fp-ts/Monoid'
	   *
	   * interface User {
	   *   id: number
	   *   name: string
	   *   age: number
	   *   rememberMe: boolean
	   * }
	   *
	   * const byName = pipe(
	   *   ordString,
	   *   contramap((p: User) => p.name)
	   * )
	   *
	   * const byAge = pipe(
	   *   ordNumber,
	   *   contramap((p: User) => p.age)
	   * )
	   *
	   * const byRememberMe = pipe(
	   *   ordBoolean,
	   *   contramap((p: User) => p.rememberMe)
	   * )
	   *
	   * const M = getMonoid<User>()
	   *
	   * const users: Array<User> = [
	   *   { id: 1, name: 'Guido', age: 47, rememberMe: false },
	   *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
	   *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
	   *   { id: 4, name: 'Giulio', age: 44, rememberMe: true }
	   * ]
	   *
	   * // sort by name, then by age, then by `rememberMe`
	   * const O1 = fold(M)([byName, byAge, byRememberMe])
	   * assert.deepStrictEqual(sort(O1)(users), [
	   *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
	   *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
	   *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
	   *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
	   * ])
	   *
	   * // now `rememberMe = true` first, then by name, then by age
	   * const O2 = fold(M)([getDualOrd(byRememberMe), byName, byAge])
	   * assert.deepStrictEqual(sort(O2)(users), [
	   *   { id: 4, name: 'Giulio', age: 44, rememberMe: true },
	   *   { id: 2, name: 'Guido', age: 46, rememberMe: true },
	   *   { id: 3, name: 'Giulio', age: 44, rememberMe: false },
	   *   { id: 1, name: 'Guido', age: 47, rememberMe: false }
	   * ])
	   *
	   * @category instances
	   * @since 2.4.0
	   */

	  function getMonoid() {
	    return {
	      // tslint:disable-next-line: deprecation
	      concat: getSemigroup().concat,
	      empty: fromCompare(function () {
	        return 0;
	      })
	    };
	  }

	  exports.getMonoid = getMonoid;
	  /**
	   * Given a tuple of `Ord`s returns an `Ord` for the tuple
	   *
	   * @example
	   * import { getTupleOrd, ordString, ordNumber, ordBoolean } from 'fp-ts/Ord'
	   *
	   * const O = getTupleOrd(ordString, ordNumber, ordBoolean)
	   * assert.strictEqual(O.compare(['a', 1, true], ['b', 2, true]), -1)
	   * assert.strictEqual(O.compare(['a', 1, true], ['a', 2, true]), -1)
	   * assert.strictEqual(O.compare(['a', 1, true], ['a', 1, false]), 1)
	   *
	   * @category instances
	   * @since 2.0.0
	   */

	  function getTupleOrd() {
	    var ords = [];

	    for (var _i = 0; _i < arguments.length; _i++) {
	      ords[_i] = arguments[_i];
	    }

	    var len = ords.length;
	    return fromCompare(function (x, y) {
	      var i = 0;

	      for (; i < len - 1; i++) {
	        var r = ords[i].compare(x[i], y[i]);

	        if (r !== 0) {
	          return r;
	        }
	      }

	      return ords[i].compare(x[i], y[i]);
	    });
	  }

	  exports.getTupleOrd = getTupleOrd;
	  /**
	   * @category combinators
	   * @since 2.0.0
	   */

	  function getDualOrd(O) {
	    return fromCompare(function (x, y) {
	      return O.compare(y, x);
	    });
	  }

	  exports.getDualOrd = getDualOrd; // -------------------------------------------------------------------------------------
	  // non-pipeables
	  // -------------------------------------------------------------------------------------

	  /* istanbul ignore next */

	  var contramap_ = function contramap_(fa, f) {
	    return _function.pipe(fa, exports.contramap(f));
	  }; // -------------------------------------------------------------------------------------
	  // pipeables
	  // -------------------------------------------------------------------------------------

	  /**
	   * @category Contravariant
	   * @since 2.0.0
	   */


	  exports.contramap = function (f) {
	    return function (fa) {
	      return fromCompare(function (x, y) {
	        return fa.compare(f(x), f(y));
	      });
	    };
	  }; // -------------------------------------------------------------------------------------
	  // instances
	  // -------------------------------------------------------------------------------------

	  /**
	   * @category instances
	   * @since 2.0.0
	   */


	  exports.URI = 'Ord';
	  /**
	   * @category instances
	   * @since 2.0.0
	   */

	  exports.ordDate = /*#__PURE__*/_function.pipe(exports.ordNumber, exports.contramap(function (date) {
	    return date.valueOf();
	  }));
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Contravariant = {
	    URI: exports.URI,
	    contramap: contramap_
	  }; // TODO: remove in v3

	  /**
	   * @category instances
	   * @since 2.0.0
	   */

	  exports.ord = exports.Contravariant;
	});

	var ReadonlyArray = /*#__PURE__*/createCommonjsModule(function (module, exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.apS = exports.bind = exports.bindTo = exports.empty = exports.unsafeDeleteAt = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.readonlyArray = exports.Witherable = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.FilterableWithIndex = exports.Filterable = exports.Compactable = exports.Extend = exports.Alternative = exports.Alt = exports.Unfoldable = exports.Monad = exports.Applicative = exports.FunctorWithIndex = exports.Functor = exports.URI = exports.unfold = exports.wilt = exports.wither = exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.reduceRight = exports.reduceWithIndex = exports.foldMap = exports.reduce = exports.foldMapWithIndex = exports.duplicate = exports.extend = exports.filterWithIndex = exports.partitionMapWithIndex = exports.partitionMap = exports.partitionWithIndex = exports.partition = exports.compact = exports.filterMap = exports.filterMapWithIndex = exports.filter = exports.separate = exports.mapWithIndex = exports.map = exports.chainFirst = exports.chainWithIndex = exports.chain = exports.apSecond = exports.apFirst = exports.ap = exports.alt = exports.zero = exports.of = exports.difference = exports.intersection = exports.union = exports.comprehension = exports.chunksOf = exports.splitAt = exports.chop = exports.sortBy = exports.uniq = exports.elem = exports.rotate = exports.unzip = exports.zip = exports.zipWith = exports.sort = exports.lefts = exports.rights = exports.reverse = exports.modifyAt = exports.deleteAt = exports.updateAt = exports.insertAt = exports.findLastIndex = exports.findLastMap = exports.findLast = exports.findFirstMap = exports.findFirst = exports.findIndex = exports.dropLeftWhile = exports.dropRight = exports.dropLeft = exports.spanLeft = exports.takeLeftWhile = exports.takeRight = exports.takeLeft = exports.init = exports.tail = exports.last = exports.head = exports.snoc = exports.cons = exports.lookup = exports.isOutOfBound = exports.isNonEmpty = exports.isEmpty = exports.scanRight = exports.scanLeft = exports.foldRight = exports.foldLeft = exports.flatten = exports.replicate = exports.range = exports.makeBy = exports.getOrd = exports.getEq = exports.getMonoid = exports.getShow = exports.toArray = exports.fromArray = void 0; // -------------------------------------------------------------------------------------
	  // model
	  // -------------------------------------------------------------------------------------

	  /**
	   * @category constructors
	   * @since 2.5.0
	   */
	  // tslint:disable-next-line: readonly-array

	  function fromArray(as) {
	    var l = as.length;

	    if (l === 0) {
	      return exports.empty;
	    }

	    var ras = Array(l);

	    for (var i = 0; i < l; i++) {
	      ras[i] = as[i];
	    }

	    return ras;
	  }

	  exports.fromArray = fromArray;
	  /**
	   * @category destructors
	   * @since 2.5.0
	   */
	  // tslint:disable-next-line: readonly-array

	  function toArray(ras) {
	    var l = ras.length;
	    var as = Array(l);

	    for (var i = 0; i < l; i++) {
	      as[i] = ras[i];
	    }

	    return as;
	  }

	  exports.toArray = toArray;
	  /**
	   * @category instances
	   * @since 2.5.0
	   */

	  function getShow(S) {
	    return {
	      show: function show(as) {
	        return "[" + as.map(S.show).join(', ') + "]";
	      }
	    };
	  }

	  exports.getShow = getShow;

	  var concat = function concat(x, y) {
	    var lenx = x.length;

	    if (lenx === 0) {
	      return y;
	    }

	    var leny = y.length;

	    if (leny === 0) {
	      return x;
	    }

	    var r = Array(lenx + leny);

	    for (var i = 0; i < lenx; i++) {
	      r[i] = x[i];
	    }

	    for (var i = 0; i < leny; i++) {
	      r[i + lenx] = y[i];
	    }

	    return r;
	  };
	  /**
	   * Returns a `Monoid` for `ReadonlyArray<A>`
	   *
	   * @example
	   * import { getMonoid } from 'fp-ts/ReadonlyArray'
	   *
	   * const M = getMonoid<number>()
	   * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
	   *
	   * @category instances
	   * @since 2.5.0
	   */


	  function getMonoid() {
	    return {
	      concat: concat,
	      empty: exports.empty
	    };
	  }

	  exports.getMonoid = getMonoid;
	  /**
	   * Derives an `Eq` over the `ReadonlyArray` of a given element type from the `Eq` of that type. The derived `Eq` defines two
	   * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
	   * different lengths, the result is non equality.
	   *
	   * @example
	   * import { eqString } from 'fp-ts/Eq'
	   * import { getEq } from 'fp-ts/ReadonlyArray'
	   *
	   * const E = getEq(eqString)
	   * assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
	   * assert.strictEqual(E.equals(['a'], []), false)
	   *
	   * @category instances
	   * @since 2.5.0
	   */

	  function getEq(E) {
	    return {
	      equals: function equals(xs, ys) {
	        return xs === ys || xs.length === ys.length && xs.every(function (x, i) {
	          return E.equals(x, ys[i]);
	        });
	      }
	    };
	  }

	  exports.getEq = getEq;
	  /**
	   * Derives an `Ord` over the `ReadonlyArray` of a given element type from the `Ord` of that type. The ordering between two such
	   * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
	   * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
	   * the same length, the result is equality.
	   *
	   * @example
	   * import { getOrd } from 'fp-ts/ReadonlyArray'
	   * import { ordString } from 'fp-ts/Ord'
	   *
	   * const O = getOrd(ordString)
	   * assert.strictEqual(O.compare(['b'], ['a']), 1)
	   * assert.strictEqual(O.compare(['a'], ['a']), 0)
	   * assert.strictEqual(O.compare(['a'], ['b']), -1)
	   *
	   *
	   * @category instances
	   * @since 2.5.0
	   */

	  function getOrd(O) {
	    return Ord.fromCompare(function (a, b) {
	      var aLen = a.length;
	      var bLen = b.length;
	      var len = Math.min(aLen, bLen);

	      for (var i = 0; i < len; i++) {
	        var ordering = O.compare(a[i], b[i]);

	        if (ordering !== 0) {
	          return ordering;
	        }
	      }

	      return Ord.ordNumber.compare(aLen, bLen);
	    });
	  }

	  exports.getOrd = getOrd;
	  /**
	   * Return a list of length `n` with element `i` initialized with `f(i)`
	   *
	   * @example
	   * import { makeBy } from 'fp-ts/ReadonlyArray'
	   *
	   * const double = (n: number): number => n * 2
	   * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
	   *
	   * @category constructors
	   * @since 2.5.0
	   */

	  function makeBy(n, f) {
	    // tslint:disable-next-line: readonly-array
	    var r = [];

	    for (var i = 0; i < n; i++) {
	      r.push(f(i));
	    }

	    return r;
	  }

	  exports.makeBy = makeBy;
	  /**
	   * Create an array containing a range of integers, including both endpoints
	   *
	   * @example
	   * import { range } from 'fp-ts/ReadonlyArray'
	   *
	   * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
	   *
	   * @category constructors
	   * @since 2.5.0
	   */

	  function range(start, end) {
	    return makeBy(end - start + 1, function (i) {
	      return start + i;
	    });
	  }

	  exports.range = range;
	  /**
	   * Create an array containing a value repeated the specified number of times
	   *
	   * @example
	   * import { replicate } from 'fp-ts/ReadonlyArray'
	   *
	   * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
	   *
	   * @category constructors
	   * @since 2.5.0
	   */

	  function replicate(n, a) {
	    return makeBy(n, function () {
	      return a;
	    });
	  }

	  exports.replicate = replicate;
	  /**
	   * Removes one level of nesting
	   *
	   * Derivable from `Monad`.
	   *
	   * @example
	   * import { flatten } from 'fp-ts/ReadonlyArray'
	   *
	   * assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
	   *
	   * @category combinators
	   * @since 2.5.0
	   */

	  function flatten(mma) {
	    var rLen = 0;
	    var len = mma.length;

	    for (var i = 0; i < len; i++) {
	      rLen += mma[i].length;
	    }

	    var r = Array(rLen);
	    var start = 0;

	    for (var i = 0; i < len; i++) {
	      var arr = mma[i];
	      var l = arr.length;

	      for (var j = 0; j < l; j++) {
	        r[j + start] = arr[j];
	      }

	      start += l;
	    }

	    return r;
	  }

	  exports.flatten = flatten;
	  /**
	   * Break an array into its first element and remaining elements
	   *
	   * @example
	   * import { foldLeft } from 'fp-ts/ReadonlyArray'
	   *
	   * const len: <A>(as: ReadonlyArray<A>) => number = foldLeft(() => 0, (_, tail) => 1 + len(tail))
	   * assert.strictEqual(len([1, 2, 3]), 3)
	   *
	   * @category destructors
	   * @since 2.5.0
	   */

	  function foldLeft(onEmpty, onCons) {
	    return function (as) {
	      return isEmpty(as) ? onEmpty() : onCons(as[0], as.slice(1));
	    };
	  }

	  exports.foldLeft = foldLeft;
	  /**
	   * Break an array into its initial elements and the last element
	   *
	   * @category destructors
	   * @since 2.5.0
	   */

	  function foldRight(onEmpty, onCons) {
	    return function (as) {
	      return isEmpty(as) ? onEmpty() : onCons(as.slice(0, as.length - 1), as[as.length - 1]);
	    };
	  }

	  exports.foldRight = foldRight;
	  /**
	   * Same as `reduce` but it carries over the intermediate steps
	   *
	   * ```ts
	   * import { scanLeft } from 'fp-ts/ReadonlyArray'
	   *
	   * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
	   * ```
	   *
	   * @category combinators
	   * @since 2.5.0
	   */

	  function scanLeft(b, f) {
	    return function (as) {
	      var l = as.length; // tslint:disable-next-line: readonly-array

	      var r = new Array(l + 1);
	      r[0] = b;

	      for (var i = 0; i < l; i++) {
	        r[i + 1] = f(r[i], as[i]);
	      }

	      return r;
	    };
	  }

	  exports.scanLeft = scanLeft;
	  /**
	   * Fold an array from the right, keeping all intermediate results instead of only the final result
	   *
	   * @example
	   * import { scanRight } from 'fp-ts/ReadonlyArray'
	   *
	   * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
	   *
	   * @category combinators
	   * @since 2.5.0
	   */

	  function scanRight(b, f) {
	    return function (as) {
	      var l = as.length; // tslint:disable-next-line: readonly-array

	      var r = new Array(l + 1);
	      r[l] = b;

	      for (var i = l - 1; i >= 0; i--) {
	        r[i] = f(as[i], r[i + 1]);
	      }

	      return r;
	    };
	  }

	  exports.scanRight = scanRight;
	  /**
	   * Test whether an array is empty
	   *
	   * @example
	   * import { isEmpty } from 'fp-ts/ReadonlyArray'
	   *
	   * assert.strictEqual(isEmpty([]), true)
	   *
	   * @since 2.5.0
	   */

	  function isEmpty(as) {
	    return as.length === 0;
	  }

	  exports.isEmpty = isEmpty;
	  /**
	   * Test whether an array is non empty narrowing down the type to `NonEmptyReadonlyArray<A>`
	   *
	   * @category guards
	   * @since 2.5.0
	   */

	  function isNonEmpty(as) {
	    return as.length > 0;
	  }

	  exports.isNonEmpty = isNonEmpty;
	  /**
	   * Test whether an array contains a particular index
	   *
	   * @since 2.5.0
	   */

	  function isOutOfBound(i, as) {
	    return i < 0 || i >= as.length;
	  }

	  exports.isOutOfBound = isOutOfBound;

	  function lookup(i, as) {
	    return as === undefined ? function (as) {
	      return lookup(i, as);
	    } : isOutOfBound(i, as) ? Option.none : Option.some(as[i]);
	  }

	  exports.lookup = lookup;

	  function cons(head, tail) {
	    if (tail === undefined) {
	      return function (tail) {
	        return cons(head, tail);
	      };
	    }

	    var len = tail.length;
	    var r = Array(len + 1);

	    for (var i = 0; i < len; i++) {
	      r[i + 1] = tail[i];
	    }

	    r[0] = head;
	    return r;
	  }

	  exports.cons = cons; // TODO: curry and make data-last in v3

	  /**
	   * Append an element to the end of an array, creating a new non empty array
	   *
	   * @example
	   * import { snoc } from 'fp-ts/ReadonlyArray'
	   *
	   * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
	   *
	   * @category constructors
	   * @since 2.5.0
	   */

	  function snoc(init, end) {
	    var len = init.length;
	    var r = Array(len + 1);

	    for (var i = 0; i < len; i++) {
	      r[i] = init[i];
	    }

	    r[len] = end;
	    return r;
	  }

	  exports.snoc = snoc;
	  /**
	   * Get the first element in an array, or `None` if the array is empty
	   *
	   * @example
	   * import { head } from 'fp-ts/ReadonlyArray'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * assert.deepStrictEqual(head([1, 2, 3]), some(1))
	   * assert.deepStrictEqual(head([]), none)
	   *
	   * @since 2.5.0
	   */

	  function head(as) {
	    return isEmpty(as) ? Option.none : Option.some(as[0]);
	  }

	  exports.head = head;
	  /**
	   * Get the last element in an array, or `None` if the array is empty
	   *
	   * @example
	   * import { last } from 'fp-ts/ReadonlyArray'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * assert.deepStrictEqual(last([1, 2, 3]), some(3))
	   * assert.deepStrictEqual(last([]), none)
	   *
	   * @since 2.5.0
	   */

	  function last(as) {
	    return lookup(as.length - 1, as);
	  }

	  exports.last = last;
	  /**
	   * Get all but the first element of an array, creating a new array, or `None` if the array is empty
	   *
	   * @example
	   * import { tail } from 'fp-ts/ReadonlyArray'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
	   * assert.deepStrictEqual(tail([]), none)
	   *
	   * @since 2.5.0
	   */

	  function tail(as) {
	    return isEmpty(as) ? Option.none : Option.some(as.slice(1));
	  }

	  exports.tail = tail;
	  /**
	   * Get all but the last element of an array, creating a new array, or `None` if the array is empty
	   *
	   * @example
	   * import { init } from 'fp-ts/ReadonlyArray'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
	   * assert.deepStrictEqual(init([]), none)
	   *
	   * @since 2.5.0
	   */

	  function init(as) {
	    var len = as.length;
	    return len === 0 ? Option.none : Option.some(as.slice(0, len - 1));
	  }

	  exports.init = init;
	  /**
	   * Keep only a number of elements from the start of an array, creating a new array.
	   * `n` must be a natural number
	   *
	   * @example
	   * import { takeLeft } from 'fp-ts/ReadonlyArray'
	   *
	   * assert.deepStrictEqual(takeLeft(2)([1, 2, 3]), [1, 2])
	   *
	   * @category combinators
	   * @since 2.5.0
	   */

	  function takeLeft(n) {
	    return function (as) {
	      return as.slice(0, n);
	    };
	  }

	  exports.takeLeft = takeLeft;
	  /**
	   * Keep only a number of elements from the end of an array, creating a new array.
	   * `n` must be a natural number
	   *
	   * @example
	   * import { takeRight } from 'fp-ts/ReadonlyArray'
	   *
	   * assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
	   *
	   * @since 2.5.0
	   */

	  function takeRight(n) {
	    return function (as) {
	      return n === 0 ? exports.empty : as.slice(-n);
	    };
	  }

	  exports.takeRight = takeRight;

	  function takeLeftWhile(predicate) {
	    return function (as) {
	      var i = spanIndexUncurry(as, predicate);
	      var init = Array(i);

	      for (var j = 0; j < i; j++) {
	        init[j] = as[j];
	      }

	      return init;
	    };
	  }

	  exports.takeLeftWhile = takeLeftWhile;

	  var spanIndexUncurry = function spanIndexUncurry(as, predicate) {
	    var l = as.length;
	    var i = 0;

	    for (; i < l; i++) {
	      if (!predicate(as[i])) {
	        break;
	      }
	    }

	    return i;
	  };

	  function spanLeft(predicate) {
	    return function (as) {
	      var i = spanIndexUncurry(as, predicate);
	      var init = Array(i);

	      for (var j = 0; j < i; j++) {
	        init[j] = as[j];
	      }

	      var l = as.length;
	      var rest = Array(l - i);

	      for (var j = i; j < l; j++) {
	        rest[j - i] = as[j];
	      }

	      return {
	        init: init,
	        rest: rest
	      };
	    };
	  }

	  exports.spanLeft = spanLeft;
	  /**
	   * Drop a number of elements from the start of an array, creating a new array
	   *
	   * @example
	   * import { dropLeft } from 'fp-ts/ReadonlyArray'
	   *
	   * assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3])
	   *
	   * @category combinators
	   * @since 2.5.0
	   */

	  function dropLeft(n) {
	    return function (as) {
	      return as.slice(n, as.length);
	    };
	  }

	  exports.dropLeft = dropLeft;
	  /**
	   * Drop a number of elements from the end of an array, creating a new array
	   *
	   * @example
	   * import { dropRight } from 'fp-ts/ReadonlyArray'
	   *
	   * assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
	   *
	   * @category combinators
	   * @since 2.5.0
	   */

	  function dropRight(n) {
	    return function (as) {
	      return as.slice(0, as.length - n);
	    };
	  }

	  exports.dropRight = dropRight;
	  /**
	   * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array
	   *
	   * @example
	   * import { dropLeftWhile } from 'fp-ts/ReadonlyArray'
	   *
	   * assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
	   *
	   * @category combinators
	   * @since 2.5.0
	   */

	  function dropLeftWhile(predicate) {
	    return function (as) {
	      var i = spanIndexUncurry(as, predicate);
	      var l = as.length;
	      var rest = Array(l - i);

	      for (var j = i; j < l; j++) {
	        rest[j - i] = as[j];
	      }

	      return rest;
	    };
	  }

	  exports.dropLeftWhile = dropLeftWhile;
	  /**
	   * Find the first index for which a predicate holds
	   *
	   * @example
	   * import { findIndex } from 'fp-ts/ReadonlyArray'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
	   * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
	   *
	   * @since 2.5.0
	   */

	  function findIndex(predicate) {
	    return function (as) {
	      var len = as.length;

	      for (var i = 0; i < len; i++) {
	        if (predicate(as[i])) {
	          return Option.some(i);
	        }
	      }

	      return Option.none;
	    };
	  }

	  exports.findIndex = findIndex;

	  function findFirst(predicate) {
	    return function (as) {
	      var len = as.length;

	      for (var i = 0; i < len; i++) {
	        if (predicate(as[i])) {
	          return Option.some(as[i]);
	        }
	      }

	      return Option.none;
	    };
	  }

	  exports.findFirst = findFirst;
	  /**
	   * Find the first element returned by an option based selector function
	   *
	   * @example
	   * import { findFirstMap } from 'fp-ts/ReadonlyArray'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * interface Person {
	   *   name: string
	   *   age?: number
	   * }
	   *
	   * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
	   *
	   * // returns the name of the first person that has an age
	   * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
	   *
	   * @since 2.5.0
	   */

	  function findFirstMap(f) {
	    return function (as) {
	      var len = as.length;

	      for (var i = 0; i < len; i++) {
	        var v = f(as[i]);

	        if (Option.isSome(v)) {
	          return v;
	        }
	      }

	      return Option.none;
	    };
	  }

	  exports.findFirstMap = findFirstMap;

	  function findLast(predicate) {
	    return function (as) {
	      var len = as.length;

	      for (var i = len - 1; i >= 0; i--) {
	        if (predicate(as[i])) {
	          return Option.some(as[i]);
	        }
	      }

	      return Option.none;
	    };
	  }

	  exports.findLast = findLast;
	  /**
	   * Find the last element returned by an option based selector function
	   *
	   * @example
	   * import { findLastMap } from 'fp-ts/ReadonlyArray'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * interface Person {
	   *   name: string
	   *   age?: number
	   * }
	   *
	   * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
	   *
	   * // returns the name of the last person that has an age
	   * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
	   *
	   * @since 2.5.0
	   */

	  function findLastMap(f) {
	    return function (as) {
	      var len = as.length;

	      for (var i = len - 1; i >= 0; i--) {
	        var v = f(as[i]);

	        if (Option.isSome(v)) {
	          return v;
	        }
	      }

	      return Option.none;
	    };
	  }

	  exports.findLastMap = findLastMap;
	  /**
	   * Returns the index of the last element of the list which matches the predicate
	   *
	   * @example
	   * import { findLastIndex } from 'fp-ts/ReadonlyArray'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * interface X {
	   *   a: number
	   *   b: number
	   * }
	   * const xs: ReadonlyArray<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
	   * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 1)(xs), some(1))
	   * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 4)(xs), none)
	   *
	   *
	   * @since 2.5.0
	   */

	  function findLastIndex(predicate) {
	    return function (as) {
	      var len = as.length;

	      for (var i = len - 1; i >= 0; i--) {
	        if (predicate(as[i])) {
	          return Option.some(i);
	        }
	      }

	      return Option.none;
	    };
	  }

	  exports.findLastIndex = findLastIndex;
	  /**
	   * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
	   *
	   * @example
	   * import { insertAt } from 'fp-ts/ReadonlyArray'
	   * import { some } from 'fp-ts/Option'
	   *
	   * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
	   *
	   * @since 2.5.0
	   */

	  function insertAt(i, a) {
	    return function (as) {
	      return i < 0 || i > as.length ? Option.none : Option.some(unsafeInsertAt(i, a, as));
	    };
	  }

	  exports.insertAt = insertAt;
	  /**
	   * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
	   *
	   * @example
	   * import { updateAt } from 'fp-ts/ReadonlyArray'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
	   * assert.deepStrictEqual(updateAt(1, 1)([]), none)
	   *
	   * @since 2.5.0
	   */

	  function updateAt(i, a) {
	    return function (as) {
	      return isOutOfBound(i, as) ? Option.none : Option.some(unsafeUpdateAt(i, a, as));
	    };
	  }

	  exports.updateAt = updateAt;
	  /**
	   * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
	   *
	   * @example
	   * import { deleteAt } from 'fp-ts/ReadonlyArray'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
	   * assert.deepStrictEqual(deleteAt(1)([]), none)
	   *
	   * @since 2.5.0
	   */

	  function deleteAt(i) {
	    return function (as) {
	      return isOutOfBound(i, as) ? Option.none : Option.some(unsafeDeleteAt(i, as));
	    };
	  }

	  exports.deleteAt = deleteAt;
	  /**
	   * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
	   * of bounds
	   *
	   * @example
	   * import { modifyAt } from 'fp-ts/ReadonlyArray'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * const double = (x: number): number => x * 2
	   * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
	   * assert.deepStrictEqual(modifyAt(1, double)([]), none)
	   *
	   * @since 2.5.0
	   */

	  function modifyAt(i, f) {
	    return function (as) {
	      return isOutOfBound(i, as) ? Option.none : Option.some(unsafeUpdateAt(i, f(as[i]), as));
	    };
	  }

	  exports.modifyAt = modifyAt;
	  /**
	   * Reverse an array, creating a new array
	   *
	   * @example
	   * import { reverse } from 'fp-ts/ReadonlyArray'
	   *
	   * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
	   *
	   * @category combinators
	   * @since 2.5.0
	   */

	  function reverse(as) {
	    if (isEmpty(as)) {
	      return as;
	    }

	    return as.slice().reverse();
	  }

	  exports.reverse = reverse;
	  /**
	   * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
	   *
	   * @example
	   * import { rights } from 'fp-ts/ReadonlyArray'
	   * import { right, left } from 'fp-ts/Either'
	   *
	   * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
	   *
	   * @category combinators
	   * @since 2.5.0
	   */

	  function rights(as) {
	    // tslint:disable-next-line: readonly-array
	    var r = [];
	    var len = as.length;

	    for (var i = 0; i < len; i++) {
	      var a = as[i];

	      if (a._tag === 'Right') {
	        r.push(a.right);
	      }
	    }

	    return r;
	  }

	  exports.rights = rights;
	  /**
	   * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
	   *
	   * @example
	   * import { lefts } from 'fp-ts/ReadonlyArray'
	   * import { left, right } from 'fp-ts/Either'
	   *
	   * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
	   *
	   * @since 2.5.0
	   */

	  function lefts(as) {
	    // tslint:disable-next-line: readonly-array
	    var r = [];
	    var len = as.length;

	    for (var i = 0; i < len; i++) {
	      var a = as[i];

	      if (a._tag === 'Left') {
	        r.push(a.left);
	      }
	    }

	    return r;
	  }

	  exports.lefts = lefts;
	  /**
	   * Sort the elements of an array in increasing order, creating a new array
	   *
	   * @example
	   * import { sort } from 'fp-ts/ReadonlyArray'
	   * import { ordNumber } from 'fp-ts/Ord'
	   *
	   * assert.deepStrictEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
	   *
	   * @category combinators
	   * @since 2.5.0
	   */

	  exports.sort = function (O) {
	    return function (as) {
	      return isEmpty(as) ? as : as.slice().sort(O.compare);
	    };
	  }; // TODO: curry and make data-last in v3

	  /**
	   * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
	   * input array is short, excess elements of the longer array are discarded.
	   *
	   * @example
	   * import { zipWith } from 'fp-ts/ReadonlyArray'
	   *
	   * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
	   *
	   * @category combinators
	   * @since 2.5.0
	   */


	  function zipWith(fa, fb, f) {
	    // tslint:disable-next-line: readonly-array
	    var fc = [];
	    var len = Math.min(fa.length, fb.length);

	    for (var i = 0; i < len; i++) {
	      fc[i] = f(fa[i], fb[i]);
	    }

	    return fc;
	  }

	  exports.zipWith = zipWith;

	  function zip(as, bs) {
	    if (bs === undefined) {
	      return function (bs) {
	        return zip(bs, as);
	      };
	    }

	    return zipWith(as, bs, function (a, b) {
	      return [a, b];
	    });
	  }

	  exports.zip = zip;
	  /**
	   * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
	   *
	   * @example
	   * import { unzip } from 'fp-ts/ReadonlyArray'
	   *
	   * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
	   *
	   * @since 2.5.0
	   */

	  function unzip(as) {
	    // tslint:disable-next-line: readonly-array
	    var fa = []; // tslint:disable-next-line: readonly-array

	    var fb = [];

	    for (var i = 0; i < as.length; i++) {
	      fa[i] = as[i][0];
	      fb[i] = as[i][1];
	    }

	    return [fa, fb];
	  }

	  exports.unzip = unzip;
	  /**
	   * Rotate an array to the right by `n` steps
	   *
	   * @example
	   * import { rotate } from 'fp-ts/ReadonlyArray'
	   *
	   * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
	   *
	   * @category combinators
	   * @since 2.5.0
	   */

	  function rotate(n) {
	    return function (as) {
	      var len = as.length;

	      if (n === 0 || len <= 1 || len === Math.abs(n)) {
	        return as;
	      } else if (n < 0) {
	        return rotate(len + n)(as);
	      } else {
	        return as.slice(-n).concat(as.slice(0, len - n));
	      }
	    };
	  }

	  exports.rotate = rotate;

	  function elem(E) {
	    return function (a, as) {
	      if (as === undefined) {
	        var elemE_1 = elem(E);
	        return function (as) {
	          return elemE_1(a, as);
	        };
	      }

	      var predicate = function predicate(element) {
	        return E.equals(element, a);
	      };

	      var i = 0;
	      var len = as.length;

	      for (; i < len; i++) {
	        if (predicate(as[i])) {
	          return true;
	        }
	      }

	      return false;
	    };
	  }

	  exports.elem = elem;
	  /**
	   * Remove duplicates from an array, keeping the first occurrence of an element.
	   *
	   * @example
	   * import { uniq } from 'fp-ts/ReadonlyArray'
	   * import { eqNumber } from 'fp-ts/Eq'
	   *
	   * assert.deepStrictEqual(uniq(eqNumber)([1, 2, 1]), [1, 2])
	   *
	   * @category combinators
	   * @since 2.5.0
	   */

	  function uniq(E) {
	    var elemS = elem(E);
	    return function (as) {
	      // tslint:disable-next-line: readonly-array
	      var r = [];
	      var len = as.length;
	      var i = 0;

	      for (; i < len; i++) {
	        var a = as[i];

	        if (!elemS(a, r)) {
	          r.push(a);
	        }
	      }

	      return len === r.length ? as : r;
	    };
	  }

	  exports.uniq = uniq;
	  /**
	   * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
	   * etc...
	   *
	   * @example
	   * import { sortBy } from 'fp-ts/ReadonlyArray'
	   * import { ord, ordString, ordNumber } from 'fp-ts/Ord'
	   *
	   * interface Person {
	   *   name: string
	   *   age: number
	   * }
	   * const byName = ord.contramap(ordString, (p: Person) => p.name)
	   * const byAge = ord.contramap(ordNumber, (p: Person) => p.age)
	   *
	   * const sortByNameByAge = sortBy([byName, byAge])
	   *
	   * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
	   * assert.deepStrictEqual(sortByNameByAge(persons), [
	   *   { name: 'a', age: 1 },
	   *   { name: 'b', age: 2 },
	   *   { name: 'b', age: 3 },
	   *   { name: 'c', age: 2 }
	   * ])
	   *
	   * @category combinators
	   * @since 2.5.0
	   */

	  function sortBy(ords) {
	    var M = Ord.getMonoid();
	    return exports.sort(ords.reduce(M.concat, M.empty));
	  }

	  exports.sortBy = sortBy;
	  /**
	   * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
	   * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
	   * value and the rest of the array.
	   *
	   * @example
	   * import { Eq, eqNumber } from 'fp-ts/Eq'
	   * import { chop, spanLeft } from 'fp-ts/ReadonlyArray'
	   *
	   * const group = <A>(S: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
	   *   return chop(as => {
	   *     const { init, rest } = spanLeft((a: A) => S.equals(a, as[0]))(as)
	   *     return [init, rest]
	   *   })
	   * }
	   * assert.deepStrictEqual(group(eqNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
	   *
	   * @category combinators
	   * @since 2.5.0
	   */

	  exports.chop = function (f) {
	    return function (as) {
	      // tslint:disable-next-line: readonly-array
	      var result = [];
	      var cs = as;

	      while (isNonEmpty(cs)) {
	        var _a = f(cs),
	            b = _a[0],
	            c = _a[1];

	        result.push(b);
	        cs = c;
	      }

	      return result;
	    };
	  };
	  /**
	   * Splits an array into two pieces, the first piece has `n` elements.
	   *
	   * @example
	   * import { splitAt } from 'fp-ts/ReadonlyArray'
	   *
	   * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
	   *
	   * @since 2.5.0
	   */


	  function splitAt(n) {
	    return function (as) {
	      return [as.slice(0, n), as.slice(n)];
	    };
	  }

	  exports.splitAt = splitAt;
	  /**
	   * Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
	   * the array. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
	   * definition of `chunksOf`; it satisfies the property that
	   *
	   * ```ts
	   * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
	   * ```
	   *
	   * whenever `n` evenly divides the length of `xs`.
	   *
	   * @example
	   * import { chunksOf } from 'fp-ts/ReadonlyArray'
	   *
	   * assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
	   *
	   *
	   * @since 2.5.0
	   */

	  function chunksOf(n) {
	    var f = exports.chop(splitAt(n));
	    return function (as) {
	      return as.length === 0 ? exports.empty : isOutOfBound(n - 1, as) ? [as] : f(as);
	    };
	  }

	  exports.chunksOf = chunksOf;

	  function comprehension(input, f, g) {
	    if (g === void 0) {
	      g = function g() {
	        return true;
	      };
	    }

	    var go = function go(scope, input) {
	      if (input.length === 0) {
	        return g.apply(void 0, scope) ? [f.apply(void 0, scope)] : exports.empty;
	      } else {
	        return chain_(input[0], function (x) {
	          return go(snoc(scope, x), input.slice(1));
	        });
	      }
	    };

	    return go(exports.empty, input);
	  }

	  exports.comprehension = comprehension;

	  function union(E) {
	    var elemE = elem(E);
	    return function (xs, ys) {
	      if (ys === undefined) {
	        var unionE_1 = union(E);
	        return function (ys) {
	          return unionE_1(ys, xs);
	        };
	      }

	      return concat(xs, ys.filter(function (a) {
	        return !elemE(a, xs);
	      }));
	    };
	  }

	  exports.union = union;

	  function intersection(E) {
	    var elemE = elem(E);
	    return function (xs, ys) {
	      if (ys === undefined) {
	        var intersectionE_1 = intersection(E);
	        return function (ys) {
	          return intersectionE_1(ys, xs);
	        };
	      }

	      return xs.filter(function (a) {
	        return elemE(a, ys);
	      });
	    };
	  }

	  exports.intersection = intersection;

	  function difference(E) {
	    var elemE = elem(E);
	    return function (xs, ys) {
	      if (ys === undefined) {
	        var differenceE_1 = difference(E);
	        return function (ys) {
	          return differenceE_1(ys, xs);
	        };
	      }

	      return xs.filter(function (a) {
	        return !elemE(a, ys);
	      });
	    };
	  }

	  exports.difference = difference;
	  /**
	   * Wrap a value into the type constructor.
	   *
	   * @category Applicative
	   * @since 2.5.0
	   */

	  exports.of = function (a) {
	    return [a];
	  };
	  /**
	   * @category Alternative
	   * @since 2.7.0
	   */


	  exports.zero = function () {
	    return exports.empty;
	  }; // -------------------------------------------------------------------------------------
	  // non-pipeables
	  // -------------------------------------------------------------------------------------


	  var map_ = function map_(fa, f) {
	    return _function.pipe(fa, exports.map(f));
	  };

	  var mapWithIndex_ = function mapWithIndex_(fa, f) {
	    return _function.pipe(fa, exports.mapWithIndex(f));
	  };

	  var ap_ = function ap_(fab, fa) {
	    return _function.pipe(fab, exports.ap(fa));
	  };

	  var chain_ = function chain_(ma, f) {
	    return _function.pipe(ma, exports.chain(f));
	  };

	  var filter_ = function filter_(fa, predicate) {
	    return _function.pipe(fa, exports.filter(predicate));
	  };

	  var filterMap_ = function filterMap_(fa, f) {
	    return _function.pipe(fa, exports.filterMap(f));
	  };

	  var partitionWithIndex_ = function partitionWithIndex_(fa, predicateWithIndex) {
	    return _function.pipe(fa, exports.partitionWithIndex(predicateWithIndex));
	  };

	  var partition_ = function partition_(fa, predicate) {
	    return _function.pipe(fa, exports.partition(predicate));
	  };

	  var partitionMap_ = function partitionMap_(fa, f) {
	    return _function.pipe(fa, exports.partitionMap(f));
	  };

	  var partitionMapWithIndex_ = function partitionMapWithIndex_(fa, f) {
	    return _function.pipe(fa, exports.partitionMapWithIndex(f));
	  };

	  var alt_ = function alt_(fa, that) {
	    return _function.pipe(fa, exports.alt(that));
	  };

	  var reduce_ = function reduce_(fa, b, f) {
	    return _function.pipe(fa, exports.reduce(b, f));
	  };

	  var foldMap_ = function foldMap_(M) {
	    var foldMapM = exports.foldMap(M);
	    return function (fa, f) {
	      return _function.pipe(fa, foldMapM(f));
	    };
	  };

	  var reduceRight_ = function reduceRight_(fa, b, f) {
	    return _function.pipe(fa, exports.reduceRight(b, f));
	  };

	  var reduceWithIndex_ = function reduceWithIndex_(fa, b, f) {
	    var l = fa.length;
	    var r = b;

	    for (var i = 0; i < l; i++) {
	      r = f(i, r, fa[i]);
	    }

	    return r;
	  };

	  var foldMapWithIndex_ = function foldMapWithIndex_(M) {
	    return function (fa, f) {
	      return fa.reduce(function (b, a, i) {
	        return M.concat(b, f(i, a));
	      }, M.empty);
	    };
	  };

	  var reduceRightWithIndex_ = function reduceRightWithIndex_(fa, b, f) {
	    return _function.pipe(fa, exports.reduceRightWithIndex(b, f));
	  };

	  var filterMapWithIndex_ = function filterMapWithIndex_(fa, f) {
	    return _function.pipe(fa, exports.filterMapWithIndex(f));
	  };

	  var filterWithIndex_ = function filterWithIndex_(fa, predicateWithIndex) {
	    return _function.pipe(fa, exports.filterWithIndex(predicateWithIndex));
	  };

	  var extend_ = function extend_(fa, f) {
	    return _function.pipe(fa, exports.extend(f));
	  };

	  var traverse_ = function traverse_(F) {
	    var traverseF = exports.traverse(F);
	    return function (ta, f) {
	      return _function.pipe(ta, traverseF(f));
	    };
	  };
	  /* istanbul ignore next */


	  var traverseWithIndex_ = function traverseWithIndex_(F) {
	    var traverseWithIndexF = exports.traverseWithIndex(F);
	    return function (ta, f) {
	      return _function.pipe(ta, traverseWithIndexF(f));
	    };
	  };
	  /* istanbul ignore next */


	  var wither_ = function wither_(F) {
	    var witherF = exports.wither(F);
	    return function (fa, f) {
	      return _function.pipe(fa, witherF(f));
	    };
	  };
	  /* istanbul ignore next */


	  var wilt_ = function wilt_(F) {
	    var wiltF = exports.wilt(F);
	    return function (fa, f) {
	      return _function.pipe(fa, wiltF(f));
	    };
	  }; // -------------------------------------------------------------------------------------
	  // pipeables
	  // -------------------------------------------------------------------------------------

	  /**
	   * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
	   * types of kind `* -> *`.
	   *
	   * @category Alt
	   * @since 2.5.0
	   */


	  exports.alt = function (that) {
	    return function (fa) {
	      return concat(fa, that());
	    };
	  };
	  /**
	   * Apply a function to an argument under a type constructor.
	   *
	   * @category Apply
	   * @since 2.5.0
	   */


	  exports.ap = function (fa) {
	    return exports.chain(function (f) {
	      return _function.pipe(fa, exports.map(f));
	    });
	  };
	  /**
	   * Combine two effectful actions, keeping only the result of the first.
	   *
	   * Derivable from `Apply`.
	   *
	   * @category combinators
	   * @since 2.5.0
	   */


	  exports.apFirst = function (fb) {
	    return _function.flow(exports.map(function (a) {
	      return function () {
	        return a;
	      };
	    }), exports.ap(fb));
	  };
	  /**
	   * Combine two effectful actions, keeping only the result of the second.
	   *
	   * Derivable from `Apply`.
	   *
	   * @category combinators
	   * @since 2.5.0
	   */


	  exports.apSecond = function (fb) {
	    return _function.flow(exports.map(function () {
	      return function (b) {
	        return b;
	      };
	    }), exports.ap(fb));
	  };
	  /**
	   * Composes computations in sequence, using the return value of one computation to determine the next computation.
	   *
	   * @category Monad
	   * @since 2.5.0
	   */


	  exports.chain = function (f) {
	    return function (ma) {
	      return _function.pipe(ma, exports.chainWithIndex(function (_, a) {
	        return f(a);
	      }));
	    };
	  };
	  /**
	   * @since 2.7.0
	   */


	  exports.chainWithIndex = function (f) {
	    return function (ma) {
	      var outLen = 0;
	      var l = ma.length;
	      var temp = new Array(l);

	      for (var i = 0; i < l; i++) {
	        var e = ma[i];
	        var arr = f(i, e);
	        outLen += arr.length;
	        temp[i] = arr;
	      }

	      var out = Array(outLen);
	      var start = 0;

	      for (var i = 0; i < l; i++) {
	        var arr = temp[i];
	        var l_1 = arr.length;

	        for (var j = 0; j < l_1; j++) {
	          out[j + start] = arr[j];
	        }

	        start += l_1;
	      }

	      return out;
	    };
	  };
	  /**
	   * Composes computations in sequence, using the return value of one computation to determine the next computation and
	   * keeping only the result of the first.
	   *
	   * Derivable from `Monad`.
	   *
	   * @category combinators
	   * @since 2.5.0
	   */


	  exports.chainFirst = function (f) {
	    return exports.chain(function (a) {
	      return _function.pipe(f(a), exports.map(function () {
	        return a;
	      }));
	    });
	  };
	  /**
	   * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
	   * use the type constructor `F` to represent some computational context.
	   *
	   * @category Functor
	   * @since 2.5.0
	   */


	  exports.map = function (f) {
	    return function (fa) {
	      return fa.map(function (a) {
	        return f(a);
	      });
	    };
	  };
	  /**
	   * @category FunctorWithIndex
	   * @since 2.5.0
	   */


	  exports.mapWithIndex = function (f) {
	    return function (fa) {
	      return fa.map(function (a, i) {
	        return f(i, a);
	      });
	    };
	  };
	  /**
	   * @category Compactable
	   * @since 2.5.0
	   */


	  exports.separate = function (fa) {
	    // tslint:disable-next-line: readonly-array
	    var left = []; // tslint:disable-next-line: readonly-array

	    var right = [];

	    for (var _i = 0, fa_1 = fa; _i < fa_1.length; _i++) {
	      var e = fa_1[_i];

	      if (e._tag === 'Left') {
	        left.push(e.left);
	      } else {
	        right.push(e.right);
	      }
	    }

	    return {
	      left: left,
	      right: right
	    };
	  };
	  /**
	   * @category Filterable
	   * @since 2.5.0
	   */


	  exports.filter = function (predicate) {
	    return function (fa) {
	      return fa.filter(predicate);
	    };
	  };
	  /**
	   * @category FilterableWithIndex
	   * @since 2.5.0
	   */


	  exports.filterMapWithIndex = function (f) {
	    return function (fa) {
	      // tslint:disable-next-line: readonly-array
	      var result = [];

	      for (var i = 0; i < fa.length; i++) {
	        var optionB = f(i, fa[i]);

	        if (Option.isSome(optionB)) {
	          result.push(optionB.value);
	        }
	      }

	      return result;
	    };
	  };
	  /**
	   * @category Filterable
	   * @since 2.5.0
	   */


	  exports.filterMap = function (f) {
	    return exports.filterMapWithIndex(function (_, a) {
	      return f(a);
	    });
	  };
	  /**
	   * @category Compactable
	   * @since 2.5.0
	   */


	  exports.compact = /*#__PURE__*/exports.filterMap(_function.identity);
	  /**
	   * @category Filterable
	   * @since 2.5.0
	   */

	  exports.partition = function (predicate) {
	    return exports.partitionWithIndex(function (_, a) {
	      return predicate(a);
	    });
	  };
	  /**
	   * @category FilterableWithIndex
	   * @since 2.5.0
	   */


	  exports.partitionWithIndex = function (predicateWithIndex) {
	    return function (fa) {
	      // tslint:disable-next-line: readonly-array
	      var left = []; // tslint:disable-next-line: readonly-array

	      var right = [];

	      for (var i = 0; i < fa.length; i++) {
	        var a = fa[i];

	        if (predicateWithIndex(i, a)) {
	          right.push(a);
	        } else {
	          left.push(a);
	        }
	      }

	      return {
	        left: left,
	        right: right
	      };
	    };
	  };
	  /**
	   * @category Filterable
	   * @since 2.5.0
	   */


	  exports.partitionMap = function (f) {
	    return exports.partitionMapWithIndex(function (_, a) {
	      return f(a);
	    });
	  };
	  /**
	   * @category FilterableWithIndex
	   * @since 2.5.0
	   */


	  exports.partitionMapWithIndex = function (f) {
	    return function (fa) {
	      // tslint:disable-next-line: readonly-array
	      var left = []; // tslint:disable-next-line: readonly-array

	      var right = [];

	      for (var i = 0; i < fa.length; i++) {
	        var e = f(i, fa[i]);

	        if (e._tag === 'Left') {
	          left.push(e.left);
	        } else {
	          right.push(e.right);
	        }
	      }

	      return {
	        left: left,
	        right: right
	      };
	    };
	  };
	  /**
	   * @category FilterableWithIndex
	   * @since 2.5.0
	   */


	  exports.filterWithIndex = function (predicateWithIndex) {
	    return function (fa) {
	      return fa.filter(function (a, i) {
	        return predicateWithIndex(i, a);
	      });
	    };
	  };
	  /**
	   * @category Extend
	   * @since 2.5.0
	   */


	  exports.extend = function (f) {
	    return function (wa) {
	      return wa.map(function (_, i, as) {
	        return f(as.slice(i));
	      });
	    };
	  };
	  /**
	   * Derivable from `Extend`.
	   *
	   * @category combinators
	   * @since 2.5.0
	   */


	  exports.duplicate = /*#__PURE__*/exports.extend(_function.identity);
	  /**
	   * @category FoldableWithIndex
	   * @since 2.5.0
	   */

	  exports.foldMapWithIndex = function (M) {
	    var foldMapWithIndexM = foldMapWithIndex_(M);
	    return function (f) {
	      return function (fa) {
	        return foldMapWithIndexM(fa, f);
	      };
	    };
	  };
	  /**
	   * @category Foldable
	   * @since 2.5.0
	   */


	  exports.reduce = function (b, f) {
	    return exports.reduceWithIndex(b, function (_, b, a) {
	      return f(b, a);
	    });
	  };
	  /**
	   * @category Foldable
	   * @since 2.5.0
	   */


	  exports.foldMap = function (M) {
	    var foldMapWithIndexM = exports.foldMapWithIndex(M);
	    return function (f) {
	      return foldMapWithIndexM(function (_, a) {
	        return f(a);
	      });
	    };
	  };
	  /**
	   * @category FoldableWithIndex
	   * @since 2.5.0
	   */


	  exports.reduceWithIndex = function (b, f) {
	    return function (fa) {
	      return reduceWithIndex_(fa, b, f);
	    };
	  };
	  /**
	   * @category Foldable
	   * @since 2.5.0
	   */


	  exports.reduceRight = function (b, f) {
	    return exports.reduceRightWithIndex(b, function (_, a, b) {
	      return f(a, b);
	    });
	  };
	  /**
	   * @category FoldableWithIndex
	   * @since 2.5.0
	   */


	  exports.reduceRightWithIndex = function (b, f) {
	    return function (fa) {
	      return fa.reduceRight(function (b, a, i) {
	        return f(i, a, b);
	      }, b);
	    };
	  };
	  /**
	   * @category Traversable
	   * @since 2.6.3
	   */


	  exports.traverse = function (F) {
	    var traverseWithIndexF = exports.traverseWithIndex(F);
	    return function (f) {
	      return traverseWithIndexF(function (_, a) {
	        return f(a);
	      });
	    };
	  };
	  /**
	   * @category Traversable
	   * @since 2.6.3
	   */


	  exports.sequence = function (F) {
	    return function (ta) {
	      return reduce_(ta, F.of(exports.zero()), function (fas, fa) {
	        return F.ap(F.map(fas, function (as) {
	          return function (a) {
	            return snoc(as, a);
	          };
	        }), fa);
	      });
	    };
	  };
	  /**
	   * @category TraversableWithIndex
	   * @since 2.6.3
	   */


	  exports.traverseWithIndex = function (F) {
	    return function (f) {
	      return exports.reduceWithIndex(F.of(exports.zero()), function (i, fbs, a) {
	        return F.ap(F.map(fbs, function (bs) {
	          return function (b) {
	            return snoc(bs, b);
	          };
	        }), f(i, a));
	      });
	    };
	  };
	  /**
	   * @category Witherable
	   * @since 2.6.5
	   */


	  exports.wither = function (F) {
	    var traverseF = exports.traverse(F);
	    return function (f) {
	      return function (fa) {
	        return F.map(_function.pipe(fa, traverseF(f)), exports.compact);
	      };
	    };
	  };
	  /**
	   * @category Witherable
	   * @since 2.6.5
	   */


	  exports.wilt = function (F) {
	    var traverseF = exports.traverse(F);
	    return function (f) {
	      return function (fa) {
	        return F.map(_function.pipe(fa, traverseF(f)), exports.separate);
	      };
	    };
	  };
	  /**
	   * @category Unfoldable
	   * @since 2.6.6
	   */


	  exports.unfold = function (b, f) {
	    // tslint:disable-next-line: readonly-array
	    var ret = [];
	    var bb = b;

	    while (true) {
	      var mt = f(bb);

	      if (Option.isSome(mt)) {
	        var _a = mt.value,
	            a = _a[0],
	            b_1 = _a[1];
	        ret.push(a);
	        bb = b_1;
	      } else {
	        break;
	      }
	    }

	    return ret;
	  }; // -------------------------------------------------------------------------------------
	  // instances
	  // -------------------------------------------------------------------------------------

	  /**
	   * @category instances
	   * @since 2.5.0
	   */


	  exports.URI = 'ReadonlyArray';
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Functor = {
	    URI: exports.URI,
	    map: map_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.FunctorWithIndex = {
	    URI: exports.URI,
	    map: map_,
	    mapWithIndex: mapWithIndex_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Applicative = {
	    URI: exports.URI,
	    map: map_,
	    ap: ap_,
	    of: exports.of
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Monad = {
	    URI: exports.URI,
	    map: map_,
	    ap: ap_,
	    of: exports.of,
	    chain: chain_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Unfoldable = {
	    URI: exports.URI,
	    unfold: exports.unfold
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Alt = {
	    URI: exports.URI,
	    map: map_,
	    alt: alt_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Alternative = {
	    URI: exports.URI,
	    map: map_,
	    ap: ap_,
	    of: exports.of,
	    alt: alt_,
	    zero: exports.zero
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Extend = {
	    URI: exports.URI,
	    map: map_,
	    extend: extend_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Compactable = {
	    URI: exports.URI,
	    compact: exports.compact,
	    separate: exports.separate
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Filterable = {
	    URI: exports.URI,
	    map: map_,
	    compact: exports.compact,
	    separate: exports.separate,
	    filter: filter_,
	    filterMap: filterMap_,
	    partition: partition_,
	    partitionMap: partitionMap_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.FilterableWithIndex = {
	    URI: exports.URI,
	    map: map_,
	    mapWithIndex: mapWithIndex_,
	    compact: exports.compact,
	    separate: exports.separate,
	    filter: filter_,
	    filterMap: filterMap_,
	    partition: partition_,
	    partitionMap: partitionMap_,
	    partitionMapWithIndex: partitionMapWithIndex_,
	    partitionWithIndex: partitionWithIndex_,
	    filterMapWithIndex: filterMapWithIndex_,
	    filterWithIndex: filterWithIndex_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Foldable = {
	    URI: exports.URI,
	    reduce: reduce_,
	    foldMap: foldMap_,
	    reduceRight: reduceRight_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.FoldableWithIndex = {
	    URI: exports.URI,
	    reduce: reduce_,
	    foldMap: foldMap_,
	    reduceRight: reduceRight_,
	    reduceWithIndex: reduceWithIndex_,
	    foldMapWithIndex: foldMapWithIndex_,
	    reduceRightWithIndex: reduceRightWithIndex_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Traversable = {
	    URI: exports.URI,
	    map: map_,
	    reduce: reduce_,
	    foldMap: foldMap_,
	    reduceRight: reduceRight_,
	    traverse: traverse_,
	    sequence: exports.sequence
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.TraversableWithIndex = {
	    URI: exports.URI,
	    map: map_,
	    mapWithIndex: mapWithIndex_,
	    reduce: reduce_,
	    foldMap: foldMap_,
	    reduceRight: reduceRight_,
	    reduceWithIndex: reduceWithIndex_,
	    foldMapWithIndex: foldMapWithIndex_,
	    reduceRightWithIndex: reduceRightWithIndex_,
	    traverse: traverse_,
	    sequence: exports.sequence,
	    traverseWithIndex: traverseWithIndex_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Witherable = {
	    URI: exports.URI,
	    map: map_,
	    compact: exports.compact,
	    separate: exports.separate,
	    filter: filter_,
	    filterMap: filterMap_,
	    partition: partition_,
	    partitionMap: partitionMap_,
	    reduce: reduce_,
	    foldMap: foldMap_,
	    reduceRight: reduceRight_,
	    traverse: traverse_,
	    sequence: exports.sequence,
	    wither: wither_,
	    wilt: wilt_
	  }; // TODO: remove in v3

	  /**
	   * @category instances
	   * @since 2.5.0
	   */

	  exports.readonlyArray = {
	    URI: exports.URI,
	    compact: exports.compact,
	    separate: exports.separate,
	    map: map_,
	    ap: ap_,
	    of: exports.of,
	    chain: chain_,
	    filter: filter_,
	    filterMap: filterMap_,
	    partition: partition_,
	    partitionMap: partitionMap_,
	    mapWithIndex: mapWithIndex_,
	    partitionMapWithIndex: partitionMapWithIndex_,
	    partitionWithIndex: partitionWithIndex_,
	    filterMapWithIndex: filterMapWithIndex_,
	    filterWithIndex: filterWithIndex_,
	    alt: alt_,
	    zero: exports.zero,
	    unfold: exports.unfold,
	    reduce: reduce_,
	    foldMap: foldMap_,
	    reduceRight: reduceRight_,
	    traverse: traverse_,
	    sequence: exports.sequence,
	    reduceWithIndex: reduceWithIndex_,
	    foldMapWithIndex: foldMapWithIndex_,
	    reduceRightWithIndex: reduceRightWithIndex_,
	    traverseWithIndex: traverseWithIndex_,
	    extend: extend_,
	    wither: wither_,
	    wilt: wilt_
	  }; // -------------------------------------------------------------------------------------
	  // unsafe
	  // -------------------------------------------------------------------------------------

	  /**
	   * @category unsafe
	   * @since 2.5.0
	   */

	  function unsafeInsertAt(i, a, as) {
	    var xs = as.slice();
	    xs.splice(i, 0, a);
	    return xs;
	  }

	  exports.unsafeInsertAt = unsafeInsertAt;
	  /**
	   * @category unsafe
	   * @since 2.5.0
	   */

	  function unsafeUpdateAt(i, a, as) {
	    if (as[i] === a) {
	      return as;
	    } else {
	      var xs = as.slice();
	      xs[i] = a;
	      return xs;
	    }
	  }

	  exports.unsafeUpdateAt = unsafeUpdateAt;
	  /**
	   * @category unsafe
	   * @since 2.5.0
	   */

	  function unsafeDeleteAt(i, as) {
	    var xs = as.slice();
	    xs.splice(i, 1);
	    return xs;
	  }

	  exports.unsafeDeleteAt = unsafeDeleteAt; // -------------------------------------------------------------------------------------
	  // utils
	  // -------------------------------------------------------------------------------------

	  /**
	   * An empty array
	   *
	   * @since 2.5.0
	   */

	  exports.empty = []; // -------------------------------------------------------------------------------------
	  // do notation
	  // -------------------------------------------------------------------------------------

	  /**
	   * @since 2.8.0
	   */

	  exports.bindTo = function (name) {
	    return exports.map(_function.bindTo_(name));
	  };
	  /**
	   * @since 2.8.0
	   */


	  exports.bind = function (name, f) {
	    return exports.chain(function (a) {
	      return _function.pipe(f(a), exports.map(function (b) {
	        return _function.bind_(a, name, b);
	      }));
	    });
	  }; // -------------------------------------------------------------------------------------
	  // pipeable sequence S
	  // -------------------------------------------------------------------------------------

	  /**
	   * @since 2.8.0
	   */


	  exports.apS = function (name, fb) {
	    return _function.flow(exports.map(function (a) {
	      return function (b) {
	        return _function.bind_(a, name, b);
	      };
	    }), exports.ap(fb));
	  };
	});

	var _Array = /*#__PURE__*/createCommonjsModule(function (module, exports) {

	  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    Object.defineProperty(o, k2, {
	      enumerable: true,
	      get: function get() {
	        return m[k];
	      }
	    });
	  } : function (o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	  });

	  var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function (o, v) {
	    Object.defineProperty(o, "default", {
	      enumerable: true,
	      value: v
	    });
	  } : function (o, v) {
	    o["default"] = v;
	  });

	  var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) {
	      if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
	    }

	    __setModuleDefault(result, mod);

	    return result;
	  };

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });
	  exports.apS = exports.bind = exports.bindTo = exports.empty = exports.unsafeDeleteAt = exports.unsafeUpdateAt = exports.unsafeInsertAt = exports.array = exports.Witherable = exports.TraversableWithIndex = exports.Traversable = exports.FoldableWithIndex = exports.Foldable = exports.FilterableWithIndex = exports.Filterable = exports.Compactable = exports.Extend = exports.Alternative = exports.Alt = exports.Unfoldable = exports.Monad = exports.Applicative = exports.FunctorWithIndex = exports.Functor = exports.URI = exports.zero = exports.unfold = exports.wilt = exports.wither = exports.traverseWithIndex = exports.sequence = exports.traverse = exports.reduceRightWithIndex = exports.reduceRight = exports.reduceWithIndex = exports.reduce = exports.foldMapWithIndex = exports.foldMap = exports.duplicate = exports.extend = exports.filterWithIndex = exports.filterMapWithIndex = exports.alt = exports.partitionMapWithIndex = exports.partitionMap = exports.partitionWithIndex = exports.partition = exports.filterMap = exports.filter = exports.separate = exports.compact = exports.mapWithIndex = exports.chainFirst = exports.chainWithIndex = exports.chain = exports.apSecond = exports.apFirst = exports.ap = exports.map = exports.of = exports.difference = exports.intersection = exports.union = exports.comprehension = exports.chunksOf = exports.splitAt = exports.chop = exports.sortBy = exports.uniq = exports.elem = exports.rotate = exports.unzip = exports.zip = exports.zipWith = exports.sort = exports.lefts = exports.rights = exports.reverse = exports.modifyAt = exports.deleteAt = exports.updateAt = exports.insertAt = exports.copy = exports.findLastIndex = exports.findLastMap = exports.findLast = exports.findFirstMap = exports.findFirst = exports.findIndex = exports.dropLeftWhile = exports.dropRight = exports.dropLeft = exports.spanLeft = exports.takeLeftWhile = exports.takeRight = exports.takeLeft = exports.init = exports.tail = exports.last = exports.head = exports.snoc = exports.cons = exports.lookup = exports.isOutOfBound = exports.isNonEmpty = exports.isEmpty = exports.scanRight = exports.scanLeft = exports.foldRight = exports.foldLeft = exports.flatten = exports.replicate = exports.range = exports.makeBy = exports.getOrd = exports.getEq = exports.getMonoid = exports.getShow = void 0;

	  var RA = __importStar(ReadonlyArray); // -------------------------------------------------------------------------------------
	  // model
	  // -------------------------------------------------------------------------------------

	  /* tslint:disable:readonly-array */

	  /**
	   * @category instances
	   * @since 2.0.0
	   */


	  exports.getShow = RA.getShow;
	  /**
	   * Returns a `Monoid` for `Array<A>`
	   *
	   * @example
	   * import { getMonoid } from 'fp-ts/Array'
	   *
	   * const M = getMonoid<number>()
	   * assert.deepStrictEqual(M.concat([1, 2], [3, 4]), [1, 2, 3, 4])
	   *
	   * @category instances
	   * @since 2.0.0
	   */

	  exports.getMonoid = RA.getMonoid;
	  /**
	   * Derives an `Eq` over the `Array` of a given element type from the `Eq` of that type. The derived `Eq` defines two
	   * arrays as equal if all elements of both arrays are compared equal pairwise with the given `E`. In case of arrays of
	   * different lengths, the result is non equality.
	   *
	   * @example
	   * import { eqString } from 'fp-ts/Eq'
	   * import { getEq } from 'fp-ts/Array'
	   *
	   * const E = getEq(eqString)
	   * assert.strictEqual(E.equals(['a', 'b'], ['a', 'b']), true)
	   * assert.strictEqual(E.equals(['a'], []), false)
	   *
	   * @category instances
	   * @since 2.0.0
	   */

	  exports.getEq = RA.getEq;
	  /**
	   * Derives an `Ord` over the `Array` of a given element type from the `Ord` of that type. The ordering between two such
	   * arrays is equal to: the first non equal comparison of each arrays elements taken pairwise in increasing order, in
	   * case of equality over all the pairwise elements; the longest array is considered the greatest, if both arrays have
	   * the same length, the result is equality.
	   *
	   * @example
	   * import { getOrd } from 'fp-ts/Array'
	   * import { ordString } from 'fp-ts/Ord'
	   *
	   * const O = getOrd(ordString)
	   * assert.strictEqual(O.compare(['b'], ['a']), 1)
	   * assert.strictEqual(O.compare(['a'], ['a']), 0)
	   * assert.strictEqual(O.compare(['a'], ['b']), -1)
	   *
	   * @category instances
	   * @since 2.0.0
	   */

	  exports.getOrd = RA.getOrd; // -------------------------------------------------------------------------------------
	  // constructors
	  // -------------------------------------------------------------------------------------

	  /**
	   * Return a list of length `n` with element `i` initialized with `f(i)`
	   *
	   * @example
	   * import { makeBy } from 'fp-ts/Array'
	   *
	   * const double = (n: number): number => n * 2
	   * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
	   *
	   * @category constructors
	   * @since 2.0.0
	   */

	  exports.makeBy = RA.makeBy;
	  /**
	   * Create an array containing a range of integers, including both endpoints
	   *
	   * @example
	   * import { range } from 'fp-ts/Array'
	   *
	   * assert.deepStrictEqual(range(1, 5), [1, 2, 3, 4, 5])
	   *
	   * @category constructors
	   * @since 2.0.0
	   */

	  exports.range = RA.range;
	  /**
	   * Create an array containing a value repeated the specified number of times
	   *
	   * @example
	   * import { replicate } from 'fp-ts/Array'
	   *
	   * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
	   *
	   * @category constructors
	   * @since 2.0.0
	   */

	  exports.replicate = RA.replicate;
	  /**
	   * Removes one level of nesting.
	   *
	   * Derivable from `Monad`.
	   *
	   * @example
	   * import { flatten } from 'fp-ts/Array'
	   *
	   * assert.deepStrictEqual(flatten([[1], [2], [3]]), [1, 2, 3])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.flatten = RA.flatten;
	  /**
	   * Break an array into its first element and remaining elements
	   *
	   * @example
	   * import { foldLeft } from 'fp-ts/Array'
	   *
	   * const len: <A>(as: Array<A>) => number = foldLeft(() => 0, (_, tail) => 1 + len(tail))
	   * assert.strictEqual(len([1, 2, 3]), 3)
	   *
	   * @category destructors
	   * @since 2.0.0
	   */

	  exports.foldLeft = RA.foldLeft;
	  /**
	   * Break an array into its initial elements and the last element
	   *
	   * @category destructors
	   * @since 2.0.0
	   */

	  exports.foldRight = RA.foldRight;
	  /**
	   * Same as `reduce` but it carries over the intermediate steps
	   *
	   * ```ts
	   * import { scanLeft } from 'fp-ts/Array'
	   *
	   * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
	   * ```
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.scanLeft = RA.scanLeft;
	  /**
	   * Fold an array from the right, keeping all intermediate results instead of only the final result
	   *
	   * @example
	   * import { scanRight } from 'fp-ts/Array'
	   *
	   * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.scanRight = RA.scanRight;
	  /**
	   * Test whether an array is empty
	   *
	   * @example
	   * import { isEmpty } from 'fp-ts/Array'
	   *
	   * assert.strictEqual(isEmpty([]), true)
	   *
	   * @since 2.0.0
	   */

	  exports.isEmpty = RA.isEmpty;
	  /**
	   * Test whether an array is non empty narrowing down the type to `NonEmptyArray<A>`
	   *
	   * @category guards
	   * @since 2.0.0
	   */

	  exports.isNonEmpty = RA.isNonEmpty;
	  /**
	   * Test whether an array contains a particular index
	   *
	   * @since 2.0.0
	   */

	  exports.isOutOfBound = RA.isOutOfBound; // TODO: remove non-curried overloading in v3

	  /**
	   * This function provides a safe way to read a value at a particular index from an array
	   *
	   * @example
	   * import { lookup } from 'fp-ts/Array'
	   * import { some, none } from 'fp-ts/Option'
	   * import { pipe } from 'fp-ts/function'
	   *
	   * assert.deepStrictEqual(pipe([1, 2, 3], lookup(1)), some(2))
	   * assert.deepStrictEqual(pipe([1, 2, 3], lookup(3)), none)
	   *
	   * @since 2.0.0
	   */

	  exports.lookup = RA.lookup; // TODO: remove non-curried overloading in v3

	  /**
	   * Attaches an element to the front of an array, creating a new non empty array
	   *
	   * @example
	   * import { cons } from 'fp-ts/Array'
	   * import { pipe } from 'fp-ts/function'
	   *
	   * assert.deepStrictEqual(pipe([1, 2, 3], cons(0)), [0, 1, 2, 3])
	   *
	   * @category constructors
	   * @since 2.0.0
	   */

	  exports.cons = RA.cons; // TODO: curry in v3

	  /**
	   * Append an element to the end of an array, creating a new non empty array
	   *
	   * @example
	   * import { snoc } from 'fp-ts/Array'
	   *
	   * assert.deepStrictEqual(snoc([1, 2, 3], 4), [1, 2, 3, 4])
	   *
	   * @category constructors
	   * @since 2.0.0
	   */

	  exports.snoc = RA.snoc;
	  /**
	   * Get the first element in an array, or `None` if the array is empty
	   *
	   * @example
	   * import { head } from 'fp-ts/Array'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * assert.deepStrictEqual(head([1, 2, 3]), some(1))
	   * assert.deepStrictEqual(head([]), none)
	   *
	   * @category destructors
	   * @since 2.0.0
	   */

	  exports.head = RA.head;
	  /**
	   * Get the last element in an array, or `None` if the array is empty
	   *
	   * @example
	   * import { last } from 'fp-ts/Array'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * assert.deepStrictEqual(last([1, 2, 3]), some(3))
	   * assert.deepStrictEqual(last([]), none)
	   *
	   * @category destructors
	   * @since 2.0.0
	   */

	  exports.last = RA.last;
	  /**
	   * Get all but the first element of an array, creating a new array, or `None` if the array is empty
	   *
	   * @example
	   * import { tail } from 'fp-ts/Array'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
	   * assert.deepStrictEqual(tail([]), none)
	   *
	   * @category destructors
	   * @since 2.0.0
	   */

	  exports.tail = RA.tail;
	  /**
	   * Get all but the last element of an array, creating a new array, or `None` if the array is empty
	   *
	   * @example
	   * import { init } from 'fp-ts/Array'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
	   * assert.deepStrictEqual(init([]), none)
	   *
	   * @category destructors
	   * @since 2.0.0
	   */

	  exports.init = RA.init;
	  /**
	   * Keep only a number of elements from the start of an array, creating a new array.
	   * `n` must be a natural number
	   *
	   * @example
	   * import { takeLeft } from 'fp-ts/Array'
	   *
	   * assert.deepStrictEqual(takeLeft(2)([1, 2, 3]), [1, 2])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.takeLeft = RA.takeLeft;
	  /**
	   * Keep only a number of elements from the end of an array, creating a new array.
	   * `n` must be a natural number
	   *
	   * @example
	   * import { takeRight } from 'fp-ts/Array'
	   *
	   * assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.takeRight = RA.takeRight;

	  function takeLeftWhile(predicate) {
	    return RA.takeLeftWhile(predicate);
	  }

	  exports.takeLeftWhile = takeLeftWhile;

	  function spanLeft(predicate) {
	    return RA.spanLeft(predicate);
	  }

	  exports.spanLeft = spanLeft;
	  /* tslint:enable:readonly-keyword */

	  /**
	   * Drop a number of elements from the start of an array, creating a new array
	   *
	   * @example
	   * import { dropLeft } from 'fp-ts/Array'
	   *
	   * assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.dropLeft = RA.dropLeft;
	  /**
	   * Drop a number of elements from the end of an array, creating a new array
	   *
	   * @example
	   * import { dropRight } from 'fp-ts/Array'
	   *
	   * assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.dropRight = RA.dropRight;
	  /**
	   * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new array
	   *
	   * @example
	   * import { dropLeftWhile } from 'fp-ts/Array'
	   *
	   * assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.dropLeftWhile = RA.dropLeftWhile;
	  /**
	   * Find the first index for which a predicate holds
	   *
	   * @example
	   * import { findIndex } from 'fp-ts/Array'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
	   * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
	   *
	   * @since 2.0.0
	   */

	  exports.findIndex = RA.findIndex;

	  function findFirst(predicate) {
	    return RA.findFirst(predicate);
	  }

	  exports.findFirst = findFirst;
	  /**
	   * Find the first element returned by an option based selector function
	   *
	   * @example
	   * import { findFirstMap } from 'fp-ts/Array'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * interface Person {
	   *   name: string
	   *   age?: number
	   * }
	   *
	   * const persons: Array<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
	   *
	   * // returns the name of the first person that has an age
	   * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
	   *
	   * @category destructors
	   * @since 2.0.0
	   */

	  exports.findFirstMap = RA.findFirstMap;

	  function findLast(predicate) {
	    return RA.findLast(predicate);
	  }

	  exports.findLast = findLast;
	  /**
	   * Find the last element returned by an option based selector function
	   *
	   * @example
	   * import { findLastMap } from 'fp-ts/Array'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * interface Person {
	   *   name: string
	   *   age?: number
	   * }
	   *
	   * const persons: Array<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
	   *
	   * // returns the name of the last person that has an age
	   * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
	   *
	   * @category destructors
	   * @since 2.0.0
	   */

	  exports.findLastMap = RA.findLastMap;
	  /**
	   * Returns the index of the last element of the list which matches the predicate
	   *
	   * @example
	   * import { findLastIndex } from 'fp-ts/Array'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * interface X {
	   *   a: number
	   *   b: number
	   * }
	   * const xs: Array<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
	   * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 1)(xs), some(1))
	   * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 4)(xs), none)
	   *
	   *
	   * @since 2.0.0
	   */

	  exports.findLastIndex = RA.findLastIndex;
	  /**
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.copy = RA.toArray;
	  /**
	   * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
	   *
	   * @example
	   * import { insertAt } from 'fp-ts/Array'
	   * import { some } from 'fp-ts/Option'
	   *
	   * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
	   *
	   * @since 2.0.0
	   */

	  exports.insertAt = RA.insertAt;
	  /**
	   * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
	   *
	   * @example
	   * import { updateAt } from 'fp-ts/Array'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
	   * assert.deepStrictEqual(updateAt(1, 1)([]), none)
	   *
	   * @since 2.0.0
	   */

	  exports.updateAt = RA.updateAt;
	  /**
	   * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
	   *
	   * @example
	   * import { deleteAt } from 'fp-ts/Array'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
	   * assert.deepStrictEqual(deleteAt(1)([]), none)
	   *
	   * @since 2.0.0
	   */

	  exports.deleteAt = RA.deleteAt;
	  /**
	   * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
	   * of bounds
	   *
	   * @example
	   * import { modifyAt } from 'fp-ts/Array'
	   * import { some, none } from 'fp-ts/Option'
	   *
	   * const double = (x: number): number => x * 2
	   * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
	   * assert.deepStrictEqual(modifyAt(1, double)([]), none)
	   *
	   * @since 2.0.0
	   */

	  exports.modifyAt = RA.modifyAt;
	  /**
	   * Reverse an array, creating a new array
	   *
	   * @example
	   * import { reverse } from 'fp-ts/Array'
	   *
	   * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.reverse = RA.reverse;
	  /**
	   * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
	   *
	   * @example
	   * import { rights } from 'fp-ts/Array'
	   * import { right, left } from 'fp-ts/Either'
	   *
	   * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.rights = RA.rights;
	  /**
	   * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
	   *
	   * @example
	   * import { lefts } from 'fp-ts/Array'
	   * import { left, right } from 'fp-ts/Either'
	   *
	   * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.lefts = RA.lefts;
	  /**
	   * Sort the elements of an array in increasing order, creating a new array
	   *
	   * @example
	   * import { sort } from 'fp-ts/Array'
	   * import { ordNumber } from 'fp-ts/Ord'
	   *
	   * assert.deepStrictEqual(sort(ordNumber)([3, 2, 1]), [1, 2, 3])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.sort = RA.sort;
	  /**
	   * Apply a function to pairs of elements at the same index in two arrays, collecting the results in a new array. If one
	   * input array is short, excess elements of the longer array are discarded.
	   *
	   * @example
	   * import { zipWith } from 'fp-ts/Array'
	   *
	   * assert.deepStrictEqual(zipWith([1, 2, 3], ['a', 'b', 'c', 'd'], (n, s) => s + n), ['a1', 'b2', 'c3'])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.zipWith = RA.zipWith; // TODO: remove non-curried overloading in v3

	  /**
	   * Takes two arrays and returns an array of corresponding pairs. If one input array is short, excess elements of the
	   * longer array are discarded
	   *
	   * @example
	   * import { zip } from 'fp-ts/Array'
	   * import { pipe } from 'fp-ts/function'
	   *
	   * assert.deepStrictEqual(pipe([1, 2, 3], zip(['a', 'b', 'c', 'd'])), [[1, 'a'], [2, 'b'], [3, 'c']])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.zip = RA.zip;
	  /**
	   * The function is reverse of `zip`. Takes an array of pairs and return two corresponding arrays
	   *
	   * @example
	   * import { unzip } from 'fp-ts/Array'
	   *
	   * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
	   *
	   * @since 2.0.0
	   */

	  exports.unzip = RA.unzip;
	  /**
	   * Rotate an array to the right by `n` steps
	   *
	   * @example
	   * import { rotate } from 'fp-ts/Array'
	   *
	   * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.rotate = RA.rotate; // TODO: remove non-curried overloading in v3

	  /**
	   * Test if a value is a member of an array. Takes a `Eq<A>` as a single
	   * argument which returns the function to use to search for a value of type `A` in
	   * an array of type `Array<A>`.
	   *
	   * @example
	   * import { elem } from 'fp-ts/Array'
	   * import { eqNumber } from 'fp-ts/Eq'
	   * import { pipe } from 'fp-ts/function'
	   *
	   * assert.strictEqual(pipe([1, 2, 3], elem(eqNumber)(2)), true)
	   * assert.strictEqual(pipe([1, 2, 3], elem(eqNumber)(0)), false)
	   *
	   * @since 2.0.0
	   */

	  exports.elem = RA.elem;
	  /**
	   * Remove duplicates from an array, keeping the first occurrence of an element.
	   *
	   * @example
	   * import { uniq } from 'fp-ts/Array'
	   * import { eqNumber } from 'fp-ts/Eq'
	   *
	   * assert.deepStrictEqual(uniq(eqNumber)([1, 2, 1]), [1, 2])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.uniq = RA.uniq;
	  /**
	   * Sort the elements of an array in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
	   * etc...
	   *
	   * @example
	   * import { sortBy } from 'fp-ts/Array'
	   * import { ord, ordString, ordNumber } from 'fp-ts/Ord'
	   *
	   * interface Person {
	   *   name: string
	   *   age: number
	   * }
	   * const byName = ord.contramap(ordString, (p: Person) => p.name)
	   * const byAge = ord.contramap(ordNumber, (p: Person) => p.age)
	   *
	   * const sortByNameByAge = sortBy([byName, byAge])
	   *
	   * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
	   * assert.deepStrictEqual(sortByNameByAge(persons), [
	   *   { name: 'a', age: 1 },
	   *   { name: 'b', age: 2 },
	   *   { name: 'b', age: 3 },
	   *   { name: 'c', age: 2 }
	   * ])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.sortBy = RA.sortBy;
	  /**
	   * A useful recursion pattern for processing an array to produce a new array, often used for "chopping" up the input
	   * array. Typically chop is called with some function that will consume an initial prefix of the array and produce a
	   * value and the rest of the array.
	   *
	   * @example
	   * import { Eq, eqNumber } from 'fp-ts/Eq'
	   * import { chop, spanLeft } from 'fp-ts/Array'
	   *
	   * const group = <A>(S: Eq<A>): ((as: Array<A>) => Array<Array<A>>) => {
	   *   return chop(as => {
	   *     const { init, rest } = spanLeft((a: A) => S.equals(a, as[0]))(as)
	   *     return [init, rest]
	   *   })
	   * }
	   * assert.deepStrictEqual(group(eqNumber)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.chop = RA.chop;
	  /**
	   * Splits an array into two pieces, the first piece has `n` elements.
	   *
	   * @example
	   * import { splitAt } from 'fp-ts/Array'
	   *
	   * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
	   *
	   * @since 2.0.0
	   */

	  exports.splitAt = RA.splitAt;
	  /**
	   * Splits an array into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
	   * the array. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
	   * definition of `chunksOf`; it satisfies the property that
	   *
	   * ```ts
	   * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
	   * ```
	   *
	   * whenever `n` evenly divides the length of `xs`.
	   *
	   * @example
	   * import { chunksOf } from 'fp-ts/Array'
	   *
	   * assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
	   *
	   * @since 2.0.0
	   */

	  exports.chunksOf = RA.chunksOf;

	  function comprehension(input, f, g) {
	    if (g === void 0) {
	      g = function g() {
	        return true;
	      };
	    }

	    return RA.comprehension(input, f, g);
	  }

	  exports.comprehension = comprehension; // TODO: remove non-curried overloading in v3

	  /**
	   * Creates an array of unique values, in order, from all given arrays using a `Eq` for equality comparisons
	   *
	   * @example
	   * import { union } from 'fp-ts/Array'
	   * import { eqNumber } from 'fp-ts/Eq'
	   * import { pipe } from 'fp-ts/function'
	   *
	   * assert.deepStrictEqual(pipe([1, 2], union(eqNumber)([2, 3])), [1, 2, 3])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.union = RA.union; // TODO: remove non-curried overloading in v3

	  /**
	   * Creates an array of unique values that are included in all given arrays using a `Eq` for equality
	   * comparisons. The order and references of result values are determined by the first array.
	   *
	   * @example
	   * import { intersection } from 'fp-ts/Array'
	   * import { eqNumber } from 'fp-ts/Eq'
	   * import { pipe } from 'fp-ts/function'
	   *
	   * assert.deepStrictEqual(pipe([1, 2], intersection(eqNumber)([2, 3])), [2])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.intersection = RA.intersection; // TODO: remove non-curried overloading in v3

	  /**
	   * Creates an array of array values not included in the other given array using a `Eq` for equality
	   * comparisons. The order and references of result values are determined by the first array.
	   *
	   * @example
	   * import { difference } from 'fp-ts/Array'
	   * import { eqNumber } from 'fp-ts/Eq'
	   * import { pipe } from 'fp-ts/function'
	   *
	   * assert.deepStrictEqual(pipe([1, 2], difference(eqNumber)([2, 3])), [1])
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.difference = RA.difference;
	  /**
	   * Wrap a value into the type constructor.
	   *
	   * @category Applicative
	   * @since 2.0.0
	   */

	  exports.of = RA.of; // -------------------------------------------------------------------------------------
	  // non-pipeables
	  // -------------------------------------------------------------------------------------

	  var map_ = RA.Monad.map;
	  var ap_ = RA.Monad.ap;
	  var chain_ = RA.Monad.chain;
	  var mapWithIndex_ = RA.FunctorWithIndex.mapWithIndex;
	  var filter_ = RA.Filterable.filter;
	  var filterMap_ = RA.Filterable.filterMap;
	  var partition_ = RA.Filterable.partition;
	  var partitionMap_ = RA.Filterable.partitionMap;
	  var filterWithIndex_ = RA.FilterableWithIndex.filterWithIndex;
	  var filterMapWithIndex_ = RA.FilterableWithIndex.filterMapWithIndex;
	  var partitionWithIndex_ = RA.FilterableWithIndex.partitionWithIndex;
	  var partitionMapWithIndex_ = RA.FilterableWithIndex.partitionMapWithIndex;
	  var reduce_ = RA.Foldable.reduce;
	  var foldMap_ = RA.Foldable.foldMap;
	  var reduceRight_ = RA.Foldable.reduceRight;
	  var traverse_ = RA.Traversable.traverse;
	  var alt_ = RA.Alternative.alt;
	  var reduceWithIndex_ = RA.FoldableWithIndex.reduceWithIndex;
	  var foldMapWithIndex_ = RA.FoldableWithIndex.foldMapWithIndex;
	  var reduceRightWithIndex_ = RA.FoldableWithIndex.reduceRightWithIndex;
	  var traverseWithIndex_ = RA.TraversableWithIndex.traverseWithIndex;
	  var extend_ = RA.Extend.extend;
	  var wither_ = RA.Witherable.wither;
	  var wilt_ = RA.Witherable.wilt; // -------------------------------------------------------------------------------------
	  // pipeables
	  // -------------------------------------------------------------------------------------

	  /**
	   * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
	   * use the type constructor `F` to represent some computational context.
	   *
	   * @category Functor
	   * @since 2.0.0
	   */

	  exports.map = RA.map;
	  /**
	   * Apply a function to an argument under a type constructor.
	   *
	   * @category Apply
	   * @since 2.0.0
	   */

	  exports.ap = RA.ap;
	  /**
	   * Combine two effectful actions, keeping only the result of the first.
	   *
	   * Derivable from `Apply`.
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.apFirst = RA.apFirst;
	  /**
	   * Combine two effectful actions, keeping only the result of the second.
	   *
	   * Derivable from `Apply`.
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.apSecond = RA.apSecond;
	  /**
	   * Composes computations in sequence, using the return value of one computation to determine the next computation.
	   *
	   * @category Monad
	   * @since 2.0.0
	   */

	  exports.chain = RA.chain;
	  /**
	   * @since 2.7.0
	   */

	  exports.chainWithIndex = RA.chainWithIndex;
	  /**
	   * Composes computations in sequence, using the return value of one computation to determine the next computation and
	   * keeping only the result of the first.
	   *
	   * Derivable from `Monad`.
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.chainFirst = RA.chainFirst;
	  /**
	   * @category FunctorWithIndex
	   * @since 2.0.0
	   */

	  exports.mapWithIndex = RA.mapWithIndex;
	  /**
	   * @category Compactable
	   * @since 2.0.0
	   */

	  exports.compact = RA.compact;
	  /**
	   * @category Compactable
	   * @since 2.0.0
	   */

	  exports.separate = RA.separate;
	  /**
	   * @category Filterable
	   * @since 2.0.0
	   */

	  exports.filter = RA.filter;
	  /**
	   * @category Filterable
	   * @since 2.0.0
	   */

	  exports.filterMap = RA.filterMap;
	  /**
	   * @category Filterable
	   * @since 2.0.0
	   */

	  exports.partition = RA.partition;
	  /**
	   * @category FilterableWithIndex
	   * @since 2.0.0
	   */

	  exports.partitionWithIndex = RA.partitionWithIndex;
	  /**
	   * @category Filterable
	   * @since 2.0.0
	   */

	  exports.partitionMap = RA.partitionMap;
	  /**
	   * @category FilterableWithIndex
	   * @since 2.0.0
	   */

	  exports.partitionMapWithIndex = RA.partitionMapWithIndex;
	  /**
	   * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
	   * types of kind `* -> *`.
	   *
	   * @category Alt
	   * @since 2.0.0
	   */

	  exports.alt = RA.alt;
	  /**
	   * @category FilterableWithIndex
	   * @since 2.0.0
	   */

	  exports.filterMapWithIndex = RA.filterMapWithIndex;
	  /**
	   * @category FilterableWithIndex
	   * @since 2.0.0
	   */

	  exports.filterWithIndex = RA.filterWithIndex;
	  /**
	   * @category Extend
	   * @since 2.0.0
	   */

	  exports.extend = RA.extend;
	  /**
	   * Derivable from `Extend`.
	   *
	   * @category combinators
	   * @since 2.0.0
	   */

	  exports.duplicate = RA.duplicate;
	  /**
	   * @category Foldable
	   * @since 2.0.0
	   */

	  exports.foldMap = RA.foldMap;
	  /**
	   * @category FoldableWithIndex
	   * @since 2.0.0
	   */

	  exports.foldMapWithIndex = RA.foldMapWithIndex;
	  /**
	   * @category Foldable
	   * @since 2.0.0
	   */

	  exports.reduce = RA.reduce;
	  /**
	   * @category FoldableWithIndex
	   * @since 2.0.0
	   */

	  exports.reduceWithIndex = RA.reduceWithIndex;
	  /**
	   * @category Foldable
	   * @since 2.0.0
	   */

	  exports.reduceRight = RA.reduceRight;
	  /**
	   * @category FoldableWithIndex
	   * @since 2.0.0
	   */

	  exports.reduceRightWithIndex = RA.reduceRightWithIndex;
	  /**
	   * @category Traversable
	   * @since 2.6.3
	   */

	  exports.traverse = RA.traverse;
	  /**
	   * @category Traversable
	   * @since 2.6.3
	   */

	  exports.sequence = RA.sequence;
	  /**
	   * @category TraversableWithIndex
	   * @since 2.6.3
	   */

	  exports.traverseWithIndex = RA.traverseWithIndex;
	  /**
	   * @category Witherable
	   * @since 2.6.5
	   */

	  exports.wither = RA.wither;
	  /**
	   * @category Witherable
	   * @since 2.6.5
	   */

	  exports.wilt = RA.wilt;
	  /**
	   * @category Unfoldable
	   * @since 2.6.6
	   */

	  exports.unfold = RA.unfold;
	  /**
	   * @category Alternative
	   * @since 2.7.0
	   */

	  exports.zero = RA.Alternative.zero; // -------------------------------------------------------------------------------------
	  // instances
	  // -------------------------------------------------------------------------------------

	  /**
	   * @category instances
	   * @since 2.0.0
	   */

	  exports.URI = 'Array';
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Functor = {
	    URI: exports.URI,
	    map: map_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.FunctorWithIndex = {
	    URI: exports.URI,
	    map: map_,
	    mapWithIndex: mapWithIndex_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Applicative = {
	    URI: exports.URI,
	    map: map_,
	    ap: ap_,
	    of: exports.of
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Monad = {
	    URI: exports.URI,
	    map: map_,
	    ap: ap_,
	    of: exports.of,
	    chain: chain_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Unfoldable = {
	    URI: exports.URI,
	    unfold: exports.unfold
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Alt = {
	    URI: exports.URI,
	    map: map_,
	    alt: alt_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Alternative = {
	    URI: exports.URI,
	    map: map_,
	    ap: ap_,
	    of: exports.of,
	    alt: alt_,
	    zero: exports.zero
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Extend = {
	    URI: exports.URI,
	    map: map_,
	    extend: extend_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Compactable = {
	    URI: exports.URI,
	    compact: exports.compact,
	    separate: exports.separate
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Filterable = {
	    URI: exports.URI,
	    map: map_,
	    compact: exports.compact,
	    separate: exports.separate,
	    filter: filter_,
	    filterMap: filterMap_,
	    partition: partition_,
	    partitionMap: partitionMap_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.FilterableWithIndex = {
	    URI: exports.URI,
	    map: map_,
	    mapWithIndex: mapWithIndex_,
	    compact: exports.compact,
	    separate: exports.separate,
	    filter: filter_,
	    filterMap: filterMap_,
	    partition: partition_,
	    partitionMap: partitionMap_,
	    partitionMapWithIndex: partitionMapWithIndex_,
	    partitionWithIndex: partitionWithIndex_,
	    filterMapWithIndex: filterMapWithIndex_,
	    filterWithIndex: filterWithIndex_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Foldable = {
	    URI: exports.URI,
	    reduce: reduce_,
	    foldMap: foldMap_,
	    reduceRight: reduceRight_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.FoldableWithIndex = {
	    URI: exports.URI,
	    reduce: reduce_,
	    foldMap: foldMap_,
	    reduceRight: reduceRight_,
	    reduceWithIndex: reduceWithIndex_,
	    foldMapWithIndex: foldMapWithIndex_,
	    reduceRightWithIndex: reduceRightWithIndex_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Traversable = {
	    URI: exports.URI,
	    map: map_,
	    reduce: reduce_,
	    foldMap: foldMap_,
	    reduceRight: reduceRight_,
	    traverse: traverse_,
	    sequence: exports.sequence
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.TraversableWithIndex = {
	    URI: exports.URI,
	    map: map_,
	    mapWithIndex: mapWithIndex_,
	    reduce: reduce_,
	    foldMap: foldMap_,
	    reduceRight: reduceRight_,
	    reduceWithIndex: reduceWithIndex_,
	    foldMapWithIndex: foldMapWithIndex_,
	    reduceRightWithIndex: reduceRightWithIndex_,
	    traverse: traverse_,
	    sequence: exports.sequence,
	    traverseWithIndex: traverseWithIndex_
	  };
	  /**
	   * @category instances
	   * @since 2.7.0
	   */

	  exports.Witherable = {
	    URI: exports.URI,
	    map: map_,
	    compact: exports.compact,
	    separate: exports.separate,
	    filter: filter_,
	    filterMap: filterMap_,
	    partition: partition_,
	    partitionMap: partitionMap_,
	    reduce: reduce_,
	    foldMap: foldMap_,
	    reduceRight: reduceRight_,
	    traverse: traverse_,
	    sequence: exports.sequence,
	    wither: wither_,
	    wilt: wilt_
	  }; // TODO: remove in v3

	  /**
	   * @category instances
	   * @since 2.0.0
	   */

	  exports.array = {
	    URI: exports.URI,
	    compact: exports.compact,
	    separate: exports.separate,
	    map: map_,
	    ap: ap_,
	    of: exports.of,
	    chain: chain_,
	    filter: filter_,
	    filterMap: filterMap_,
	    partition: partition_,
	    partitionMap: partitionMap_,
	    mapWithIndex: mapWithIndex_,
	    partitionMapWithIndex: partitionMapWithIndex_,
	    partitionWithIndex: partitionWithIndex_,
	    filterMapWithIndex: filterMapWithIndex_,
	    filterWithIndex: filterWithIndex_,
	    alt: alt_,
	    zero: exports.zero,
	    unfold: exports.unfold,
	    reduce: reduce_,
	    foldMap: foldMap_,
	    reduceRight: reduceRight_,
	    traverse: traverse_,
	    sequence: exports.sequence,
	    reduceWithIndex: reduceWithIndex_,
	    foldMapWithIndex: foldMapWithIndex_,
	    reduceRightWithIndex: reduceRightWithIndex_,
	    traverseWithIndex: traverseWithIndex_,
	    extend: extend_,
	    wither: wither_,
	    wilt: wilt_
	  }; // -------------------------------------------------------------------------------------
	  // unsafe
	  // -------------------------------------------------------------------------------------

	  /**
	   * @category unsafe
	   * @since 2.0.0
	   */

	  exports.unsafeInsertAt = RA.unsafeInsertAt;
	  /**
	   * @category unsafe
	   * @since 2.0.0
	   */

	  exports.unsafeUpdateAt = RA.unsafeUpdateAt;
	  /**
	   * @category unsafe
	   * @since 2.0.0
	   */

	  exports.unsafeDeleteAt = RA.unsafeDeleteAt; // -------------------------------------------------------------------------------------
	  // utils
	  // -------------------------------------------------------------------------------------

	  /**
	   * An empty array
	   *
	   * @since 2.0.0
	   */

	  exports.empty = []; // -------------------------------------------------------------------------------------
	  // do notation
	  // -------------------------------------------------------------------------------------

	  /**
	   * @since 2.8.0
	   */

	  exports.bindTo = RA.bindTo;
	  /**
	   * @since 2.8.0
	   */

	  exports.bind = RA.bind; // -------------------------------------------------------------------------------------
	  // pipeable sequence S
	  // -------------------------------------------------------------------------------------

	  /**
	   * @since 2.8.0
	   */

	  exports.apS = RA.apS;
	});
	var _Array_61 = _Array.difference;

	/**
	 * # Data Path
	 *
	 * A graph-like path structure.
	 *
	 * @packageDocumentation
	 */

	var EMPTY_ID = 'ø';
	var nodes = function nodes(p) {
	  return p.left === undefined ? [p] : [].concat(nodes(p.left), p.right ? nodes(p.right) : []);
	};
	var head = function head(p) {
	  return p.left === undefined ? p : head(p.left);
	};
	var tail = function tail(p) {
	  return p.right === undefined ? p : tail(p.right);
	}; // typeclass instances

	/**
	 * @category instances
	 * @since 0.2.7
	 */

	var URI = 'Path';
	var equalIdentity = function equalIdentity(n1, n2) {
	  return n1 === n2 || n1.id === n2.id;
	};
	var eqIdPath = {
	  equals: equalIdentity
	};
	/**
	 * Path equivalence based on node sequence.
	 *
	 * @param p1
	 * @param p2
	 */

	var equalNodePath = function equalNodePath(p1, p2) {
	  return p1 === p2 || p1.id === p2.id || _function_4(nodes(p1), _Array_61(eqIdPath)(nodes(p2))).length === 0;
	};
	var eqNodePath = {
	  equals: equalNodePath
	};
	function map(fa, f) {
	  return {
	    id: f(fa.id)
	  };
	}
	var functorPath = {
	  URI: URI,
	  map: map
	};
	var concat = function concat(p1, p2) {
	  return {
	    id: Symbol["for"]('a'),
	    left: p1,
	    right: p2
	  };
	};
	var semigroupPath = {
	  concat: concat
	};

	/**
	 * # Graph data types
	 *
	 * @packageDocumentation
	 */
	var empty = function empty() {
	  return of('ø');
	};
	var of = function of(id) {
	  return {
	    id: Symbol["for"](typeof id === 'string' ? id : String(id))
	  };
	};

	exports.EMPTY_ID = EMPTY_ID;
	exports.URI = URI;
	exports.concat = concat;
	exports.empty = empty;
	exports.eqIdPath = eqIdPath;
	exports.eqNodePath = eqNodePath;
	exports.equalIdentity = equalIdentity;
	exports.equalNodePath = equalNodePath;
	exports.functorPath = functorPath;
	exports.head = head;
	exports.map = map;
	exports.nodes = nodes;
	exports.of = of;
	exports.semigroupPath = semigroupPath;
	exports.tail = tail;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=gram-graph.umd.development.js.map

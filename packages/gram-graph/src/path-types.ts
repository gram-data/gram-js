import { Eq } from 'fp-ts/Eq';
import { Functor1 } from 'fp-ts/Functor';
import { difference } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { Semigroup } from 'fp-ts/lib/Semigroup';


/**
 * # Data Path
 * 
 * A graph-like path structure. 
 *
 * @packageDocumentation
 */

 export const EMPTY_ID = 'ø';

/**
 * Navigable relations to compose path expressions.
 * Gram includes one extra relation that is not
 * navigable, the ',' pair relation used only in
 * path composition and not allowed in Edge definition.
 *
 * One of:
 *
 * - left   `(a)<--(b)`
 * - right  `(a)-->(b)`
 * - either `(a)--(b)`
 * - self   `(a) =~ (a)--(a)`
 */
export type Orientation = 'left' | 'right' | 'either';

export type Association = Orientation | 'pair';

export type PropertyRecord = {[key: string]: any};

/**
 * The type of any path-like element.
 * 
 * Paths are ordered pairs of elements which carry
 * additional information in the form of:
 * 
 * .
 */
export interface Path<I=Symbol> {

  /**
   * A self-identifier.
   *
   */
  id: I;

  /**
   * The association between the left and right members,
   * members[0] (left) and members[1] (right).
   */
  // association?: Association;

  /**
   * Labels are content.
   *
   * For example, 'Aye' in (:Aye)
   */
  // labels?: string[];

  /**
   * The data content of the element.
   *
   */
  // record?: R

  // members?: [] | Path[];
  left?: Path;
  right?: Path;
}

export const nodes = (p:Path):Path[] => {
  return (p.left === undefined) ? [p] : [...nodes(p.left), ...(p.right ? nodes(p.right) : []) ]
}

export const head = (p:Path):Path => {
  return (p.left === undefined) ? p : head(p.left);
}

export const tail = (p:Path):Path => {
  return (p.right === undefined) ? p : tail(p.right);
}

// typeclass instances

/**
 * @category instances
 * @since 0.2.7
 */
export const URI = 'Path';

/**
 * @category instances
 * @since 0.2.7
 */
export type URI = typeof URI;

declare module 'fp-ts/lib/HKT' {
  interface URItoKind<A> {
    Path: Path<A>
  }
}
export declare const nil: Path<never>

export const equalIdentity = (n1:Path, n2:Path) => n1 === n2 || n1.id === n2.id

export const eqIdPath: Eq<Path> = {
  equals: equalIdentity
}

/**
 * Path equivalence based on node sequence.
 * 
 * @param p1
 * @param p2 
 */
export const equalNodePath = (p1:Path, p2:Path) => 
       p1 === p2
    || p1.id === p2.id
    || pipe(nodes(p1), difference(eqIdPath)(nodes(p2))).length === 0;

export const eqNodePath: Eq<Path> = {
  equals: equalNodePath
}

export function map<A, B>(fa: Path<A>, f: (a:A) => B): Path<B> {
  return { id: f(fa.id) }
}

export const functorPath: Functor1<URI> = {
  URI,
  map
}

export const concat = <A>(p1:Path<A>, p2:Path<A>) => ({
  id: Symbol.for('a'),
  left: p1,
  right: p2
})

export const semigroupPath: Semigroup<Path> = {
  concat
}
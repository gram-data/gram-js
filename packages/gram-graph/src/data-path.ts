/**
 * # Graph data types
 *
 * @packageDocumentation
 */


export const empty = () => of('ø');

export const of = (id:string|number) => ({id:Symbol.for(typeof id === 'string' ? id : String(id))})
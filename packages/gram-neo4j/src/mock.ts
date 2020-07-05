import { Integer, Node, Record } from 'neo4j-driver';
// @ts-ignore
import { int } from 'neo4j-driver/lib/integer.js';

type RecordObject = { [key: string]: Object };

export class MockNode implements Node {
  identity: Integer;
  labels: string[];
  properties: object;

  constructor(identity: number, labels: string[], properties: RecordObject) {
    this.identity = int(identity);
    this.labels = labels;
    this.properties = properties;
  }
}

export class MockRecord implements Record {
  keys: string[];
  _values: Object[];
  length: number;
  _o: RecordObject;

  constructor(o: Object) {
    this._o = Object.entries(o).reduce((agg, [k, v]) => {
      agg[k] = v;
      return agg;
    }, {} as RecordObject);
    this.keys = Object.getOwnPropertyNames(this._o);
    this._values = Object.values(this._o);
    this.length = this.keys.length;
  }

  forEach(visitor: (value: any, key: string, record: Record) => void): void {
    Object.entries(this._o).forEach(([k, v]) => visitor(v, k, this));
  }
  map<T>(visitor: (value: any, key: string, record: Record) => T): T[] {
    return Object.entries(this._o).map(([k, v]) => visitor(v, k, this));
  }
  entries(): IterableIterator<[string, Object]> {
    let generator = (function*(
      source: RecordObject
    ): Generator<[string, Object]> {
      for (let k in source) {
        yield [k, source[k]];
      }
    })(this._o);
    return generator;
  }
  values(): IterableIterator<Object> {
    let generator = (function*(source: RecordObject): Generator<Object> {
      for (let k in source) {
        yield source[k];
      }
    })(this._o);
    return generator;
  }
  [Symbol.iterator](): IterableIterator<Object> {
    throw new Error('Method not implemented.');
  }
  toObject(): object {
    return this._o;
  }
  get(key: string | number) {
    if (typeof key === 'string') {
      return this._o[key];
    }
    return this._values[key];
  }
  has(key: string | number): boolean {
    if (typeof key === 'string') {
      return this._o.hasOwnProperty(key);
    }
    return key < this.length;
  }
}

import * as g from '../../src/builder';
import { isGramLiteral, isGramRecord, isIntegerLiteral } from '../../src/ast';


describe('gram record lens getLiteral()', () => {
  it('with boolean values', () => {
    const value = true;
    const literal = g.boolean(value);
    const record = g.objectToRecord({k:literal})
    const getK = g.getLiteral('k');

    expect(getK(record)).toBe(String(value));
  });
  it('with string values', () => {
    const value = 'some text';
    const literal = g.string(value);
    const record = g.objectToRecord({k:literal})
    const getK = g.getLiteral('k');

    expect(getK(record)).toBe(String(value));
  });
  it('with integer values', () => {
    const value = 42;
    const literal = g.integer(value);
    const record = g.objectToRecord({k:literal})
    const getK = g.getLiteral('k');

    expect(getK(record)).toBe(String(value));
  });
  it('with tagged values', () => {
    const value = 'some text';
    const tag = 'test';
    const literal = g.tagged(tag, value);
    const record = g.objectToRecord({k:literal})
    const getK = g.getLiteral('k');

    expect(getK(record)).toBe(String(value));
  });
  it('with measurements values', () => {
    const value = 1280;
    const unit = 'px';
    const literal = g.measurement(unit, value);
    const record = g.objectToRecord({k:literal})
    const getK = g.getLiteral('k');

    expect(getK(record)).toBe(String(value));
  });
  it('with decimal values', () => {
    const value = 3.1495;
    const literal = g.decimal(value);
    const record = g.objectToRecord({k:literal})
    const getK = g.getLiteral('k');

    expect(getK(record)).toBe(String(value));
  });

  it('with hexadecimal values', () => {
    const value = '0xCAFE1234';
    const literal = g.hexadecimal(value);
    const record = g.objectToRecord({k:literal})
    const getK = g.getLiteral('k');

    expect(getK(record)).toBe(String(value));
  });

  it('with octal values', () => {
    const value = '01234';
    const literal = g.octal(value);
    const record = g.objectToRecord({k:literal})
    const getK = g.getLiteral('k');

    expect(getK(record)).toBe(String(value));
  });
  it('with tagged date values', () => {
    const value = new Date().toISOString();
    const tag = 'date';
    const literal = g.tagged(tag, value);
    const record = g.objectToRecord({k:literal})
    const getK = g.getLiteral('k');

    expect(getK(record)).toBe(String(value));
  });
  it('with tagged wkt values (geospatial)', () => {
    const value = 'POINT(-83.123 42.123)';
    const tag = 'wkt';
    const literal = g.tagged(tag, value);
    const record = g.objectToRecord({k:literal})
    const getK = g.getLiteral('k');

    expect(getK(record)).toBe(String(value));
  });
});


describe('gram record lens getRecord()', () => {
  it('with nested string', () => {
    const value = 'some text';
    const literal = g.string(value);
    const record = g.objectToRecord({r:{k:literal}})
    const getR = g.getRecord('r');
    const getK = g.getLiteral('k');

    expect(isGramRecord(getR(record))).toBeTruthy();
    expect(getK(getR(record)!)).toBe(String(value));
  });
});

describe('gram record lens getDown()', () => {
  it('with nested string', () => {
    const value = 'some text';
    const literal = g.string(value);
    const record = g.objectToRecord({r:{k:literal}})
    const getRK = g.getDown(['r', 'k'], g.getValue)

    expect(getRK(record)).toBe(String(value));
  });
  it('can use dot notation', () => {
    // NOTE: this code is used in the typedoc example. update that if you update this
     const o = g.objectToRecord({a:{b:{c:g.string("value")}}})
     const getAbc1 = g.getDown(['a','b','c']);
     const getAbc2 = g.getDown("a.b.c");
    
     expect(getAbc1(o)).toStrictEqual(getAbc2(o));
  });

  it('can use dot notation', () => {
    // NOTE: this code is used in the typedoc example. update that if you update this
    const o = g.objectToRecord({a:{b:{c:g.string("value")}}})
    const getAbc = g.getDown("a.b.c", g.getValue);
   
    expect(getAbc(o)).toBe("value");
 });
});
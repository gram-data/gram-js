import { GramPropertyMap } from '@gram-data/gram-ast';
import * as g from '@gram-data/gram-builder';
import { stringify } from '../src';

// const inspect = require('unist-util-inspect');

describe('gram stringify for records', () => {
  it('with boolean values', () => {
    const value = true;
    const record: GramPropertyMap = { k: g.boolean(value) };

    expect(stringify(record)).toBe(`{k:${value}}`);
  });
  it('with string values', () => {
    const value = 'some text';
    const record: GramPropertyMap = { k: g.string(value) };

    expect(stringify(record)).toBe(`{k:\`${value}\`}`);
  });
  it('with integer values', () => {
    const value = 42;
    const record = { k: g.integer(value) };

    expect(stringify(record)).toBe(`{k:${value}}`);
  });
  it('with tagged values', () => {
    const value = 'some text';
    const tag = 'test';
    const record = { k: g.tagged(tag, value) };

    expect(stringify(record)).toBe(`{k:${tag}\`${value}\`}`);
  });
  it('with measurement values', () => {
    const value = 1280;
    const unit = 'px';
    const record = { k: g.measurement(unit, value) };

    expect(stringify(record)).toBe(`{k:${value}${unit}}`);
  });
  //   it('with decimal values', () => {
  //     const value = 3.1495;
  //     const record = { k: g.decimal(value) };

  //     expect((record.k as gramTypes.DecimalLiteral).type).toBe('decimal');
  //     expect(gramTypes.isDecimalLiteral(record.k)).toBeTruthy();
  //     expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
  //   });

  //   it('with hexadecimal values', () => {
  //     const value = '0xCAFE1234';
  //     const record = { k: g.hexadecimal(value) };

  //     expect((record.k as gramTypes.HexadecimalLiteral).type).toBe('hexadecimal');
  //     expect(gramTypes.isHexadecimalLiteral(record.k)).toBeTruthy();
  //     expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
  //   });

  //   it('with octal values', () => {
  //     const value = '01234';
  //     const record = { k: g.octal(value) };

  //     expect((record.k as gramTypes.OctalLiteral).type).toBe('octal');
  //     expect(gramTypes.isOctalLiteral(record.k)).toBeTruthy();
  //     expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
  //   });
  //   it('with tagged date values', () => {
  //     const value = new Date().toISOString();
  //     const tag = 'date';
  //     const record = { k: g.tagged(tag, value) };

  //     expect((record.k as gramTypes.DateLiteral).type).toBe('tagged');
  //     expect(gramTypes.isDateLiteral(record.k)).toBeTruthy();
  //     expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
  //     expect((record.k as gramTypes.DateLiteral).tag).toBe(String(tag));
  //   });
  //   it('with tagged geo values', () => {
  //     const value = 'POINT(-83.123 42.123)';
  //     const tag = 'geo';
  //     const record = { k: g.tagged(tag, value) };

  //     expect((record.k as gramTypes.GeospatialLiteral).type).toBe('tagged');
  //     expect(gramTypes.isGeospatialLiteral(record.k)).toBeTruthy();
  //     expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
  //     expect((record.k as gramTypes.GeospatialLiteral).tag).toBe(String(tag));
  //   });
});

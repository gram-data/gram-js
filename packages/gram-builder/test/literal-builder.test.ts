import * as g from '../src';
import {
  BooleanLiteral,
  StringLiteral,
  IntegerLiteral,
  isBooleanLiteral,
  GramLiteral,
  isStringLiteral,
  isIntegerLiteral,
  TaggedLiteral,
  isTaggedLiteral,
  MeasurementLiteral,
  isMeasurementLiteral,
  DecimalLiteral,
  isDecimalLiteral,
  HexadecimalLiteral,
  isHexadecimalLiteral,
  OctalLiteral,
  isOctalLiteral,
  DateLiteral,
  isDateLiteral,
  WellKnownTextLiteral,
  isWellKnownTextLiteral
} from '@gram-data/gram-ast';

// import { Node as UnistNode } from 'unist';
// const inspect = require('unist-util-inspect');

/**
 * treeSize returns the number of exclusive descendents
 */
// const treeSize = require('unist-util-size');

// const show = (expected:string, actual:UnistNode) => {
//   console.log(expected, inspect(actual));
// }

describe('gram builder for literal values', () => {
  it('with boolean values', () => {
    const value = true;
    const literal = g.boolean(value);

    expect((literal as BooleanLiteral).type).toBe('boolean');
    expect(isBooleanLiteral(literal)).toBeTruthy();
    expect((literal as GramLiteral).value).toBe(String(value));
  });
  it('with string values', () => {
    const value = 'some text';
    const literal = g.string(value);

    expect((literal as StringLiteral).type).toBe('string');
    expect(isStringLiteral(literal)).toBeTruthy();
    expect((literal as GramLiteral).value).toBe(String(value));
  });
  it('with integer values', () => {
    const value = 42;
    const literal = g.integer(value);

    expect((literal as IntegerLiteral).type).toBe('integer');
    expect(isIntegerLiteral(literal)).toBeTruthy();
    expect((literal as GramLiteral).value).toBe(String(value));
  });
  it('with tagged values', () => {
    const value = 'some text';
    const tag = 'test';
    const literal = g.tagged(tag, value);

    expect((literal as TaggedLiteral).type).toBe('tagged');
    expect(isTaggedLiteral(literal)).toBeTruthy();
    expect((literal as GramLiteral).value).toBe(String(value));
    expect((literal as TaggedLiteral).tag).toBe(String(tag));
  });
  it('with measurements values', () => {
    const value = 1280;
    const unit = 'px';
    const literal = g.measurement(unit, value);

    expect((literal as MeasurementLiteral).type).toBe('measurement');
    expect(isMeasurementLiteral(literal)).toBeTruthy();
    expect((literal as GramLiteral).value).toBe(String(value));
    expect((literal as MeasurementLiteral).unit).toBe(String(unit));
  });
  it('with decimal values', () => {
    const value = 3.1495;
    const literal = g.decimal(value);

    expect((literal as DecimalLiteral).type).toBe('decimal');
    expect(isDecimalLiteral(literal)).toBeTruthy();
    expect((literal as GramLiteral).value).toBe(String(value));
  });

  it('with hexadecimal values', () => {
    const value = '0xCAFE1234';
    const literal =g.hexadecimal(value);

    expect((literal as HexadecimalLiteral).type).toBe('hexadecimal');
    expect(isHexadecimalLiteral(literal)).toBeTruthy();
    expect((literal as GramLiteral).value).toBe(String(value));
  });

  it('with octal values', () => {
    const value = '01234';
    const literal = g.octal(value);

    expect((literal as OctalLiteral).type).toBe('octal');
    expect(isOctalLiteral(literal)).toBeTruthy();
    expect((literal as GramLiteral).value).toBe(String(value));
  });
  it('with tagged date values', () => {
    const value = new Date().toISOString();
    const tag = 'date';
    const literal = g.tagged(tag, value);

    expect((literal as DateLiteral).type).toBe('tagged');
    expect(isDateLiteral(literal)).toBeTruthy();
    expect((literal as GramLiteral).value).toBe(String(value));
    expect((literal as DateLiteral).tag).toBe(String(tag));
  });
  it('with tagged wkt values (geospatial)', () => {
    const value = 'POINT(-83.123 42.123)';
    const tag = 'wkt';
    const literal = g.tagged(tag, value);

    expect((literal as WellKnownTextLiteral).type).toBe('tagged');
    expect(isWellKnownTextLiteral(literal)).toBeTruthy();
    expect((literal as GramLiteral).value).toBe(String(value));
    expect((literal as WellKnownTextLiteral).tag).toBe(String(tag));
  });
});

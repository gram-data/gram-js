import * as g from '../src';
import {
  GramLiteral,
  isIntegerLiteral,
  isGramRecord,
  isStringLiteral,
  isBooleanLiteral,
  isGramLiteralArray,
  GramRecord,
  BooleanLiteral,
  DateLiteral,
  DecimalLiteral,
  HexadecimalLiteral,
  IntegerLiteral,
  isDateLiteral,
  isDecimalLiteral,
  isHexadecimalLiteral,
  isMeasurementLiteral,
  isOctalLiteral,
  isTaggedLiteral,
  isWellKnownTextLiteral,
  MeasurementLiteral,
  OctalLiteral,
  StringLiteral,
  TaggedLiteral,
  WellKnownTextLiteral,
} from '@gram-data/gram-ast';


describe('gram builder for records', () => {
  it('with boolean values', () => {
    const value = true;
    const record = g.mapToRecord({ k: g.boolean(value) });
    const pluckedProperty = g.pluck(record, 'k');

    expect(isGramRecord(record)).toBeTruthy();
    expect(pluckedProperty.name).toBe('k');
    expect(isBooleanLiteral(pluckedProperty.value)).toBeTruthy();
    expect((pluckedProperty.value as BooleanLiteral).value).toBe(String(value));
  });
  it('with string values', () => {
    const value = 'some text';
    const record = g.mapToRecord({ k: g.string(value) });
    const pluckedProperty = g.pluck(record, 'k');

    expect(isGramRecord(record)).toBeTruthy();
    expect(pluckedProperty.name).toBe('k');
    expect(isStringLiteral(pluckedProperty.value)).toBeTruthy();
    expect((pluckedProperty.value as StringLiteral).value).toBe(String(value));
  });
  it('with integer values', () => {
    const value = 42;
    const record = { k: g.integer(value) };

    expect((record.k as IntegerLiteral).type).toBe('integer');
    expect(isIntegerLiteral(record.k)).toBeTruthy();
    expect((record.k as GramLiteral).value).toBe(String(value));
  });
  it('with tagged values', () => {
    const value = 'some text';
    const tag = 'test';
    const record = { k: g.tagged(tag, value) };

    expect((record.k as TaggedLiteral).type).toBe('tagged');
    expect(isTaggedLiteral(record.k)).toBeTruthy();
    expect((record.k as GramLiteral).value).toBe(String(value));
    expect((record.k as TaggedLiteral).tag).toBe(String(tag));
  });
  it('with measurements values', () => {
    const value = 1280;
    const unit = 'px';
    const record = { k: g.measurement(unit, value) };

    expect((record.k as MeasurementLiteral).type).toBe('measurement');
    expect(isMeasurementLiteral(record.k)).toBeTruthy();
    expect((record.k as GramLiteral).value).toBe(String(value));
    expect((record.k as MeasurementLiteral).unit).toBe(String(unit));
  });
  it('with decimal values', () => {
    const value = 3.1495;
    const record = { k: g.decimal(value) };

    expect((record.k as DecimalLiteral).type).toBe('decimal');
    expect(isDecimalLiteral(record.k)).toBeTruthy();
    expect((record.k as GramLiteral).value).toBe(String(value));
  });

  it('with hexadecimal values', () => {
    const value = '0xCAFE1234';
    const record = { k: g.hexadecimal(value) };

    expect((record.k as HexadecimalLiteral).type).toBe('hexadecimal');
    expect(isHexadecimalLiteral(record.k)).toBeTruthy();
    expect((record.k as GramLiteral).value).toBe(String(value));
  });

  it('with octal values', () => {
    const value = '01234';
    const record = { k: g.octal(value) };

    expect((record.k as OctalLiteral).type).toBe('octal');
    expect(isOctalLiteral(record.k)).toBeTruthy();
    expect((record.k as GramLiteral).value).toBe(String(value));
  });
  it('with tagged date values', () => {
    const value = new Date().toISOString();
    const tag = 'date';
    const record = { k: g.tagged(tag, value) };

    expect((record.k as DateLiteral).type).toBe('tagged');
    expect(isDateLiteral(record.k)).toBeTruthy();
    expect((record.k as GramLiteral).value).toBe(String(value));
    expect((record.k as DateLiteral).tag).toBe(String(tag));
  });
  it('with tagged wkt values (geospatial)', () => {
    const value = 'POINT(-83.123 42.123)';
    const tag = 'wkt';
    const record = { k: g.tagged(tag, value) };

    expect((record.k as WellKnownTextLiteral).type).toBe('tagged');
    expect(isWellKnownTextLiteral(record.k)).toBeTruthy();
    expect((record.k as GramLiteral).value).toBe(String(value));
    expect((record.k as WellKnownTextLiteral).tag).toBe(String(tag));
  });
});

describe('gram builder.mapToRecord()', () => {
  it('can construct single level, single property, primitive value records', () => {
    const value = 42;
    const record = g.mapToRecord({ k: g.integer(value) });
    const pluckedProperty = g.pluck(record, 'k');

    expect(isGramRecord(record)).toBeTruthy();
    expect(pluckedProperty.name).toBe('k');
    expect(isIntegerLiteral(pluckedProperty.value)).toBeTruthy();
    expect((pluckedProperty.value as GramLiteral).value).toBe(String(value));
  });
  it('can construct single level, multiple property, primitive value records', () => {
    // {n:1, s:'a', b:true}
    const record = g.mapToRecord({ n: g.integer(1), s: g.string('a'), b: g.boolean(true) });

    expect(isGramRecord(record)).toBeTruthy();
    expect(isIntegerLiteral(g.pluck(record, 'n').value)).toBeTruthy();
    expect(isStringLiteral(g.pluck(record, 's').value)).toBeTruthy();
    expect(isBooleanLiteral(g.pluck(record, 'b').value)).toBeTruthy();
  });
  it('can construct single level, single property, array value records', () => {
    const values = [42, 64, 1024];
    // {k:[42,64,1024]}
    const record = g.mapToRecord({ k: values.map(g.integer) });
    const pluckedProperty = g.pluck(record, 'k');
    
    expect(isGramRecord(record)).toBeTruthy();
    expect(pluckedProperty.name).toBe('k');
    expect(isGramLiteralArray(pluckedProperty.value)).toBeTruthy();
    expect((pluckedProperty.value as GramLiteral[]).map((v:GramLiteral) => v.value))
      .toStrictEqual(expect.arrayContaining(values.map(v => String(v))));
  });

  it('can construct two-level, multi-property, primitive value records', () => {
    // {n:1, s:'path s', b:true, m:{s:"path m.s", m:{s:"path m.m.s"}}}
    const record = g.mapToRecord({ 
      n: g.integer(1), s: g.string('path s'), b: g.boolean(true),
      m: g.mapToRecord({
        s: g.string('path m.s'),
        m: g.mapToRecord({
          s: g.string('path m.m.s')
        })
      })
    });
    expect(isGramRecord(record)).toBeTruthy();
    expect(isIntegerLiteral(g.pluck(record, 'n').value)).toBeTruthy();
    expect(isStringLiteral(g.pluck(record, 's').value)).toBeTruthy();
    expect(isBooleanLiteral(g.pluck(record, 'b').value)).toBeTruthy();
    expect(isGramRecord(g.pluck(record, 'm').value)).toBeTruthy();
    expect(isGramRecord(g.pluck(g.pluck(record, 'm').value as GramRecord, 'm').value)).toBeTruthy();
  });
});

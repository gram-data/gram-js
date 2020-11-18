import * as g from '../src';
import {
  GramLiteral,
  isIntegerLiteral,
  isGramRecord,
  isStringLiteral,
  isBooleanLiteral,
  isGramLiteralArray,
  GramRecord,
} from '@gram-data/gram-ast';


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

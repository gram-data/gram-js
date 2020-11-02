import { builder as g } from '@gram-data/gram-builder';
// import {Relation} from '@gram-data/gram-ast';
import { stringify } from '../src/';

// const inspect = require('unist-util-inspect');

describe('gram stringify for empty paths', () => {
  it('omits empty paths, [ø] => ""', () => {
    const p = g.empty();
    // console.log(inspect(p));
    expect(stringify(p)).toBe('');
  });
});

describe('gram stringify for basic node patterns', () => {
  it('shows unidentified nodes, () => "()"', () => {
    const p = g.node();
    // console.log(inspect(p));
    expect(stringify(p)).toBe('()');
  });
  it('shows identified nodes, (n) => "(n)"', () => {
    const p = g.node('n');
    // console.log(inspect(p));
    expect(stringify(p)).toBe('(n)');
  });
  it('shows a labled nodes, (:Thing) => "(:Thing)"', () => {
    const p = g.node(undefined, ['Thing']);
    // console.log(inspect(p));
    expect(stringify(p)).toBe('(:Thing)');
  });
  it('shows a node with record, ({k:"v"}) => "({k:`v`})"', () => {
    const record = g.unfoldProperties({ k: g.string('v') });
    const p = g.node(undefined, undefined, record);
    // console.log(inspect(p));
    expect(stringify(p)).toBe('({k:`v`})');
  });
  it('shows a fully specified node, (n:Thing {k:"v"}) => "(n:Thing {k:`v`})"', () => {
    const record = g.unfoldProperties({ k: g.string('v') });
    const p = g.node('n', ['Thing'], record);
    // console.log(inspect(p));
    expect(stringify(p)).toBe('(n:Thing {k:`v`})');
  });
});

describe('gram stringify for basic edge patterns', () => {
  it('shows unidentified edges, ()--() => "()--()"', () => {
    const p = g.edge([g.node(), g.node()], 'either');
    // console.log(inspect(p));
    expect(stringify(p)).toBe('()--()');
  });
  it('shows identified edges, ()-[e]-() => "()-[e]-()"', () => {
    const p = g.edge([g.node(), g.node()], 'either', 'e');
    // console.log(inspect(p));
    expect(stringify(p)).toBe('()-[e]-()');
  });
  it('shows labled edges, ()-[:THEN]-() => "()-[:THEN]-()"', () => {
    const p = g.edge([g.node(), g.node()], 'either', undefined, ['THEN']);
    // console.log(inspect(p));
    expect(stringify(p)).toBe('()-[:THEN]-()');
  });
  it('shows an edge with record, ()-[{k:"v"}]-() => "()-[k:`v`]-()"', () => {
    const record = g.unfoldProperties({ k: g.string('v') });
    const p = g.edge(
      [g.node(), g.node()],
      'either',
      undefined,
      undefined,
      record
    );
    // console.log(inspect(p));
    expect(stringify(p)).toBe('()-[{k:`v`}]-()');
  });
  it('shows a fully specified edge, ()-[e:THEN {k:"v"}]-() => "()-[e:THEN k:`v`]-()"', () => {
    const record = g.unfoldProperties({ k: g.string('v') });
    const p = g.edge([g.node(), g.node()], 'either', 'e', ['THEN'], record);
    // console.log(inspect(p));
    expect(stringify(p)).toBe('()-[e:THEN {k:`v`}]-()');
  });
});

describe('gram stringify of pairwise paths', () => {
  it('shows two paired nodes, [p () ()] as "[p , () ()]', () => {
    const p = g.cons([g.node(), g.node()], { id: 'p' });
    // console.log(inspect(p));
    expect(stringify(p)).toBe('[p , () ()]');
  });
  it('shows two paired named nodes, [p (a) (b)] as "[p , (a) (b)]', () => {
    const p = g.cons([g.node('a'), g.node('b')], { id: 'p' });
    // console.log(inspect(p));
    expect(stringify(p)).toBe('[p , (a) (b)]');
  });
  it('shows one node paired with an empty path, [p () [ø]] as "[p ()]', () => {
    const p = g.cons([g.node(), g.empty()], { id: 'p' });
    // console.log(inspect(p));
    expect(stringify(p)).toBe('[p ()]');
  });
  it('shows one empty path paired with a node, [p [ø] ()] as "[p ()]', () => {
    const p = g.cons([g.empty(), g.node()], { id: 'p' });
    // console.log(inspect(p));
    expect(stringify(p)).toBe('[p ()]');
  });
  it('shows a single node with an implied ø rhs, [p ()] as "[p ()]', () => {
    const p = g.cons([g.empty(), g.node()], { id: 'p' });
    // console.log(inspect(p));
    expect(stringify(p)).toBe('[p ()]');
  });
  it('shows two paired edges, [p , ()--() ()--()] as "[p , ()--() ()--()]', () => {
    const p = g.cons(
      [
        g.edge([g.node(), g.node()], 'either'),
        g.edge([g.node(), g.node()], 'either'),
      ],
      { id: 'p' }
    );
    // console.log(inspect(p));
    expect(stringify(p)).toBe('[p , ()--() ()--()]');
  });
});

// describe('gram builder for records', () => {
//   it('with boolean values', () => {
//     const value = true;
//     const record = { k: g.boolean(value) };

//     expect((record.k as gramTypes.BooleanLiteral).type).toBe('boolean');
//     expect(gramTypes.isBooleanLiteral(record.k)).toBeTruthy();
//     expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
//   });
//   it('with string values', () => {
//     const value = 'some text';
//     const record = { k: g.string(value) };

//     expect((record.k as gramTypes.StringLiteral).type).toBe('string');
//     expect(gramTypes.isStringLiteral(record.k)).toBeTruthy();
//     expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
//   });
//   it('with integer values', () => {
//     const value = 42;
//     const record = { k: g.integer(value) };

//     expect((record.k as gramTypes.IntegerLiteral).type).toBe('integer');
//     expect(gramTypes.isIntegerLiteral(record.k)).toBeTruthy();
//     expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
//   });
//   it('with tagged values', () => {
//     const value = 'some text';
//     const tag = 'test';
//     const record = { k: g.tagged(tag, value) };

//     expect((record.k as gramTypes.TaggedLiteral).type).toBe('tagged');
//     expect(gramTypes.isTaggedLiteral(record.k)).toBeTruthy();
//     expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
//     expect((record.k as gramTypes.TaggedLiteral).tag).toBe(String(tag));
//   });
//   it('with unit values', () => {
//     const value = 1280;
//     const unit = 'px';
//     const record = { k: g.unit(unit, value) };

//     expect((record.k as gramTypes.UnitLiteral).type).toBe('unit');
//     expect(gramTypes.isUnitLiteral(record.k)).toBeTruthy();
//     expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
//     expect((record.k as gramTypes.UnitLiteral).unit).toBe(String(unit));
//   });
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
// });

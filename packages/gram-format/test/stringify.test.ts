import * as builder from '../src/gram-builder';
import * as ast from '../src/gram-ast';
import { leftNodeOf, rightNodeOf } from '../src/gram-find';
import stringify from '../src/gram-stringify';

describe('gram stringify for defined paths', () => {
  it('ignores undefined paths', () => {
    const path = builder.path();
    expect(stringify(path)).toBe('');
  });
  it('ignores empty labels', () => {
    const path = builder.path(undefined, undefined, []);
    expect(stringify(path)).toBe('');
  });
  it('ignores empty records', () => {
    const path = builder.path(undefined, undefined, undefined, {});
    expect(stringify(path)).toBe('');
  });
});

describe('gram builder for records', () => {
  it('with boolean values', () => {
    const value = true;
    const record = { k: builder.boolean(value) };

    expect((record.k as ast.BooleanLiteral).type).toBe('boolean');
    expect(ast.isBooleanLiteral(record.k)).toBeTruthy();
    expect((record.k as ast.Literal).value).toBe(String(value));
  });
  it('with string values', () => {
    const value = 'some text';
    const record = { k: builder.string(value) };

    expect((record.k as ast.StringLiteral).type).toBe('string');
    expect(ast.isStringLiteral(record.k)).toBeTruthy();
    expect((record.k as ast.Literal).value).toBe(String(value));
  });
  it('with integer values', () => {
    const value = 42;
    const record = { k: builder.integer(value) };

    expect((record.k as ast.IntegerLiteral).type).toBe('integer');
    expect(ast.isIntegerLiteral(record.k)).toBeTruthy();
    expect((record.k as ast.Literal).value).toBe(String(value));
  });
  it('with tagged values', () => {
    const value = 'some text';
    const tag = 'test';
    const record = { k: builder.tagged(tag, value) };

    expect((record.k as ast.TaggedLiteral).type).toBe('tagged');
    expect(ast.isTaggedLiteral(record.k)).toBeTruthy();
    expect((record.k as ast.Literal).value).toBe(String(value));
    expect((record.k as ast.TaggedLiteral).tag).toBe(String(tag));
  });
  it('with unit values', () => {
    const value = 1280;
    const unit = 'px';
    const record = { k: builder.unit(unit, value) };

    expect((record.k as ast.UnitLiteral).type).toBe('unit');
    expect(ast.isUnitLiteral(record.k)).toBeTruthy();
    expect((record.k as ast.Literal).value).toBe(String(value));
    expect((record.k as ast.UnitLiteral).unit).toBe(String(unit));
  });
  it('with decimal values', () => {
    const value = 3.1495;
    const record = { k: builder.decimal(value) };

    expect((record.k as ast.DecimalLiteral).type).toBe('decimal');
    expect(ast.isDecimalLiteral(record.k)).toBeTruthy();
    expect((record.k as ast.Literal).value).toBe(String(value));
  });

  it('with hexadecimal values', () => {
    const value = '0xCAFE1234';
    const record = { k: builder.hexadecimal(value) };

    expect((record.k as ast.HexadecimalLiteral).type).toBe('hexadecimal');
    expect(ast.isHexadecimalLiteral(record.k)).toBeTruthy();
    expect((record.k as ast.Literal).value).toBe(String(value));
  });

  it('with octal values', () => {
    const value = '01234';
    const record = { k: builder.octal(value) };

    expect((record.k as ast.OctalLiteral).type).toBe('octal');
    expect(ast.isOctalLiteral(record.k)).toBeTruthy();
    expect((record.k as ast.Literal).value).toBe(String(value));
  });
  it('with tagged date values', () => {
    const value = new Date().toISOString();
    const tag = 'date';
    const record = { k: builder.tagged(tag, value) };

    expect((record.k as ast.DateLiteral).type).toBe('tagged');
    expect(ast.isDateLiteral(record.k)).toBeTruthy();
    expect((record.k as ast.Literal).value).toBe(String(value));
    expect((record.k as ast.DateLiteral).tag).toBe(String(tag));
  });
  it('with tagged geo values', () => {
    const value = 'POINT(-83.123 42.123)';
    const tag = 'geo';
    const record = { k: builder.tagged(tag, value) };

    expect((record.k as ast.GeospatialLiteral).type).toBe('tagged');
    expect(ast.isGeospatialLiteral(record.k)).toBeTruthy();
    expect((record.k as ast.Literal).value).toBe(String(value));
    expect((record.k as ast.GeospatialLiteral).tag).toBe(String(tag));
  });
});

describe('gram builder for nodes', () => {
  it('can create empty nodes', () => {
    const singleNode = builder.node();
    expect(singleNode.record).toBeUndefined();
  });
  it('can identify nodes', () => {
    const nodeId = 'a';
    const singleNode = builder.node(nodeId);
    expect(singleNode.id).toBe(nodeId);
  });
  it('can label nodes', () => {
    const label = 'Aye';
    const singleNode = builder.node(undefined, [label]);
    expect(singleNode.labels).toContain(label);
  });
  it('can attach records', () => {
    const record = { a: builder.boolean(false), b: builder.string('hello'), c: builder.integer(42) };
    const singleNode = builder.node(undefined, undefined, record);

    expect(singleNode.record).toBeDefined();
    expect((singleNode.record?.a as ast.BooleanLiteral).type).toBe('boolean');
    expect((singleNode.record?.b as ast.StringLiteral).type).toBe('string');
    expect((singleNode.record?.c as ast.IntegerLiteral).type).toBe('integer');
  });
});

describe('gram builder for edges', () => {
  it('can create empty edges', () => {
    const edge = builder.edge([builder.node(), builder.node()]);

    expect(leftNodeOf(edge)).toBeDefined();
    expect(rightNodeOf(edge)).toBeDefined();
  });
  it('defaults to right direction', () => {
    const edge = builder.edge([builder.node(), builder.node()]);

    expect(edge.direction).toBe('right');
  });
  it('can specify edge direction as "right"', () => {
    const edge = builder.edge([builder.node(), builder.node()], 'right');

    expect(edge.direction).toBe('right');
  });
  it('can specify edge direction as "left"', () => {
    const edge = builder.edge([builder.node(), builder.node()], 'left');

    expect(edge.direction).toBe('left');
  });
  it('can specify edge direction as "none"', () => {
    const edge = builder.edge([builder.node(), builder.node()], 'none');

    expect(edge.direction).toBe('none');
  });
  it('can identify edges', () => {
    const edgeId = 'a';
    const edge = builder.edge([builder.node(), builder.node()], undefined, edgeId);
    expect(edge.id).toBe(edgeId);
  });
  it('can label edges', () => {
    const label = 'Aye';
    const edge = builder.edge([builder.node(), builder.node()], undefined, undefined, [label]);
    expect(edge.labels).toContain(label);
  });
  it('can attach records', () => {
    const record = { a: builder.boolean(false), b: builder.string('hello'), c: builder.integer(42) };
    const edge = builder.edge([builder.node(), builder.node()], undefined, undefined, undefined, record);

    expect(edge.record).toBeDefined();
    expect((edge.record?.a as ast.BooleanLiteral).type).toBe('boolean');
    expect((edge.record?.b as ast.StringLiteral).type).toBe('string');
    expect((edge.record?.c as ast.IntegerLiteral).type).toBe('integer');
  });
});

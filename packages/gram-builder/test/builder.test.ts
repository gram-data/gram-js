import * as g from '../src/';
import * as gramTypes from '@gram-data/gram-ast';
import { isGramNode } from '@gram-data/gram-ast';


// const inspect = require('unist-util-inspect'});
// console.log(inspect(p));

describe('gram cons can build units', () => {
  it('[] as a unit', () => {
    const p = g.cons({operands:[]});
    expect(gramTypes.isGramUnit(p)).toBeTruthy();
    expect(p.children).toHaveLength(0);
  });

  it('[[]] as a unit (hoist through empty parent)', () => {
    const p = g.cons({operands:[g.UNIT]});
    expect(gramTypes.isGramUnit(p)).toBeTruthy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(p.children).toHaveLength(0);
  });

  it('[[[]]] as a unit (hoist through all empty ancestors)', () => {
    const child = g.UNIT;
    const parent = g.cons({operands:[child]});
    const p = g.cons({operands:[parent]});
    expect(gramTypes.isGramUnit(p)).toBeTruthy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(p.children).toHaveLength(0);
  });


  it('[[],[]] as a unit (explicit form of [[]])', () => {
    const left = g.UNIT;
    const right = g.UNIT;
    const parent = g.cons({operands:[left, right]});
    const p = g.cons({operands:[parent]});
    expect(gramTypes.isGramUnit(p)).toBeTruthy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(p.children).toHaveLength(0);
  });
});

describe('gram cons can build nodes', () => {
  it('[n] as a defined node ', () => {
    const p = g.cons({operands:[], id:'n'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeTruthy();
    expect(p.children).toHaveLength(0);
  });

  it('[[n]] as a defined node (hoisted through empty parent)', () => {
    const p = g.cons({operands:[g.UNIT], id:'n'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeTruthy();
    expect(p.children).toHaveLength(0);
  });

  it('[n[]] as a defined node with no children (dropped unit child)', () => {
    const p = g.cons({operands:[g.UNIT], id:'n'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeTruthy();
    expect(p.children).toHaveLength(0);
  });
});

describe('gram cons can build edges', () => {
  it('[e [n1][n2]] is not yet an edge, but a path with a pair of nodes', () => {
    const left = g.cons({operands:[], id:'n1'});
    const right = g.cons({operands:[], id:'n2'});
    const p = g.cons({operands:[left,right], id:'e'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(p.direction).toBe('pair');
    expect(gramTypes.isGramNode(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[1])).toBeTruthy();
  });

  it('[e -> [n1][n2]] is not yet an edge, but a path with a pair of nodes', () => {
    const left = g.cons({operands:[], id:'n1'});
    const right = g.cons({operands:[], id:'n2'});
    const p = g.cons({operands:[left,right], id:'e'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(p.direction).toBe('pair');
    expect(gramTypes.isGramNode(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[1])).toBeTruthy();
  });

  it('with a single nested unit [p []], which gets dropped, producing a node', () => {
    const inner = g.cons({operands:[]})
    const p = g.cons({operands:[inner], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeFalsy();
    expect(p.children).toHaveLength(0);
  });

  it('with a single nested node', () => {
    const inner = g.cons({operands:[], id:'a'});
    const p = g.cons({operands:[inner], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[0])).toBeTruthy();
  });

  it('with a single nested edge [p [e --> [a][b]] ]', () => {
    const left = g.cons({operands:[], id:'a'});
    const right = g.cons({operands:[], id:'b'});
    const inner = g.cons({operands:[left,right], operator:'right', id:'e'});
    const p = g.cons({operands:[inner], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p.children[0])).toBeTruthy();
  });

  it('with a single nested path', () => {
    const node = g.cons({operands:[], id:'a'});
    const inner = g.cons({operands:[node], id:'innerP'});
    const p = g.cons({operands:[inner], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramPath(p.children[0])).toBeTruthy();
  });

  it('with a single nested path', () => {
    const node = g.cons({operands:[], id:'a'});
    const inner = g.cons({operands:[node], id:'innerP'});
    const p = g.cons({operands:[inner], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramPath(p.children[0])).toBeTruthy();
  });

  it('from two edges', () => {
    const nodeA = g.cons({operands:[], id:'a'});
    const nodeB = g.cons({operands:[], id:'b'});
    const innerLeft = g.cons({operands:[nodeA,nodeB], operator:'right', id:'e1'});
    const nodeC = g.cons({operands:[], id:'c'});
    const nodeD = g.cons({operands:[], id:'d'});
    const innerRight = g.cons({operands:[nodeC, nodeD], operator:'right', id:'e2'});
    const p = g.cons({operands:[innerLeft, innerRight], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramEdge(p.children[1])).toBeTruthy();
  });

  it('by composing an edge with a path', () => {
    const nodeA = g.cons({operands:[], id:'a'});
    const nodeB = g.cons({operands:[], id:'b'});
    const innerLeft = g.cons({operands:[nodeA,nodeB], operator:'right', id:'e'});
    const nodeC = g.cons({operands:[], id:'c'});
    const innerRight = g.cons({operands:[nodeC], id:'innerP'});
    const p = g.cons({operands:[innerLeft, innerRight], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramPath(p.children[1])).toBeTruthy();
  });

  it('by composing a path with an edge', () => {
    const nodeA = g.cons({operands:[], id:'a'});
    const nodeB = g.cons({operands:[], id:'b'});
    const innerRight = g.cons({operands:[nodeA,nodeB], operator:'right', id:'e'});
    const nodeC = g.cons({operands:[], id:'c'});
    const innerLeft = g.cons({operands:[nodeC], id:'innerP'});
    const p = g.cons({operands:[innerLeft, innerRight], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramPath(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramEdge(p.children[1])).toBeTruthy();
  });

  it('by composing an edge with a node', () => {
    const nodeA = g.cons({operands:[], id:'a'});
    const nodeB = g.cons({operands:[], id:'b'});
    const innerLeft = g.cons({operands:[nodeA,nodeB], operator:'right', id:'e'});
    const innerRight = g.cons({operands:[], id:'c'});
    const p = g.cons({operands:[innerLeft, innerRight], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[1])).toBeTruthy();
  });

  it('by composing a node with an edge', () => {
    const nodeA = g.cons({operands:[], id:'a'});
    const nodeB = g.cons({operands:[], id:'b'});
    const innerRight = g.cons({operands:[nodeA,nodeB], operator:'right', id:'e'});
    const innerLeft = g.cons({operands:[], id:'c'});
    const p = g.cons({operands:[innerLeft, innerRight], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramEdge(p.children[1])).toBeTruthy();
  });

  it('by composing a node with a node, which is still just a path', () => {
    const nodeA = g.cons({operands:[], id:'a'});
    const nodeB = g.cons({operands:[], id:'b'});
    const p = g.cons({operands:[nodeA, nodeB], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy(); // it's not an edge
    expect(gramTypes.isGramPath(p)).toBeTruthy(); // but an ordinary path
    expect(gramTypes.isGramNode(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[1])).toBeTruthy();
  });

  it('by composing a node with a node and a directional operator, which is a special path called an edge', () => {
    const nodeA = g.cons({operands:[], id:'a'});
    const nodeB = g.cons({operands:[], id:'b'});
    const p = g.cons({operands:[nodeA, nodeB], operator:'right', id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeTruthy(); // it's an edge
    expect(gramTypes.isGramPath(p)).toBeFalsy(); // not an ordinary path
    expect(gramTypes.isGramNode(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[1])).toBeTruthy();
  });

  it('by composing a node with a path', () => {
    const innerLeft = g.cons({operands:[], id:'a'});
    const nodeC = g.cons({operands:[], id:'c'});
    const innerRight = g.cons({operands:[nodeC], id:'innerP'});
    const p = g.cons({operands:[innerLeft, innerRight], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramPath(p.children[1])).toBeTruthy();
  });

  it('by composing a path with a node', () => {
    const innerRight = g.cons({operands:[], id:'a'});
    const nodeB = g.cons({operands:[], id:'b'});
    const innerLeft = g.cons({operands:[nodeB], id:'innerP'});
    const p = g.cons({operands:[innerLeft, innerRight], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramPath(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[1])).toBeTruthy();
  });

  it('by composing a path with a path', () => {
    const nodeA = g.cons({operands:[], id:'a'});
    const innerLeft = g.cons({operands:[nodeA], id:'innerP'});
    const nodeB = g.cons({operands:[], id:'b'});
    const innerRight = g.cons({operands:[nodeB], id:'innerP'});
    const p = g.cons({operands:[innerLeft, innerRight], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramPath(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramPath(p.children[1])).toBeTruthy();
  });


  it('by composing a unit with a unit, _without_ identity for the expression, which produces a unit', () => {
    const innerLeft = g.cons({operands:[]});
    const innerRight = g.cons({operands:[]});
    const p = g.cons({operands:[innerLeft, innerRight]});
    expect(gramTypes.isGramUnit(p)).toBeTruthy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeFalsy();
    expect(p.children).toHaveLength(0);
  });

  it('by composing a unit with a unit, _with_ identity for the expression, which produces a node', () => {
    const innerLeft = g.cons({operands:[]});
    const innerRight = g.cons({operands:[]});
    const p = g.cons({operands:[innerLeft, innerRight], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeFalsy();
    expect(p.children).toHaveLength(0);
  });

  it('by composing a unit with a node, _without_ identity for the expression, which produces the original node', () => {
    const innerLeft = g.cons({operands:[]});
    const innerRight = g.cons({operands:[], id:'a'});
    const p = g.cons({operands:[innerLeft, innerRight]});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeFalsy();
    expect(p.children).toHaveLength(0);
    expect(p).toBe(innerRight);
  });

  it('by composing a unit with a node, _with_ identity for the expression, which produces a path with a nested node', () => {
    const innerLeft = g.cons({operands:[]});
    const innerRight = g.cons({operands:[], id:'a'});
    const p = g.cons({operands:[innerLeft, innerRight], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[0])).toBeTruthy();
  });

  it('by composing a node with a unit, _without_ identity for the expression, which produces the original node', () => {
    const innerRight = g.cons({operands:[]});
    const innerLeft = g.cons({operands:[], id:'a'});
    const p = g.cons({operands:[innerLeft, innerRight]});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeFalsy();
    expect(p.children).toHaveLength(0);
    expect(p).toBe(innerLeft);
  });

  it('by composing a unit with a node, _with_ identity for the expression, which produces a path with a nested node', () => {
    const innerRight = g.cons({operands:[]});
    const innerLeft = g.cons({operands:[], id:'a'});
    const p = g.cons({operands:[innerLeft, innerRight], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[0])).toBeTruthy();
  });

  it('by composing a unit with an edge, _without_ identity for the expression, which produces the original edge', () => {
    const innerLeft = g.cons({operands:[]});
    const nodeA = g.cons({operands:[], id:'a'});
    const nodeB = g.cons({operands:[], id:'b'});
    const innerRight = g.cons({operands:[nodeA,nodeB], operator:'right', id:'e'});
    const p = g.cons({operands:[innerLeft, innerRight]});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeTruthy();
    expect(gramTypes.isGramPath(p)).toBeFalsy();
    expect(p.children).toHaveLength(2); // an edge has two nodes as children
    expect(p).toBe(innerRight);
  });

  it('by composing a unit with an edge, _with_ identity for the expression, which produces a path with a nested edge', () => {
    const innerLeft = g.cons({operands:[]});
    const nodeA = g.cons({operands:[], id:'a'});
    const nodeB = g.cons({operands:[], id:'b'});
    const innerRight = g.cons({operands:[nodeA,nodeB], operator:'right', id:'e'});
    const p = g.cons({operands:[innerLeft, innerRight], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p.children[0])).toBeTruthy();
  });

  it('by composing a edge with a unit, _without_ identity for the expression, which produces the original edge', () => {
    const innerRight = g.cons({operands:[]});
    const nodeA = g.cons({operands:[], id:'a'});
    const nodeB = g.cons({operands:[], id:'b'});
    const innerLeft = g.cons({operands:[nodeA,nodeB], operator:'right', id:'e'});
    const p = g.cons({operands:[innerLeft, innerRight]});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeTruthy();
    expect(gramTypes.isGramPath(p)).toBeFalsy();
    expect(p.children).toHaveLength(2); // an edge has two nodes as children
    expect(p).toBe(innerLeft);
  });

  it('by composing [p [e --> [a][b] ] [] ]  a path with a nested edge', () => {
    const innerRight = g.cons({operands:[]});
    const nodeA = g.cons({operands:[], id:'a'});
    const nodeB = g.cons({operands:[], id:'b'});
    const innerLeft = g.cons({operands:[nodeA,nodeB], id:'e', operator:'right'});
    const p = g.cons({operands:[innerLeft, innerRight], id:'p'});
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p.children[0])).toBeTruthy();
  });

});

describe('gram builder for path history', () => {
  it('may be empty', () => {
    const paths = g.seq([]);
    expect(paths.children.length).toBe(0)
  })
  it('may have identity', ()=> {
    const id = 'a';
    const paths = g.seq([], id);
    expect(paths.id).toBe(id);
  })
});

describe('gram builder for records', () => {
  it('with boolean values', () => {
    const value = true;
    const record = { k: g.boolean(value) };

    expect((record.k as gramTypes.BooleanLiteral).type).toBe('boolean');
    expect(gramTypes.isBooleanLiteral(record.k)).toBeTruthy();
    expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
  });
  it('with string values', () => {
    const value = 'some text';
    const record = { k: g.string(value) };

    expect((record.k as gramTypes.StringLiteral).type).toBe('string');
    expect(gramTypes.isStringLiteral(record.k)).toBeTruthy();
    expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
  });
  it('with integer values', () => {
    const value = 42;
    const record = { k: g.integer(value) };

    expect((record.k as gramTypes.IntegerLiteral).type).toBe('integer');
    expect(gramTypes.isIntegerLiteral(record.k)).toBeTruthy();
    expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
  });
  it('with tagged values', () => {
    const value = 'some text';
    const tag = 'test';
    const record = { k: g.tagged(tag, value) };

    expect((record.k as gramTypes.TaggedLiteral).type).toBe('tagged');
    expect(gramTypes.isTaggedLiteral(record.k)).toBeTruthy();
    expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
    expect((record.k as gramTypes.TaggedLiteral).tag).toBe(String(tag));
  });
  it('with measurements values', () => {
    const value = 1280;
    const unit = 'px';
    const record = { k: g.measurement(unit, value) };

    expect((record.k as gramTypes.MeasurementLiteral).type).toBe('measurement');
    expect(gramTypes.isMeasurementLiteral(record.k)).toBeTruthy();
    expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
    expect((record.k as gramTypes.MeasurementLiteral).unit).toBe(String(unit));
  });
  it('with decimal values', () => {
    const value = 3.1495;
    const record = { k: g.decimal(value) };

    expect((record.k as gramTypes.DecimalLiteral).type).toBe('decimal');
    expect(gramTypes.isDecimalLiteral(record.k)).toBeTruthy();
    expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
  });

  it('with hexadecimal values', () => {
    const value = '0xCAFE1234';
    const record = { k: g.hexadecimal(value) };

    expect((record.k as gramTypes.HexadecimalLiteral).type).toBe('hexadecimal');
    expect(gramTypes.isHexadecimalLiteral(record.k)).toBeTruthy();
    expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
  });

  it('with octal values', () => {
    const value = '01234';
    const record = { k: g.octal(value) };

    expect((record.k as gramTypes.OctalLiteral).type).toBe('octal');
    expect(gramTypes.isOctalLiteral(record.k)).toBeTruthy();
    expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
  });
  it('with tagged date values', () => {
    const value = new Date().toISOString();
    const tag = 'date';
    const record = { k: g.tagged(tag, value) };

    expect((record.k as gramTypes.DateLiteral).type).toBe('tagged');
    expect(gramTypes.isDateLiteral(record.k)).toBeTruthy();
    expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
    expect((record.k as gramTypes.DateLiteral).tag).toBe(String(tag));
  });
  it('with tagged geo values', () => {
    const value = 'POINT(-83.123 42.123)';
    const tag = 'geo';
    const record = { k: g.tagged(tag, value) };

    expect((record.k as gramTypes.GeospatialLiteral).type).toBe('tagged');
    expect(gramTypes.isGeospatialLiteral(record.k)).toBeTruthy();
    expect((record.k as gramTypes.GramLiteral).value).toBe(String(value));
    expect((record.k as gramTypes.GeospatialLiteral).tag).toBe(String(tag));
  });
});

describe('gram builder for nodes', () => {
  it('can create empty nodes', () => {
    const singleNode = g.node();
    expect(singleNode.record).toBeUndefined();
    expect(singleNode.id).toBeDefined();
  });
  it('can specify node identity', () => {
    const nodeId = 'a';
    const singleNode = g.node(nodeId);
    expect(singleNode.id).toBeDefined();
    expect(singleNode.id).toBe(nodeId);
  });
  it('can label nodes', () => {
    const label = 'Aye';
    const singleNode = g.node(undefined, [label]);
    expect(singleNode.labels).toContain(label);
  });
  it('can attach records', () => {
    const record = { a: g.boolean(false), b: g.string('hello'), c: g.integer(42) };
    const singleNode = g.node(undefined, undefined, record);

    expect(singleNode.record).toBeDefined();
    expect((singleNode.record?.a as gramTypes.BooleanLiteral).type).toBe('boolean');
    expect((singleNode.record?.b as gramTypes.StringLiteral).type).toBe('string');
    expect((singleNode.record?.c as gramTypes.IntegerLiteral).type).toBe('integer');
  });
});

describe('gram builder for edges', () => {
  it('can create empty edges', () => {
    const edge = g.edge([g.node(), g.node()]);

    expect(edge.id).toBeDefined();
    expect(edge.children[0]).toBeDefined();
    expect(isGramNode(edge.children[0])).toBeTruthy();
    expect(edge.children[1]).toBeDefined();
    expect(isGramNode(edge.children[1])).toBeTruthy();
  });
  it('defaults to right direction', () => {
    const edge = g.edge([g.node(), g.node()]);

    expect(edge.direction).toBe('right');
  });
  it('can specify edge direction as "right"', () => {
    const edge = g.edge([g.node(), g.node()], 'right');

    expect(edge.direction).toBe('right');
  });
  it('can specify edge direction as "left"', () => {
    const edge = g.edge([g.node(), g.node()], 'left');

    expect(edge.direction).toBe('left');
  });
  it('can specify edge direction as "either"', () => {
    const edge = g.edge([g.node(), g.node()], 'either');

    expect(edge.direction).toBe('either');
  });
  it('can specify edge identity', () => {
    const edgeId = 'a';
    const edge = g.edge([g.node(), g.node()], undefined, edgeId);
    expect(edge.id).toBeDefined();
    expect(edge.id).toBe(edgeId);
  });
  it('can label edges', () => {
    const label = 'Aye';
    const edge = g.edge([g.node(), g.node()], undefined, undefined, [label]);
    expect(edge.labels).toContain(label);
  });
  it('can attach records', () => {
    const record = { a: g.boolean(false), b: g.string('hello'), c: g.integer(42) };
    const edge = g.edge([g.node(), g.node()], undefined, undefined, undefined, record);

    expect(edge.record).toBeDefined();
    expect((edge.record?.a as gramTypes.BooleanLiteral).type).toBe('boolean');
    expect((edge.record?.b as gramTypes.StringLiteral).type).toBe('string');
    expect((edge.record?.c as gramTypes.IntegerLiteral).type).toBe('integer');
  });
});

describe('gram builder flatten()', () => {
  it('flattens an already flat array', () => {
    const unflat = [1, 2, 3];
    const flattened = g.flatten(unflat);
    expect(flattened).toEqual(expect.arrayContaining([1, 2, 3]));
  });
});

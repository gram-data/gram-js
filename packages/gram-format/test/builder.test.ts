import * as g from '../src/gram-builder';
import * as gramTypes from '../src/gram-types';
import { leftNodeOf, rightNodeOf } from '../src/gram-find';


describe('gram cons can build paths', () => {
  it('as a unit', () => {
    const p = g.cons([]);
    expect(gramTypes.isGramUnit(p)).toBeTruthy();
    expect(p.children).toHaveLength(0);
  });

  it('as a node', () => {
    const p = g.cons([], 'a');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeTruthy();
    expect(p.children).toHaveLength(0);
  });

  it('as a node when the child is a unit', () => {
    const p = g.cons([g.UNIT], 'a');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeTruthy();
    expect(p.children).toHaveLength(0);
  });

  it('as an edge', () => {
    const left = g.cons([], 'a')
    const right = g.cons([], 'b')
    const p = g.cons([left,right], 'e');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[1])).toBeTruthy();
  });

  it('with a single nested unit, which gets dropped, producing a node', () => {
    const inner = g.cons([])
    const p = g.cons([inner], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeFalsy();
    expect(p.children).toHaveLength(0);
  });

  it('with a single nested node', () => {
    const inner = g.cons([], 'a')
    const p = g.cons([inner], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[0])).toBeTruthy();
  });

  it('with a single nested edge', () => {
    const left = g.cons([], 'a')
    const right = g.cons([], 'b')
    const inner = g.cons([left,right], 'e');
    const p = g.cons([inner], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p.children[0])).toBeTruthy();
  });

  it('with a single nested path', () => {
    const node = g.cons([], 'a')
    const inner = g.cons([node], 'innerP');
    const p = g.cons([inner], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramPath(p.children[0])).toBeTruthy();
  });

  it('with a single nested path', () => {
    const node = g.cons([], 'a')
    const inner = g.cons([node], 'innerP');
    const p = g.cons([inner], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramPath(p.children[0])).toBeTruthy();
  });

  it('from two edges', () => {
    const nodeA = g.cons([], 'a')
    const nodeB = g.cons([], 'b')
    const innerLeft = g.cons([nodeA,nodeB], 'e1');
    const nodeC = g.cons([], 'c')
    const nodeD = g.cons([], 'd')
    const innerRight = g.cons([nodeC, nodeD], 'e2');
    const p = g.cons([innerLeft, innerRight], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramEdge(p.children[1])).toBeTruthy();
  });

  it('by composing an edge with a path', () => {
    const nodeA = g.cons([], 'a')
    const nodeB = g.cons([], 'b')
    const innerLeft = g.cons([nodeA,nodeB], 'e');
    const nodeC = g.cons([], 'c')
    const innerRight = g.cons([nodeC], 'innerP');
    const p = g.cons([innerLeft, innerRight], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramPath(p.children[1])).toBeTruthy();
  });

  it('by composing a path with an edge', () => {
    const nodeA = g.cons([], 'a')
    const nodeB = g.cons([], 'b')
    const innerRight = g.cons([nodeA,nodeB], 'e');
    const nodeC = g.cons([], 'c')
    const innerLeft = g.cons([nodeC], 'innerP');
    const p = g.cons([innerLeft, innerRight], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramPath(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramEdge(p.children[1])).toBeTruthy();
  });

  it('by composing an edge with a node', () => {
    const nodeA = g.cons([], 'a')
    const nodeB = g.cons([], 'b')
    const innerLeft = g.cons([nodeA,nodeB], 'e');
    const innerRight = g.cons([], 'c')
    const p = g.cons([innerLeft, innerRight], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[1])).toBeTruthy();
  });

  it('by composing a node with an edge', () => {
    const nodeA = g.cons([], 'a')
    const nodeB = g.cons([], 'b')
    const innerRight = g.cons([nodeA,nodeB], 'e');
    const innerLeft = g.cons([], 'c')
    const p = g.cons([innerLeft, innerRight], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramEdge(p.children[1])).toBeTruthy();
  });

  it('by composing a node with a node, which is a special path called an edge', () => {
    const nodeA = g.cons([], 'a')
    const nodeB = g.cons([], 'b')
    const p = g.cons([nodeA, nodeB], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeTruthy(); // it's an edge
    expect(gramTypes.isGramPath(p)).toBeFalsy(); // not an ordinary path
    expect(gramTypes.isGramNode(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[1])).toBeTruthy();
  });

  it('by composing a node with a path', () => {
    const innerLeft = g.cons([], 'a')
    const nodeC = g.cons([], 'c')
    const innerRight = g.cons([nodeC], 'innerP');
    const p = g.cons([innerLeft, innerRight], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramPath(p.children[1])).toBeTruthy();
  });

  it('by composing a path with a node', () => {
    const innerRight = g.cons([], 'a')
    const nodeB = g.cons([], 'b')
    const innerLeft = g.cons([nodeB], 'innerP');
    const p = g.cons([innerLeft, innerRight], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramPath(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[1])).toBeTruthy();
  });

  it('by composing a path with a path', () => {
    const nodeA = g.cons([], 'a')
    const innerLeft = g.cons([nodeA], 'innerP');
    const nodeB = g.cons([], 'b')
    const innerRight = g.cons([nodeB], 'innerP');
    const p = g.cons([innerLeft, innerRight], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramPath(p.children[0])).toBeTruthy();
    expect(gramTypes.isGramPath(p.children[1])).toBeTruthy();
  });


  it('by composing a unit with a unit, _without_ identity for the expression, which produces a unit', () => {
    const innerLeft = g.cons([]);
    const innerRight = g.cons([]);
    const p = g.cons([innerLeft, innerRight]);
    expect(gramTypes.isGramUnit(p)).toBeTruthy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeFalsy();
    expect(p.children).toHaveLength(0);
  });

  it('by composing a unit with a unit, _with_ identity for the expression, which produces a node', () => {
    const innerLeft = g.cons([]);
    const innerRight = g.cons([]);
    const p = g.cons([innerLeft, innerRight], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeFalsy();
    expect(p.children).toHaveLength(0);
  });

  it('by composing a unit with a node, _without_ identity for the expression, which produces the original node', () => {
    const innerLeft = g.cons([]);
    const innerRight = g.cons([], 'a');
    const p = g.cons([innerLeft, innerRight]);
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeFalsy();
    expect(p.children).toHaveLength(0);
    expect(p).toBe(innerRight);
  });

  it('by composing a unit with a node, _with_ identity for the expression, which produces a path with a nested node', () => {
    const innerLeft = g.cons([]);
    const innerRight = g.cons([], 'a');
    const p = g.cons([innerLeft, innerRight], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[0])).toBeTruthy();
  });

  it('by composing a node with a unit, _without_ identity for the expression, which produces the original node', () => {
    const innerRight = g.cons([]);
    const innerLeft = g.cons([], 'a');
    const p = g.cons([innerLeft, innerRight]);
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeFalsy();
    expect(p.children).toHaveLength(0);
    expect(p).toBe(innerLeft);
  });

  it('by composing a unit with a node, _with_ identity for the expression, which produces a path with a nested node', () => {
    const innerRight = g.cons([]);
    const innerLeft = g.cons([], 'a');
    const p = g.cons([innerLeft, innerRight], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramNode(p.children[0])).toBeTruthy();
  });

  it('by composing a unit with an edge, _without_ identity for the expression, which produces the original edge', () => {
    const innerLeft = g.cons([]);
    const nodeA = g.cons([], 'a')
    const nodeB = g.cons([], 'b')
    const innerRight = g.cons([nodeA,nodeB], 'e');
    const p = g.cons([innerLeft, innerRight]);
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeTruthy();
    expect(gramTypes.isGramPath(p)).toBeFalsy();
    expect(p.children).toHaveLength(2); // an edge has two nodes as children
    expect(p).toBe(innerRight);
  });

  it('by composing a unit with an edge, _with_ identity for the expression, which produces a path with a nested edge', () => {
    const innerLeft = g.cons([]);
    const nodeA = g.cons([], 'a')
    const nodeB = g.cons([], 'b')
    const innerRight = g.cons([nodeA,nodeB], 'e');
    const p = g.cons([innerLeft, innerRight], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p.children[0])).toBeTruthy();
  });

  it('by composing a edge with a unit, _without_ identity for the expression, which produces the original edge', () => {
    const innerRight = g.cons([]);
    const nodeA = g.cons([], 'a')
    const nodeB = g.cons([], 'b')
    const innerLeft = g.cons([nodeA,nodeB], 'e');
    const p = g.cons([innerLeft, innerRight]);
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeTruthy();
    expect(gramTypes.isGramPath(p)).toBeFalsy();
    expect(p.children).toHaveLength(2); // an edge has two nodes as children
    expect(p).toBe(innerLeft);
  });

  it('by composing a edge with a node, _with_ identity for the expression, which produces a path with a nested edge', () => {
    const innerRight = g.cons([]);
    const nodeA = g.cons([], 'a')
    const nodeB = g.cons([], 'b')
    const innerLeft = g.cons([nodeA,nodeB], 'e');
    const p = g.cons([innerLeft, innerRight], 'p');
    expect(gramTypes.isGramUnit(p)).toBeFalsy();
    expect(gramTypes.isGramNode(p)).toBeFalsy();
    expect(gramTypes.isGramEdge(p)).toBeFalsy();
    expect(gramTypes.isGramPath(p)).toBeTruthy();
    expect(gramTypes.isGramEdge(p.children[0])).toBeTruthy();
  });

});

describe('gram builder for a path sequence', () => {
  it('may be empty', () => {
    const paths = g.gram([]);
    expect(paths.children.length).toBe(0)
  })
  it('may have identity', ()=> {
    const id = 'a';
    const paths = g.gram([], id);
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
    expect(leftNodeOf(edge)).toBeDefined();
    expect(rightNodeOf(edge)).toBeDefined();
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

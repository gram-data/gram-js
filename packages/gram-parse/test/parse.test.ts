import { toAST } from '../src/';
import {
  EMPTY_PATH_ID,
  isGramNode,
  isGramPathSequence,
  isGramPath,
  isGramEdge,
  isGramEmptyPath,
} from '@gram-data/gram-ast';

const inspect = require('unist-util-inspect');

describe('parsing empty paths', () => {
  it('[] as an empty path', () => {
    const src = `[]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEmptyPath(firstPath)).toBeTruthy();
    expect(firstPath.id).toBe(EMPTY_PATH_ID);
  });
  it('[ø] as an empty path with explicit, exclusive ID for empty paths', () => {
    const src = `[ø]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEmptyPath(firstPath)).toBeTruthy();
    expect(firstPath.id).toBe(EMPTY_PATH_ID);
  });

  it('[[]] =~ [ [ø] [ø] ] =~ ()', () => {
    const src = `[[]]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramNode(firstPath)).toBeTruthy();
  });

  it('[[[]]] as a path equivalent to [ [ [ø] [ø] ] [ø] ] =~ [ () [ø] ]', () => {
    const src = `[[[]]]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramPath(firstPath)).toBeTruthy();
  });
});

describe('parsing nodes', () => {
  it('[a] as path equivalent to (a), a special path called a node', () => {
    const nodeId = 'a';
    const src = `[${nodeId}]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(firstPath?.id).toBe(nodeId);
    expect(isGramNode(firstPath)).toBeTruthy();
  });

  it('() as graph notation for a node, which is assigned a generated id', () => {
    const src = '()';
    const result = toAST(src);
    expect(result).toBeDefined();
    expect(isGramPathSequence(result)).toBeTruthy();
    const firstPath = result.children[0];
    expect(isGramNode(firstPath)).toBeTruthy();
  });

  it('(n) with a provided id', () => {
    const nodeId = 'n';
    const src = `(${nodeId})`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(firstPath?.id).toBe(nodeId);
  });

  it('[p []] =~ [p [] []], a path with two empty children is a node', () => {
    const pathId = 'p';
    const src = `[${pathId} []]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramNode(firstPath)).toBeTruthy();
    expect(firstPath?.id).toBe(pathId);
    expect(firstPath.children).toHaveLength(0);
  });

  it('[ [n]] to be a decorated node', () => {
    const pathId = 'n';
    const src = `[ [${pathId}]]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramPath(firstPath)).toBeTruthy();
    expect(firstPath.children).toHaveLength(2);
    expect(
      isGramPath(firstPath) && isGramNode(firstPath.children[0])
    ).toBeTruthy();
  });

  it.each`
    identifier
    ${'@akollegger'}
    ${'@a'}
    ${'_0n96pdf6@E'}
    ${'Im0_pWk0g4@@'}
    ${'42'}
    ${'12px'}
  `('$identifier is a valid identifier', ({ identifier }) => {
    const src = `(${identifier})`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(firstPath?.id).toBe(identifier);
  });

  it.each`
    identifier
    ${'napoleon'}
    ${'Malmö'}
    ${'😀'}
    ${'ø™µ'}
    ${'⚛︎♘'}
  `(
    '$identifier is a valid identifier when inside backticks',
    ({ identifier }) => {
      const src = `(\`${identifier}\`)`;
      const result = toAST(src);
      expect(result).toBeDefined();
      // console.log(inspect(result));
      const firstPath = result.children[0];
      expect(firstPath?.id).toBe(identifier);
    }
  );

  it.each`
    gram
    ${'(n)'}
    ${'(n:Emperor)'}
    ${'(n{name:"Napoleon",group:1,height:168cm,born:date`1769-08-15`,wikifamous:true,wallet:0x1337})'}
    ${'(n {name:"Napoleon"})'}
    ${'(n:Emperor{name:"Napoleon"})'}
    ${'(n:Emperor {name:"Napoleon"})'}
  `('$gram is a valid node', ({ gram }) => {
    const result = toAST(gram);
    expect(result).toBeDefined();
    // console.log(inspect(result));
  });

  it.each`
    gram
    ${'(1)'}
    ${'(1:First)'}
    ${'(1{kind:"ordinal"})'}
    ${'(1 {kind:"ordinal"})'}
    ${'(1:First{kind:"ordinal"})'}
    ${'(1:First {kind:"ordinal"})'}
  `('$gram is a valid node', ({ gram }) => {
    const result = toAST(gram);
    expect(result).toBeDefined();
    // console.log(inspect(result));
  });

  it.each`
    gram
    ${'(`⚛︎♘`)'}
    ${'(`⚛︎♘`:Atomic:Horse)'}
    ${'(`⚛︎♘`{named:"Chair"})'}
    ${'(`⚛︎♘` {named:"Chair"})'}
    ${'(`⚛︎♘`:Atomic:Horse{named:"Chair"})'}
    ${'(`⚛︎♘`:Atomic:Horse {named:`🪑`})'}
  `('$gram is a valid node', ({ gram }) => {
    const result = toAST(gram);
    expect(result).toBeDefined();
    // console.log(inspect(result));
  });

  it.each`
    gram
    ${'({k:`v`})'}
    ${'( {k:`v`} )'}
    ${'( { k:`v` } )'}
  `('$gram is tolerant of whitespace', ({ gram }) => {
    const result = toAST(gram);
    expect(result).toBeDefined();
    console.log(inspect(result));
  });
});

describe('parsing nested nodes (implied ø rhs)', () => {
  it('[p (n)] as a defined path containing a single node', () => {
    const pathId = 'p';
    const nodeId = 'n';
    const src = `[${pathId} (${nodeId})]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramPath(firstPath)).toBeTruthy();
    expect(firstPath?.id).toBe(pathId);
    const nestedPath = firstPath.children[0];
    expect(nestedPath).toBeDefined();
    expect(isGramNode(nestedPath)).toBeTruthy();
  });

  it('[p [n]] =~ [p (n) [ø]]', () => {
    const pathId = 'p';
    const nodeId = 'n';
    const src = `[${pathId} [${nodeId}]]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramPath(firstPath)).toBeTruthy();
    expect(firstPath?.id).toBe(pathId);
    const nestedPath = firstPath.children[0];
    expect(nestedPath).toBeDefined();
    expect(isGramNode(nestedPath)).toBeTruthy();
  });

  it('[p (n) []] =~ [p (n) [ø]]', () => {
    const pathId = 'p';
    const nodeId = 'n';
    const src = `[${pathId} (${nodeId}) []]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramPath(firstPath)).toBeTruthy();
    expect(firstPath?.id).toBe(pathId);
    const nestedPath = firstPath.children[0];
    expect(nestedPath).toBeDefined();
    expect(isGramNode(nestedPath)).toBeTruthy();
  });
});

describe('parsing edges', () => {
  it('()--() relates two nodes, traversable in either direction, with each element assigned a generated id', () => {
    const src = `()--()`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.relation).toBe('either');
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('()-->() relates two nodes related left to right', () => {
    const src = `()-->()`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.relation).toBe('right');
    expect(firstPath.id).toBeUndefined();
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('()<--() relates two nodes related right to left', () => {
    const src = `()<--()`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.relation).toBe('left');
    expect(firstPath.id).toBeUndefined();
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('(n)--() relates two nodes, with the left node having a specified id', () => {
    const nodeId = 'n';
    const src = `(${nodeId})--()`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(firstPath.children[0]?.id).toBe(nodeId);
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('()-[e]-() relates two nodes, with the edge having a specified id', () => {
    const edgeId = 'e';
    const src = `()-[${edgeId}]-()`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.id).toBe(edgeId);
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('()--(n) relates two nodes, with the right node having a specified id', () => {
    const nodeId = 'n';
    const src = `()--(${nodeId})`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
    expect(firstPath.children[1]?.id).toBe(nodeId);
  });

  it('()-[e]->() relates two nodes related left to right', () => {
    const edgeId = 'e';
    const src = `()-[${edgeId}]->()`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.relation).toBe('right');
    expect(firstPath.id).toBe(edgeId);
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('()<-[e]-() relates two nodes related right to left', () => {
    const edgeId = 'e';
    const src = `()<-[${edgeId}]-()`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.relation).toBe('left');
    expect(firstPath.id).toBe(edgeId);
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
  });
});

describe('parsing multiple sequential paths', () => {
  it('() () () can be a sequence of nodes separated by whitespace', () => {
    const src = `() () ()`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramNode(firstPath)).toBeTruthy();
    const secondPath = result.children[0];
    expect(isGramNode(secondPath)).toBeTruthy();
    const thirdPath = result.children[0];
    expect(isGramNode(thirdPath)).toBeTruthy();
  });

  it('(),(),() can be a sequence of nodes separated by commas', () => {
    const src = `(),(),()`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramNode(firstPath)).toBeTruthy();
    const secondPath = result.children[0];
    expect(isGramNode(secondPath)).toBeTruthy();
    const thirdPath = result.children[0];
    expect(isGramNode(thirdPath)).toBeTruthy();
  });

  it('(), (), () can be a sequence of nodes separated by commas with trailing whitespace', () => {
    const src = `(), (), ()`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramNode(firstPath)).toBeTruthy();
    const secondPath = result.children[0];
    expect(isGramNode(secondPath)).toBeTruthy();
    const thirdPath = result.children[0];
    expect(isGramNode(thirdPath)).toBeTruthy();
  });
});

describe('parsing path notation for edges', () => {
  it('[e -- () ()] ≅ ()-[e]-(), an edge identified as "e"', () => {
    const edgeId = 'e';
    const src = `[${edgeId} -- () ()]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.relation).toBe('either');
    expect(firstPath.id).toBe(edgeId);
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('[e --> () ()] ≅ ()-[e]->(), an edge identified as "e"', () => {
    const edgeId = 'e';
    const src = `[${edgeId} --> () ()]`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.relation).toBe('right');
    expect(firstPath.id).toBe(edgeId);
    expect(firstPath.children.length).toBe(2);
    expect(isGramNode(firstPath.children[0])).toBeTruthy();
    expect(isGramNode(firstPath.children[1])).toBeTruthy();
  });
});

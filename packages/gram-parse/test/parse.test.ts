import * as gramTypes from '@gram-data/gram-ast';
import {parse} from '../src/';

describe('parsing empty paths', () => {

  it('[] as an empty path, a special path called unit', () => {
    const src = `[]`;
    const result = parse(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gramTypes.isGramUnit(firstPath)).toBeTruthy();
    expect(firstPath.id).toBe(gramTypes.UNIT_ID)
  });

  it('[[]] as a path equivalent to unit', () => {
    const src = `[[]]`;
    const result = parse(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gramTypes.isGramUnit(firstPath)).toBeTruthy();
    expect(firstPath.id).toBe(gramTypes.UNIT_ID)
  });

  it('[[[]]] as a path equivalent to unit', () => {
    const src = `[[[]]]`;
    const result = parse(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gramTypes.isGramUnit(firstPath)).toBeTruthy();
  });

});

describe('parsing nodes', () => {

  it('[a] as path equivalent to (a), a special path called a node', () => {
    const nodeId = 'a';
    const src = `[${nodeId}]`;
    const result = parse(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(firstPath?.id).toBe(nodeId);
    expect(gramTypes.isGramNode(firstPath)).toBeTruthy();
  });

  it('() as graph notation for a node, which is assigned a generated id', () => {
    const src = '()';
    const result = parse(src);
    expect(result).toBeDefined();
    expect(gramTypes.isGramPathSequence(result)).toBeTruthy();
    const firstPath = result.children[0];
    expect(gramTypes.isGramNode(firstPath)).toBeTruthy();
    expect(firstPath).toHaveProperty('id');
    expect(firstPath.id).toBeDefined();
  });

  it('(n) with a provided id', () => {
    const nodeId = 'n';
    const src = `(${nodeId})`;
    const result = parse(src);
    expect(result).toBeDefined();
    const firstPath = result.children[0];
    expect(firstPath?.id).toBe(nodeId);
  });

  it('[p []] to reduce to just [p], a node', () => {
    const pathId = 'p';
    const src = `[${pathId} []]`;
    const result = parse(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gramTypes.isGramNode(firstPath)).toBeTruthy();
    expect(firstPath?.id).toBe(pathId);
    expect(firstPath.children).toHaveLength(0);
  });

  it('[ [p]] to reduce to [p], a node', () => {
    const pathId = 'p';
    const src = `[ [${pathId}]]`;
    const result = parse(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gramTypes.isGramNode(firstPath)).toBeTruthy();
    expect(firstPath?.id).toBe(pathId);
    expect(firstPath.children).toHaveLength(0);
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
  const result = parse(src);
  expect(result).toBeDefined();
  const firstPath = result.children[0];
  expect(firstPath?.id).toBe(identifier);
  })

  it.each`
    identifier
    ${'napoleon'}
    ${'Malmö'}
    ${'😀'}
    ${'ø™µ'}
    ${'⚛︎♘'}
`('$identifier is a valid identifier when inside backticks', ({ identifier }) => {
  const src = `(\`${identifier}\`)`;
  const result = parse(src);
  expect(result).toBeDefined();
  const firstPath = result.children[0];
  expect(firstPath?.id).toBe(identifier);
  })


  it.each`
    gram
    ${'(n)'}
    ${'(n:Emperor)'}
    ${'(n{name:"Napoleon",group:1,height:168cm,born:date\`1769-08-15\`,wikifamous:true,wallet:0x1337})'}
    ${'(n {name:"Napoleon"})'}
    ${'(n:Emperor{name:"Napoleon"})'}
    ${'(n:Emperor {name:"Napoleon"})'}
`('$gram is a valid node', ({ gram }) => {
  const result = parse(gram);
  expect(result).toBeDefined();
  })


  it.each`
    gram
    ${'(1)'}
    ${'(1:First)'}
    ${'(1{kind:"ordinal"})'}
    ${'(1 {kind:"ordinal"})'}
    ${'(1:First{kind:"ordinal"})'}
    ${'(1:First {kind:"ordinal"})'}
`('$gram is a valid node', ({ gram }) => {
  const result = parse(gram);
  expect(result).toBeDefined();
  })

  it.each`
    gram
    ${'(\`⚛︎♘\`)'}
    ${'(\`⚛︎♘\`:Atomic:Horse)'}
    ${'(\`⚛︎♘\`{named:"Chair"})'}
    ${'(\`⚛︎♘\` {named:"Chair"})'}
    ${'(\`⚛︎♘\`:Atomic:Horse{named:"Chair"})'}
    ${'(\`⚛︎♘\`:Atomic:Horse {named:\`🪑\`})'}
`('$gram is a valid node', ({ gram }) => {
  const result = parse(gram);
  expect(result).toBeDefined();
  })

});

describe('parsing nested nodes', () => {

  it('[p (n)] as a defined path containing a single node', () => {
    const pathId = 'p';
    const nodeId = 'n';
    const src = `[${pathId} (${nodeId})]`;
    const result = parse(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gramTypes.isGramPath(firstPath)).toBeTruthy();
    expect(firstPath?.id).toBe(pathId);
    const nestedPath = firstPath.children[0];
    expect(nestedPath).toBeDefined();
    expect(gramTypes.isGramNode(nestedPath)).toBeTruthy();
  });

  it('[p [n]] as a defined path containing a single node', () => {
    const pathId = 'p';
    const nodeId = 'n';
    const src = `[${pathId} [${nodeId}]]`;
    const result = parse(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gramTypes.isGramPath(firstPath)).toBeTruthy();
    expect(firstPath?.id).toBe(pathId);
    const nestedPath = firstPath.children[0];
    expect(nestedPath).toBeDefined();
    expect(gramTypes.isGramNode(nestedPath)).toBeTruthy();
  });

  it('[p (n) []] reduces to [p (n)]', () => {
    const pathId = 'p';
    const nodeId = 'n';
    const src = `[${pathId} (${nodeId}) []]`;
    const result = parse(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gramTypes.isGramPath(firstPath)).toBeTruthy();
    expect(firstPath?.id).toBe(pathId);
    const nestedPath = firstPath.children[0];
    expect(nestedPath).toBeDefined();
    expect(gramTypes.isGramNode(nestedPath)).toBeTruthy();
  });
});

describe('parsing edges', () => {

  it('()--() relates two nodes, traversable in either direction, with each element assigned a generated id', () => {
    const src = `()--()`;
    const result = parse(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gramTypes.isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.direction).toBe('either');
    expect(firstPath.children.length).toBe(2);
    expect(gramTypes.isGramNode(firstPath.children[0])).toBeTruthy();
    expect(gramTypes.isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('()-->() relates two nodes related left to right', () => {
    const src = `()-->()`;
    const result = parse(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gramTypes.isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.direction).toBe('right');
    expect(firstPath.id).toBeDefined();
    expect(firstPath.children.length).toBe(2);
    expect(gramTypes.isGramNode(firstPath.children[0])).toBeTruthy();
    expect(gramTypes.isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('()<--() relates two nodes related right to left', () => {
    const src = `()<--()`;
    const result = parse(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gramTypes.isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.direction).toBe('left');
    expect(firstPath.id).toBeDefined();
    expect(firstPath.children.length).toBe(2);
    expect(gramTypes.isGramNode(firstPath.children[0])).toBeTruthy();
    expect(gramTypes.isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('(n)--() relates two nodes, with the left node having a specified id', () => {
    const nodeId = 'n';
    const src = `(${nodeId})--()`;
    const result = parse(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gramTypes.isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.children.length).toBe(2);
    expect(gramTypes.isGramNode(firstPath.children[0])).toBeTruthy();
    expect(firstPath.children[0]?.id).toBe(nodeId);
    expect(gramTypes.isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('()-[e]-() relates two nodes, with the edge having a specified id', () => {
    const edgeId = 'e';
    const src = `()-[${edgeId}]-()`;
    const result = parse(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gramTypes.isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.id).toBe(edgeId);
    expect(firstPath.children.length).toBe(2);
    expect(gramTypes.isGramNode(firstPath.children[0])).toBeTruthy();
    expect(gramTypes.isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('()--(n) relates two nodes, with the right node having a specified id', () => {
    const nodeId = 'n';
    const src = `()--(${nodeId})`;
    const result = parse(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gramTypes.isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.children.length).toBe(2);
    expect(gramTypes.isGramNode(firstPath.children[0])).toBeTruthy();
    expect(gramTypes.isGramNode(firstPath.children[1])).toBeTruthy();
    expect(firstPath.children[1]?.id).toBe(nodeId);
  });

  it('()-[e]->() relates two nodes related left to right', () => {
    const edgeId = 'e';
    const src = `()-[${edgeId}]->()`;
    const result = parse(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gramTypes.isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.direction).toBe('right');
    expect(firstPath.id).toBe(edgeId);
    expect(firstPath.children.length).toBe(2);
    expect(gramTypes.isGramNode(firstPath.children[0])).toBeTruthy();
    expect(gramTypes.isGramNode(firstPath.children[1])).toBeTruthy();
  });

  it('()<-[e]-() relates two nodes related right to left', () => {
    const edgeId = 'e';
    const src = `()<-[${edgeId}]-()`;
    const result = parse(src);
    expect(result).toBeDefined();
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gramTypes.isGramEdge(firstPath)).toBeTruthy();
    expect(firstPath.direction).toBe('left');
    expect(firstPath.id).toBe(edgeId);
    expect(firstPath.children.length).toBe(2);
    expect(gramTypes.isGramNode(firstPath.children[0])).toBeTruthy();
    expect(gramTypes.isGramNode(firstPath.children[1])).toBeTruthy();
  });
});


// describe('parsing path notation for edges', () => {

//   it('[e ()--()] ≡ ()-[e]-(), an edge identified as "e"', () => {
//     const edgeId = 'e';
//     const src = `[${edgeId} ()--()]`;
//     const result = parse(src);
//     expect(result).toBeDefined();
//     console.log(inspect(result));
//     const firstPath = result.children[0];
//     expect(gramTypes.isGramEdge(firstPath)).toBeTruthy();
//     expect(firstPath.id).toBe(edgeId);
//     expect(firstPath.children.length).toBe(2);
//     expect(gramTypes.isGramNode(firstPath.children[0])).toBeTruthy();
//     expect(gramTypes.isGramNode(firstPath.children[1])).toBeTruthy();
//   });

// });
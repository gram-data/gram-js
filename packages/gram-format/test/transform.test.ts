import * as ast from '../src/gram-ast';
import { parse } from '../src/';
import { mergeNodes, foldEdges, values } from '../src/gram-transform';
// import stringify from '../src/gram-stringify';

const validateNodes = (nodes: ast.Node[]) => {
  nodes.forEach(element => {
    expect(ast.isNode(element)).toBeTruthy();
    expect(element.id).toBeDefined();
  });
};

const validateEdges = (edges: ast.Edge[]) => {
  edges.forEach(element => {
    expect(ast.isEdge(element)).toBeTruthy();
    expect(element.id).toBeDefined();
  });
};

describe('merging nodes', () => {
  it('works fine with a single node "()"', () => {
    const src = '()';
    const result = parse(src);
    const nodes = mergeNodes(result);
    expect(nodes).toHaveLength(1);
    validateNodes(nodes);
  });
  it('counts each unidentified node by adding identity to "() ()"', () => {
    const src = '() ()';
    const result = parse(src);
    const nodes = mergeNodes(result);
    expect(nodes).toHaveLength(2);
    validateNodes(nodes);
  });
  it('counts across pairs "(),()"', () => {
    const src = '(),()';
    const result = parse(src);
    const nodes = mergeNodes(result);
    expect(nodes).toHaveLength(2);
    validateNodes(nodes);
  });
  it('counts across edges "()--()"', () => {
    const src = '()--()';
    const result = parse(src);
    const nodes = mergeNodes(result);
    expect(nodes).toHaveLength(2);
    validateNodes(nodes);
  });
  it('counts across right relationships "()-->()"', () => {
    const src = '()-->()';
    const result = parse(src);
    const nodes = mergeNodes(result);
    expect(nodes).toHaveLength(2);
    validateNodes(nodes);
  });
  it('counts across left relationships "()<--()"', () => {
    const src = '()<--()';
    const result = parse(src);
    const nodes = mergeNodes(result);
    expect(nodes).toHaveLength(2);
    validateNodes(nodes);
  });
  it('counts across path expressions "(a)-->(b)<--(c)"', () => {
    const src = '(a)-->(b)<--(c)';
    const result = parse(src);
    const nodes = mergeNodes(result);
    expect(nodes).toHaveLength(3);
    validateNodes(nodes);
  });
  it('does not duplicate nodes with same id', () => {
    const src = '(a)-->(b)<--(a)';
    const result = parse(src);
    const nodes = mergeNodes(result);
    expect(nodes).toHaveLength(2);
    validateNodes(nodes);
  });
  it('does not duplicate paired nodes with matching id', () => {
    const src = '(a),(a),(a),(a)';
    const result = parse(src);
    const nodes = mergeNodes(result);
    expect(nodes).toHaveLength(1);
    validateNodes(nodes);
  });
  it('counts across defined paths', () => {
    const src = '[(a),(b),(c)]';
    const result = parse(src);
    const nodes = mergeNodes(result);
    expect(nodes).toHaveLength(3);
    validateNodes(nodes);
  });
  it('counts across multiple defined paths', () => {
    const src = '[(a),(b),(c)] [(a),(b),(d)]';
    const result = parse(src);
    const nodes = mergeNodes(result);
    expect(nodes).toHaveLength(4);
    validateNodes(nodes);
  });
});

describe('extracting edges', () => {
  it('works fine with a single edge', () => {
    const src = '()--()';
    const result = parse(src);
    const edges = foldEdges(result);
    expect(edges).toHaveLength(1);
    validateEdges(edges);
  });
});

describe('merging nodes during fold', () => {
  it('works fine empty nodes', () => {
    const src = '(),()';
    const result = parse(src);
    const nodes = mergeNodes(result);
    expect(nodes).toHaveLength(2);
    validateNodes(nodes);
  });
  it('merges nodes based on identity', () => {
    const src = '(a),(b),(a),(b)';
    const result = parse(src);
    const nodes = mergeNodes(result);
    expect(nodes).toHaveLength(2);
    validateNodes(nodes);
  });
  it('merges node labels', () => {
    const src = '(a:Person),(a:Actor)';
    const result = parse(src);
    const nodes = mergeNodes(result);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].labels).toEqual(expect.arrayContaining(['Person', 'Actor']));
  });
  it('merges node records', () => {
    const src = '(a {n:1,m:2}),(a {n:42})';
    const result = parse(src);
    const nodes = mergeNodes(result);
    expect(nodes).toHaveLength(1);
    const recordValueN = nodes[0].record?.n;
    if (recordValueN && ast.isLiteral(recordValueN)) {
      expect(recordValueN.value).toEqual('42');
    } else {
      fail(`Expected 'Literal' but received ${recordValueN}`);
    }
    const recordValueM = nodes[0].record?.m;
    if (recordValueM && ast.isLiteral(recordValueM)) {
      expect(recordValueM.value).toEqual('2');
    } else {
      fail(`Expected 'Literal' but received ${recordValueM}`);
    }
  });

  it('merges node records with array values', () => {
    const src = '(a {ns:[1,2,3]}),(a {ns:[4,5,6]})';
    const result = parse(src);
    const nodes = mergeNodes(result);
    expect(nodes).toHaveLength(1);
    const recordValueN = nodes[0].record?.ns;
    if (recordValueN && Array.isArray(recordValueN)) {
      const extractedValues = values(recordValueN);
      expect(extractedValues).toEqual(expect.arrayContaining(['4', '5', '6']));
    } else {
      fail(`Expected 'Literal Array' but received ${recordValueN}`);
    }
  });
});

import * as ast from '../src/gram-ast';
import {parse} from '../src/';
import {foldNodes, foldEdges} from '../src/gram-transform';
// import stringify from '../src/gram-stringify';

const validateNodes = (nodes:ast.Node[]) => {
  nodes.forEach( element => {
    expect(ast.isNode(element)).toBeTruthy();
    expect(element.id).toBeDefined();
  })
}

const validateEdges = (edges:ast.Edge[]) => {
  edges.forEach( element => {
    expect(ast.isEdge(element)).toBeTruthy();
    expect(element.id).toBeDefined();
  })
}


describe('extracting nodes', () => {
  it('works fine with a single node "()"', () => {
    const src = "()";
    const result = parse(src);
    const nodes = foldNodes(result);
    expect(nodes).toHaveLength(1);
    validateNodes(nodes);
  });
  it('counts each unidentified node by adding identity to "() ()"', () => {
    const src = "() ()";
    const result = parse(src);
    const nodes = foldNodes(result);
    expect(nodes).toHaveLength(2);
    validateNodes(nodes);
  });
  it('counts across pairs "(),()"', () => {
    const src = "(),()";
    const result = parse(src);
    const nodes = foldNodes(result);
    expect(nodes).toHaveLength(2);
    validateNodes(nodes);
  });
  it('counts across edges "()--()"', () => {
    const src = "()--()";
    const result = parse(src);
    const nodes = foldNodes(result);
    expect(nodes).toHaveLength(2);
    validateNodes(nodes);
  });
  it('counts across right relationships "()-->()"', () => {
    const src = "()-->()";
    const result = parse(src);
    const nodes = foldNodes(result);
    expect(nodes).toHaveLength(2);
    validateNodes(nodes);
  });
  it('counts across left relationships "()<--()"', () => {
    const src = "()<--()";
    const result = parse(src);
    const nodes = foldNodes(result);
    expect(nodes).toHaveLength(2);
    validateNodes(nodes);
  });
  it('counts across path expressions "(a)-->(b)<--(c)"', () => {
    const src = "(a)-->(b)<--(c)";
    const result = parse(src);
    const nodes = foldNodes(result);
    expect(nodes).toHaveLength(3);
    validateNodes(nodes);
  });
  it('does not duplicate nodes with same id', () => {
    const src = "(a)-->(b)<--(a)";
    const result = parse(src);
    const nodes = foldNodes(result);
    expect(nodes).toHaveLength(2);
    validateNodes(nodes);
  });
  it('does not duplicate paired nodes with matching id', () => {
    const src = "(a),(a),(a),(a)";
    const result = parse(src);
    const nodes = foldNodes(result);
    expect(nodes).toHaveLength(1);
    validateNodes(nodes);
  });
  it('counts across defined paths', () => {
    const src = "[(a),(b),(c)]";
    const result = parse(src);
    const nodes = foldNodes(result);
    expect(nodes).toHaveLength(3);
    validateNodes(nodes);
  });
  it('counts across multiple defined paths', () => {
    const src = "[(a),(b),(c)] [(a),(b),(d)]";
    const result = parse(src);
    const nodes = foldNodes(result);
    expect(nodes).toHaveLength(4);
    validateNodes(nodes);
  });
});


describe('extracting edges', () => {
  it('works fine with a single edge', () => {
    const src = "()--()";
    const result = parse(src);
    const edges = foldEdges(result);
    expect(edges).toHaveLength(1);
    validateEdges(edges);
  });
});
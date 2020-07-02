import * as gram from '../src';
import {range} from 'lodash'
// const inspect = require('unist-util-inspect');

const makeNode = (i:number) => {
  return gram.builder.node(`_${i}`);
}

const makeEdge = (i:number) => {
  return gram.builder.edge([makeNode(i), makeNode(i+1)])
}

describe('parsing lots of nodes', () => {

  it('1 empty nodes', () => {
    const src = gram.stringify(makeNode(0));
    const result = gram.parse(src);
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gram.ast.isGramNode(firstPath)).toBeTruthy();
  });

  it('100 empty nodes', () => {
    const src = gram.stringify(gram.builder.seq( 
      range(100).map( i => makeNode(i)) 
    ));
    const result = gram.parse(src);
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gram.ast.isGramNode(firstPath)).toBeTruthy();
  });

  it('10000 empty nodes', () => {
    const src = gram.stringify(gram.builder.seq( 
      range(10000).map( i => makeNode(i)) 
    ));
    const result = gram.parse(src);
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gram.ast.isGramNode(firstPath)).toBeTruthy();
  });
  
});


describe('parsing lots of edges', () => {

  it('1 empty edge', () => {
    const src = gram.stringify(makeEdge(0));
    const result = gram.parse(src);
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gram.ast.isGramEdge(firstPath)).toBeTruthy();
  });

  it('100 empty edges', () => {
    const src = gram.stringify(gram.builder.seq( 
      range(100).map( i => makeEdge(i)) 
    ));
    const result = gram.parse(src);
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gram.ast.isGramEdge(firstPath)).toBeTruthy();
  });

  it('10000 empty edge', () => {
    const src = gram.stringify(gram.builder.seq( 
      range(10000).map( i => makeEdge(i)) 
    ));
    const result = gram.parse(src);
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gram.ast.isGramEdge(firstPath)).toBeTruthy();
  });
  
});
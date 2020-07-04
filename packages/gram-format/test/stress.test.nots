import * as gram from '../src';
import {range} from 'lodash'
// const inspect = require('unist-util-inspect');

const makeNode = () => {
  return gram.builder.node();
}

const makeEdge = () => {
  return gram.builder.edge([makeNode(), makeNode()])
}

describe('parsing lots of nodes in a single line', () => {

  it('1 empty nodes', () => {
    const src = gram.stringify(makeNode());
    const result = gram.parse(src);
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gram.ast.isGramNode(firstPath)).toBeTruthy();
  });

  it('100 empty nodes', () => {
    const src = gram.stringify(gram.builder.seq( 
      range(100).map( () => makeNode()) 
    ));
    const result = gram.parse(src);
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gram.ast.isGramNode(firstPath)).toBeTruthy();
  });

  it('10000 empty nodes', () => {
    const src = gram.stringify(gram.builder.seq( 
      range(10000).map( () => makeNode()) 
    ));
    const result = gram.parse(src);
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gram.ast.isGramNode(firstPath)).toBeTruthy();
  });
  
});


describe('parsing lots of edges in a single line', () => {

  it('1 empty edge', () => {
    const src = gram.stringify(makeEdge());
    const result = gram.parse(src);
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gram.ast.isGramEdge(firstPath)).toBeTruthy();
  });

  it('100 empty edges', () => {
    const src = gram.stringify(gram.builder.seq( 
      range(100).map( () => makeEdge()) 
    ));
    const result = gram.parse(src);
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gram.ast.isGramEdge(firstPath)).toBeTruthy();
  });

  it('10000 empty edge', () => {
    const src = gram.stringify(gram.builder.seq( 
      range(10000).map( () => makeEdge()) 
    ));
    const result = gram.parse(src);
    // console.log(inspect(result));
    const firstPath = result.children[0];
    expect(gram.ast.isGramEdge(firstPath)).toBeTruthy();
  });
  
});
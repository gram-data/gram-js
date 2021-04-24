import { toAST } from '../../src/parse';
import {
  isGramEdge,
  isGramNode,
  isGramPath,
  isGramSeq,
} from '@gram-data/gram-ast';
import { Node } from 'unist';

let DEBUG = true;

const inspect = require('unist-util-inspect');

// @ts-ignore
const show = (ast: Node) => {
  if (DEBUG) console.log(inspect(ast));
};

describe('parsing multiple node paths', () => {
  it('() () () is a sequence of nodes separated by whitespace', () => {
    const src = `() () ()`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // show(result);
    expect(isGramSeq(result));
    const firstPath = result.children[0];
    expect(isGramNode(firstPath)).toBeTruthy();
    const secondPath = result.children[1];
    expect(isGramNode(secondPath)).toBeTruthy();
    const thirdPath = result.children[2];
    expect(isGramNode(thirdPath)).toBeTruthy();
  });

  it('(),() is a single path "pair" joined by commas', () => {
    const src = `(),()`; // 2 nodes joined by 1 'pair'
    const result = toAST(src);
    expect(result).toBeDefined();
    // show(result);
    const firstPath = result.children[0];
    expect(isGramPath(firstPath)).toBeTruthy();
    const firstNode = firstPath.children[0];
    expect(isGramNode(firstNode));
    const secondNode = firstPath.children[1];
    expect(isGramNode(secondNode)).toBeTruthy();
  });

  it('(),(),() is a "pair tree" forming path continuation', () => {
    const src = `(),(),()`; // 3 nodes joined by 2 pairs
    const result = toAST(src);
    expect(result).toBeDefined();
    // show(result);
    const firstPair = result.children[0];
    expect(isGramPath(firstPair)).toBeTruthy();
    expect(firstPair.kind).toBe('pair');
    const firstNode = firstPair.children[0];
    expect(isGramNode(firstNode));
    const secondPair = firstPair.children[1];
    expect(isGramPath(secondPair)).toBeTruthy();
    expect(secondPair!.kind).toBe('pair');
    const secondNode = secondPair!.children[0];
    expect(isGramNode(secondNode)).toBeTruthy();
    const thirdNode = secondPair!.children[0];
    expect(isGramNode(thirdNode)).toBeTruthy();
  });

  it('(), (), () is a single path "continuation" joined by commas with trailing whitespace', () => {
    const src = `(), (), ()`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // show(result);
    const firstPath = result.children[0];
    expect(isGramPath(firstPath)).toBeTruthy();
    const firstNode = firstPath.children[0];
    expect(isGramNode(firstNode));
    const secondPath = firstPath.children[1];
    expect(isGramPath(secondPath)).toBeTruthy();
    const secondNode = secondPath!.children[0];
    expect(isGramNode(secondNode)).toBeTruthy();
    const thirdNode = secondPath!.children[0];
    expect(isGramNode(thirdNode)).toBeTruthy();
  });
});

describe('parsing multiple edge paths', () => {
  it('(a)-->(b) (c)<--(d) is a sequence of edges separated by whitespace', () => {
    const src = `(a)-->(b) (c)<--(d)`;
    const result = toAST(src);
    expect(result).toBeDefined();
    // show(result);
    expect(isGramSeq(result));

    const firstPath = result.children[0];
    expect(isGramEdge(firstPath)).toBeTruthy();
    const firstNode = firstPath.children[0];
    expect(isGramNode(firstNode)).toBeTruthy();
    const secondNode = firstPath.children[1];
    expect(isGramNode(secondNode)).toBeTruthy();

    const secondPath = result.children[1];
    expect(isGramEdge(secondPath)).toBeTruthy();
    const thirdNode = secondPath.children[0];
    expect(isGramNode(thirdNode)).toBeTruthy();
    const fourthNode = secondPath.children[1];
    expect(isGramNode(fourthNode)).toBeTruthy();
  });

  it('(a)-->(b),(c)<--(d) is a single path continuation of edges joined by a comma', () => {
    const src = `(a)-->(b),(c)<--(d)`; // 1 pair, 2 edges, 4 nodes
    const result = toAST(src);
    expect(result).toBeDefined();
    // show(result);
    expect(isGramSeq(result));

    const firstPath = result.children[0];
    expect(isGramPath(firstPath)).toBeTruthy();

    const firstEdge = firstPath.children[0];
    expect(isGramEdge(firstEdge)).toBeTruthy();
    const firstNode = firstEdge!.children[0];
    expect(isGramNode(firstNode)).toBeTruthy();
    const secondNode = firstEdge!.children[1];
    expect(isGramNode(secondNode)).toBeTruthy();

    const secondEdge = firstPath.children[1];
    expect(isGramEdge(secondEdge)).toBeTruthy();
    const thirdNode = secondEdge!.children[0];
    expect(isGramNode(thirdNode)).toBeTruthy();
    const fourthNode = secondEdge!.children[1];
    expect(isGramNode(fourthNode)).toBeTruthy();
  });

  it('(a)-->(b),(c)<--(d),(e) is a single path continuation of edges plus 1 node joined by a comma', () => {
    const src = `(a)-->(b),(c)<--(d),(e)`; // 2 pair, 2 edges, 5 nodes
    const result = toAST(src);
    expect(result).toBeDefined();
    // show(result);
    expect(isGramSeq(result));

    const firstPair = result.children[0];
    expect(isGramPath(firstPair)).toBeTruthy();

    const firstEdge = firstPair.children[0];
    expect(isGramEdge(firstEdge)).toBeTruthy();
    const firstNode = firstEdge!.children[0];
    expect(isGramNode(firstNode)).toBeTruthy();
    const secondNode = firstEdge!.children[1];
    expect(isGramNode(secondNode)).toBeTruthy();

    const secondPair = firstPair.children[1];
    expect(isGramPath(secondPair)).toBeTruthy();

    const secondEdge = secondPair!.children[0];
    expect(isGramEdge(secondEdge)).toBeTruthy();
    const thirdNode = secondEdge!.children[0];
    expect(isGramNode(thirdNode)).toBeTruthy();
    const fourthNode = secondEdge!.children[1];
    expect(isGramNode(fourthNode)).toBeTruthy();
    const fifthNode = secondPair!.children[1];
    expect(isGramNode(fifthNode)).toBeTruthy();
  });

  it('(a)-->(b) (c)<--(d) (e) is three separate paths', () => {
    const src = `(a)-->(b) (c)<--(d) (e)`; // 0 pair, 2 edges, 5 nodes
    const result = toAST(src);
    expect(result).toBeDefined();
    // show(result);
    expect(isGramSeq(result));

    const firstEdge = result.children[0];
    expect(isGramEdge(firstEdge)).toBeTruthy();
    const firstNode = firstEdge!.children[0];
    expect(isGramNode(firstNode)).toBeTruthy();
    const secondNode = firstEdge!.children[1];
    expect(isGramNode(secondNode)).toBeTruthy();

    const secondEdge = result.children[1];
    expect(isGramEdge(secondEdge)).toBeTruthy();
    const thirdNode = secondEdge!.children[0];
    expect(isGramNode(thirdNode)).toBeTruthy();
    const fourthNode = secondEdge!.children[1];
    expect(isGramNode(fourthNode)).toBeTruthy();

    const fifthNode = result.children[2];
    expect(isGramNode(fifthNode)).toBeTruthy();
  });
});

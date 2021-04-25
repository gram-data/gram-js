import { toAST } from '../../src/parser';
import { GramLiteral, isGramNode, isGramSeq } from '../../src/ast';
import { Node } from 'unist';
import { getLiteral } from '../../src/builder';

let DEBUG = true;

const inspect = require('unist-util-inspect');

// @ts-ignore
const show = (ast: Node) => {
  if (DEBUG) console.log(inspect(ast));
};

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
    expect(isGramSeq(result)).toBeTruthy();
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

  it('(:Aye) with a label', () => {
    const labels = ['Aye'];
    const src = `(:${labels.join(':')})`;
    const result = toAST(src);
    // show(result);
    expect(result).toBeDefined();
    const firstPath = result.children[0];
    expect(firstPath!.labels).toStrictEqual(expect.arrayContaining(labels));
  });

  it('(:Aye:Bee) with a label', () => {
    const labels = ['Aye', 'Bee'];
    const src = `(:${labels.join(':')})`;
    const result = toAST(src);
    // show(result);
    expect(result).toBeDefined();
    const firstPath = result.children[0];
    expect(firstPath!.labels).toStrictEqual(expect.arrayContaining(labels));
  });

  it('(a:Aye) with an id and label', () => {
    const nodeId = 'n';
    const labels = ['Aye'];
    const src = `(${nodeId}:${labels.join(':')})`;
    const result = toAST(src);
    // show(result);
    expect(result).toBeDefined();
    const firstPath = result.children[0];
    expect(firstPath!.id).toBe(nodeId);
    expect(firstPath!.labels).toStrictEqual(expect.arrayContaining(labels));
  });

  it('({k:"v"}) with a record', () => {
    const src = `({k:"v"})`;
    const result = toAST(src);
    const getK = getLiteral('k');
    // show(result);
    expect(result).toBeDefined();
    const firstPath = result.children[0];
    expect(firstPath!.record).toBeDefined();
    expect(firstPath!.record!.get('k')).toBeDefined();
    expect(getK(firstPath!.record!)).toBe('v');
  });

  it('(a:Aye{k:"v"}) with an id with label and record', () => {
    const nodeId = 'n';
    const labels = ['Aye'];
    const src = `(${nodeId}:${labels.join(':')}{k:"v"})`;
    const result = toAST(src);
    const getK = getLiteral('k');
    // show(result);
    expect(result).toBeDefined();
    const firstPath = result.children[0];
    expect(firstPath!.id).toBe(nodeId);
    expect(firstPath!.labels).toStrictEqual(expect.arrayContaining(labels));
    expect(firstPath!.record).toBeDefined();
    expect(firstPath!.record!.get('k')).toBeDefined();
    expect(getK(firstPath!.record!)).toBe('v');
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
    ${'({k:`v`} )'}
    ${'( {k:`v`})'}
    ${'( {k:`v`} )'}
    ${'( { k:`v` } )'}
    ${'( { k: `v` } )'}
    ${'( { k : `v` } )'}
    ${'({k: `v`, l: 2})'}
  `('$gram is tolerant of whitespace', ({ gram }) => {
    const result = toAST(gram);
    expect(result).toBeDefined();
    // console.log(inspect(result));
  });
});

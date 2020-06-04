import {MockRecord, boltRecordToAst} from '../src/index';
// import {Node as Neo4jNode} from 'neo4j-driver/lib/graph-types.js'
import * as gram from '@gram-data/gram-format';

const replaceWhitespace = (s:string) => s.replace(/\s+/g, ' ').trim();

describe('Transformed Neo4j result records', () => {
  it('skip empty results', () => {
    const literal = {};
    const record = new MockRecord(literal);
    const ast = boltRecordToAst(record);
    const formatted = gram.stringify(ast);
    expect(replaceWhitespace(formatted)).toBe("");
  });
  it('become defined paths with a record containing the fields', () => {
    const literal = {
      title: 'As Good As It Gets'
    };
    const record = new MockRecord(literal);
    const ast = boltRecordToAst(record);
    const formatted = gram.stringify(ast);
    expect(replaceWhitespace(formatted)).toBe("[ {title:`As Good As It Gets`} ]");
  });
});
import {MockRecord, boltRecordToAst} from '../src/index';
// import {Node as Neo4jNode} from 'neo4j-driver/lib/graph-types.js'
// import * as gram from '@gram-data/gram-format';

describe('Mock Neo4j result records', () => {
  it('can contain a string', () => {
    const literal = {
      title: 'As Good As It Gets'
    };
    const record = new MockRecord(literal);
    const ast = boltRecordToAst(record);
    // const formatted = gram.default.stringify(ast);
    // expect(record.has('title')).toBeTruthy();
    // expect(record.get('title')).toBe('As Good As It Gets');
  });
});

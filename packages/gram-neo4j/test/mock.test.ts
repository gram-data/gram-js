import {MockRecord} from '../src/index';
import {Node as Neo4jNode} from 'neo4j-driver/lib/graph-types.js'

describe('Mock Neo4j result records', () => {
  it('can contain a string', () => {
    const literal = {
      title: 'As Good As It Gets'
    };
    const record = new MockRecord(literal);
    expect(record.has('title')).toBeTruthy();
    expect(record.get('title')).toBe('As Good As It Gets');
  });
  it('can contain a number', () => {
    const literal = {
      rating: 9
    };
    const record = new MockRecord(literal);
    expect(record.has('rating')).toBeTruthy();
    expect(record.get('rating')).toBe(9);
  });
  it('can contain a node', () => {
    const literal = {
      node: new Neo4jNode(0, [], {})
    }
    const record = new MockRecord(literal);
    expect(record.has('node')).toBeTruthy();
  })
});

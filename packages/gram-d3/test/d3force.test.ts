import { GramNodeDatum, GramLinkDatum } from '../src';
import * as d3 from 'd3-force';

describe('D3Force with D3Gram model', () => {
  it('accepts GramNodeDatum', () => {
    const nodes: GramNodeDatum[] = [];
    nodes.push({ id: 'a' });
    d3.forceSimulation(nodes);
  });
  it('accepts GramLinkDatum', () => {
    const links: GramLinkDatum[] = [];
    d3.forceLink(links);
  });
  it('will position nodes', () => {
    const width = 1200;
    const height = 900;
    const nodeA: GramNodeDatum = {
      id: 'a',
    };
    const nodeB: GramNodeDatum = {
      id: 'b',
    };
    const nodes: GramNodeDatum[] = [nodeA, nodeB];
    const linkR: GramLinkDatum = {
      id: 'r',
      source: nodeA,
      target: nodeB,
    };
    const links: GramLinkDatum[] = [linkR];
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink<GramNodeDatum, GramLinkDatum>(links).id(d => d.id)
      )
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    // run the simulation
    simulation.stop();
    while (simulation.alpha() > simulation.alphaMin()) {
      simulation.tick();
    }

    expect(nodeA).toHaveProperty('x');
    expect(nodeA).toHaveProperty('y');
    expect(nodeA).toHaveProperty('vx');
    expect(nodeA).toHaveProperty('vy');

    expect(nodeB).toHaveProperty('x');
    expect(nodeB).toHaveProperty('y');
    expect(nodeB).toHaveProperty('vx');
    expect(nodeB).toHaveProperty('vy');
  });
});

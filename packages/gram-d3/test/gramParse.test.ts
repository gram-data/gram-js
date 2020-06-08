import { gramParse, GramNodeDatum, GramLinkDatum } from '../src';

import * as d3 from 'd3-force';

describe('gramParse', () => {
  it('links "right" direction from source to target', () => {
    const src = '(a)-->(b)';
    const graph = gramParse(src);
    expect(graph.links[0].source).toBe(graph.nodes[0].id);
    expect(graph.links[0].target).toBe(graph.nodes[1].id);
  });
  it('links "left" direction from target to source', () => {
    const src = '(a)<--(b)';
    const graph = gramParse(src);
    expect(graph.links[0].source).toBe(graph.nodes[1].id);
    expect(graph.links[0].target).toBe(graph.nodes[0].id);
  });
  it('links direction "none" from source to target', () => {
    const src = '(a)--(b)';
    const graph = gramParse(src);
    expect(graph.links[0].source).toBe(graph.nodes[0].id);
    expect(graph.links[0].target).toBe(graph.nodes[1].id);
  });
  it('correctly links longer paths', () => {
    const src = '(a)-->(b)<--(c)';
    const graph = gramParse(src);
    expect(graph.links[0].source).toBe(graph.nodes[0].id);
    expect(graph.links[0].target).toBe(graph.nodes[1].id);
    expect(graph.links[1].source).toBe(graph.nodes[2].id);
    expect(graph.links[1].target).toBe(graph.nodes[1].id);
  });
  it('handles labelled nodes', () => {
    const src = '(a:Person {born:date`1969-01-01`})-->(b:Event)<--(c:Movie)';
    const graph = gramParse(src);
    expect(graph.links[0].source).toBe(graph.nodes[0].id);
    expect(graph.links[0].target).toBe(graph.nodes[1].id);
    expect(graph.links[1].source).toBe(graph.nodes[2].id);
    expect(graph.links[1].target).toBe(graph.nodes[1].id);
  });

  it('produces a graph ready for d3-force simulation', () => {
    const src = '(a)-->(b)';
    const graph = gramParse(src);

    const width = 1200,
      height = 900;
    const simulation = d3
      .forceSimulation(graph.nodes)
      .force(
        'link',
        d3.forceLink<GramNodeDatum, GramLinkDatum>(graph.links).id(d => d.id)
      )
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    // run the simulation
    simulation.stop();
    while (simulation.alpha() > simulation.alphaMin()) {
      simulation.tick();
    }

    graph.nodes.forEach(node => {
      expect(node).toHaveProperty('x');
      expect(node).toHaveProperty('y');
      expect(node).toHaveProperty('vx');
      expect(node).toHaveProperty('vy');
    });
  });
});

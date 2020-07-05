import { gramParse, GramNodeDatum, GramLinkDatum } from '../src';

import * as d3 from 'd3-force';

describe('gramParse', () => {
  it('links "right" direction from source to target', () => {
    const src = '(a)-->(b)';
    const d3Graph = gramParse(src);
    expect(d3Graph.links[0].source).toBe(d3Graph.nodes[0].id);
    expect(d3Graph.links[0].target).toBe(d3Graph.nodes[1].id);
  });
  it('links "left" direction from target to source', () => {
    const src = '(a)<--(b)';
    const d3Graph = gramParse(src);
    expect(d3Graph.links[0].source).toBe(d3Graph.nodes[1].id);
    expect(d3Graph.links[0].target).toBe(d3Graph.nodes[0].id);
  });
  it('links direction "none" from source to target', () => {
    const src = '(a)--(b)';
    const d3Graph = gramParse(src);
    expect(d3Graph.links[0].source).toBe(d3Graph.nodes[0].id);
    expect(d3Graph.links[0].target).toBe(d3Graph.nodes[1].id);
  });
  // it('correctly links longer paths', () => {
  //   const src = '(a)-->(b)<--(c)';
  //   const d3Graph = gramParse(src);
  //   expect(d3Graph.links[0].source).toBe(d3Graph.nodes[0].id);
  //   expect(d3Graph.links[0].target).toBe(d3Graph.nodes[1].id);
  //   expect(d3Graph.links[1].source).toBe(d3Graph.nodes[2].id);
  //   expect(d3Graph.links[1].target).toBe(d3Graph.nodes[1].id);
  // });
  it('handles labelled nodes', () => {
    const src = '(a:Person)-->(c:Movie)';
    const d3Graph = gramParse(src);
    expect(d3Graph.nodes[0].labels).toHaveLength(1);
    expect(d3Graph.nodes[0].labels[0]).toBe('Person');
    expect(d3Graph.nodes[1].labels).toHaveLength(1);
    expect(d3Graph.nodes[1].labels[0]).toBe('Movie');
  });

  it('handles node data records as a nested "record" object', () => {
    const isoDate = '1969-01-01';
    const src = `(a:Person {born:date\`${isoDate}\`})`;
    const d3Graph = gramParse(src);
    const d3Node = d3Graph.nodes[0];
    expect(d3Node.record).toHaveProperty('born');
    expect(d3Node.record.born).toStrictEqual(new Date(isoDate));
  });

  it('handles node data records as a nested "record" object', () => {
    const name = 'Napoleon';
    const group = 1;
    const src = `(Napoleon{name:"${name}",group:${group}})`;
    const d3Graph = gramParse(src);
    const d3Node = d3Graph.nodes[0];

    expect(d3Node.record).toHaveProperty('name');
    expect(d3Node.record.name).toStrictEqual(name);
    expect(d3Node.record).toHaveProperty('group');
    expect(d3Node.record.group).toStrictEqual(group);
  });

  it('produces a d3Graph ready for d3-force simulation', () => {
    const src = '(a)-->(b)';
    const d3Graph = gramParse(src);

    const width = 1200,
      height = 900;
    const simulation = d3
      .forceSimulation(d3Graph.nodes)
      .force(
        'link',
        d3.forceLink<GramNodeDatum, GramLinkDatum>(d3Graph.links).id(d => d.id)
      )
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    // run the simulation
    simulation.stop();
    while (simulation.alpha() > simulation.alphaMin()) {
      simulation.tick();
    }

    d3Graph.nodes.forEach(node => {
      expect(node).toHaveProperty('x');
      expect(node).toHaveProperty('y');
      expect(node).toHaveProperty('vx');
      expect(node).toHaveProperty('vy');
    });
  });
});

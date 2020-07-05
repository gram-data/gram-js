import * as ast from '@gram-data/gram-ast';
import { parse, transform } from '@gram-data/gram-format';
import { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force';
import { recordToValue } from './record-to-object';

const MISSING_ID = '_missing_id';

export interface GramNodeDatum extends SimulationNodeDatum {
  id: string;
  labels: string[];
  record: { [key: string]: any };
}

export const gramNodeDatum = (
  id?: string,
  labels?: string[],
  record?: { [key: string]: any }
) => {
  return {
    id: id || MISSING_ID,
    labels: labels || [],
    record: record ? recordToValue(record) : {},
  };
};
export const isGramNodeDatum = (o: any): o is GramNodeDatum => {
  return (o as GramNodeDatum).id !== undefined;
};

export const gramLinkDatum = (
  source: string,
  target: string,
  id?: string,
  labels?: string[],
  record?: { [key: string]: any }
) => {
  return {
    id: id || MISSING_ID,
    labels: labels || [],
    record: record ? recordToValue(record) : {},
    source,
    target
  };
}

export interface GramLinkDatum extends SimulationLinkDatum<GramNodeDatum> {
  id: string;
  record: { [key: string]: any };
}

export interface GramPathDatum {
  links: GramLinkDatum[];
}

export interface D3Gram {
  nodes: GramNodeDatum[];
  links: GramLinkDatum[];
  paths: GramPathDatum[];
}

export const nodeToD3 = (node: ast.GramNode): GramNodeDatum => {
  return gramNodeDatum(node.id, node.labels, node.record);
};

const source = (edge: ast.GramEdge): string => {
  if (edge.direction === 'left') return edge.children[1].id || MISSING_ID;
  return edge.children[0].id || MISSING_ID;
};

const target = (edge: ast.GramEdge): string => {
  if (edge.direction === 'left') return edge.children[0].id || MISSING_ID;
  return edge.children[1].id || MISSING_ID;
};

export const edgeToD3 = (edge: ast.GramEdge): GramLinkDatum => {
  return gramLinkDatum(source(edge), target(edge), edge.id,edge.labels, edge.record)
};

export const gramParse = (src: string): D3Gram => {
  const parsed = parse(src);
  const d3Gram = {
    nodes: transform.mergeNodes(parsed).map(nodeToD3),
    links: transform.mergeEdges(parsed).map(edgeToD3),
    paths: [],
  };

  return d3Gram;
};

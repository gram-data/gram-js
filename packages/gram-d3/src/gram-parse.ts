import { ast, parse, transform, find } from '@gram-data/gram-format';
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

export interface GramLinkDatum extends SimulationLinkDatum<GramNodeDatum> {
  id: string;
}

export interface GramPathDatum {
  links: GramLinkDatum[];
}

export interface D3Gram {
  nodes: GramNodeDatum[];
  links: GramLinkDatum[];
  paths: GramPathDatum[];
}

export const nodeToD3 = (node: ast.Node): GramNodeDatum => {
  return gramNodeDatum(node.id, node.labels, node.record);
};

const source = (edge: ast.Edge): string => {
  if (edge.direction === 'left') return find.rightNodeOf(edge).id || MISSING_ID;
  return find.leftNodeOf(edge).id || MISSING_ID;
};

const target = (edge: ast.Edge): string => {
  if (edge.direction === 'left') return find.leftNodeOf(edge).id || MISSING_ID;
  return find.rightNodeOf(edge).id || MISSING_ID;
};

export const edgeToD3 = (edge: ast.Edge): GramLinkDatum => {
  return {
    id: edge.id || MISSING_ID,
    source: source(edge),
    target: target(edge),
  };
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

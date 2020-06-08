import { ast, parse, transform, find } from '@gram-data/gram-format';
import { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force';

const MISSING_ID = '_missing_id';

export interface GramNodeDatum extends SimulationNodeDatum {
  id: string;
  labels: string[];
  properties: { [key: string]: any };
}

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
  return {
    id: node.id || MISSING_ID,
    labels: [],
    properties: {},
  };
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
    nodes: transform.foldNodes(parsed).map(nodeToD3),
    links: transform.foldEdges(parsed).map(edgeToD3),
    paths: [],
  };

  return d3Gram;
};

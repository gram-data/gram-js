import { GramParent, Record, GramAstStructure } from './gram-ast';

const visit = require('unist-util-visit');

export interface GramProfile {
  path: {
    count: number;
    identifiers: Set<string>;
    labels: Set<string>;
  };
  node: {
    count: number;
    identifiers: Set<string>;
    labels: Set<string>;
  };
  relationship: {
    count: number;
    identifiers: Set<string>;
    labels: Set<string>;
  };
  properties: { [key: string]: string };
}

const profile = (ast: GramParent): GramProfile => {
  const profiled: GramProfile = {
    path: {
      count: 0,
      identifiers: new Set<string>(),
      labels: new Set<string>(),
    },
    node: {
      count: 0,
      identifiers: new Set<string>(),
      labels: new Set<string>(),
    },
    relationship: {
      count: 0,
      identifiers: new Set<string>(),
      labels: new Set<string>(),
    },
    properties: {} as { [key: string]: string },
  };

  const profileRecord = (record: Record) => {
    for (let prop of Object.entries(record)) {
      const key = prop[0];
      const value = prop[1];
      const valueType = Array.isArray(value)
        ? `Array<${value[0].type}>`
        : 'type' in value && typeof value.type === 'string'
        ? value.type
        : 'record';

      profiled.properties[key] = valueType;
    }
  };

  visit(ast, (element: GramAstStructure) => {
    switch (element.type) {
      case 'gram':
        break;
      case 'path':
        profiled.path.count++;
        break;
      case 'node':
        profiled.node.count++;
        if (element.id) profiled.node.identifiers.add(element.id!);
        if (element.labels) element.labels.forEach(label => profiled.node.labels.add(label));
        if (element.record) profileRecord(element.record);
        break;
      case 'edge':
        profiled.relationship.count++;
        if (element.id) profiled.relationship.identifiers.add(element.id!);
        if (element.labels) element.labels.forEach(label => profiled.relationship.labels.add(label));
        if (element.record) profileRecord(element.record);
        break;
    }
  });

  return profiled;
};

export default profile;

import { ast, builder } from '@gram-data/gram-format';

import neo4j, { Record } from 'neo4j-driver';
// import {map} from 'rxjs/operators';

const UNDEFINED = 'undefined';

export const primitiveToAst = (v: any): ast.Literal => {
  if (neo4j.isInt(v)) return builder.integer(v.toString());
  if (typeof v === 'string') return builder.string(v);
  if (neo4j.isDate(v)) return builder.date(v.toString());
  return builder.string(UNDEFINED);
};

export const valueToAst = (v: any | any[]): ast.Literal | ast.Literal[] => {
  if (v instanceof Array) return v.map(primitiveToAst);
  // if (v instanceof Object) return objectToAst(v); ABK nested objects?
  return primitiveToAst(v);
};

export const objectToAstRecord = (o: any): ast.Record => {
  return builder.record(
    Object.entries(o).map(([k, v]) => builder.property(k, valueToAst(v)))
  );
};

export const boltRecordToAst = (record: Record): ast.Path => {
  const recordAsObject = record.toObject();
  const child = undefined;
  const id = undefined;
  const labels = undefined;
  return builder.path(child, id, labels, objectToAstRecord(recordAsObject));
};

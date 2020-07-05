// import { ast, builder, identity } from '@gram-data/gram-format';

// import neo4j, { Record, Node, Relationship, Path, Integer } from 'neo4j-driver';
// import {isNode as isBoltNode, isRelationship as isBoltRelationship, isPath as isBoltPath } from 'neo4j-driver/lib/graph-types.js'

// const UNDEFINED = 'undefined';

// export const isNode = (o: any): o is Node => isBoltNode(o);
// export const isRelationship = (o: any): o is Relationship => isBoltRelationship(o);
// export const isPath = (o: any): o is Path => isBoltPath(o);

// export const primitiveToAst = (v: any): ast.Literal => {
//   if (neo4j.isInt(v)) return builder.integer(v.toString());
//   if (typeof v === 'string') return builder.string(v);
//   if (neo4j.isDate(v)) return builder.date(v.toString());
//   return builder.string(UNDEFINED);
// };

// export const valueToAst = (v: any | any[]): ast.Literal | ast.Literal[] => {
//   if (v instanceof Array) return v.map(primitiveToAst);
//   // if (v instanceof Object) return objectToAst(v); ABK nested objects?
//   return primitiveToAst(v);
// };

// export const propertiesToAstRecord = (properties: [string,any][]): ast.Record => {
//   return builder.record(properties.map(([k, v]) => builder.property(k, valueToAst(v))));
// };

// export const toValidIdentifier = (s:string) => identity.isValidIdentifier(s) ? `${s}` : `\`${s}\``;

// export const objectToAstRecord = (o: any): ast.Record => {
//   return propertiesToAstRecord(Object.entries(o).map(([k,v]) => [toValidIdentifier(k), v]));
// };

// export const boltIntegerToGramIdentifier = (i:Integer) => (identity.integerLiteralToBaseID(identity.alphabets.base62,i.toString(10)))

// export const boltNodeToAstNode = (n:Node) : ast.Node => {
//   return builder.node(boltIntegerToGramIdentifier(n.identity), n.labels, objectToAstRecord(n.properties));
// }

// export const boltRelationshipToAstRelationship = (r:Relationship) : ast.Edge => {
//   return builder.edge(
//     [
//       builder.node(boltIntegerToGramIdentifier(r.start)),
//       builder.node(boltIntegerToGramIdentifier(r.end))
//     ],
//     "right",
//     boltIntegerToGramIdentifier(r.identity), 
//     [r.type], 
//     objectToAstRecord(r.properties));
// }

// const concatAstPath = (left: (ast.Node | ast.Edge | undefined), right: (ast.Node | ast.Edge)) => {
//   if (ast.isNode(left)) {
//     if (ast.isNode(right)) {
//       return builder.edge([left,right], "pair");
//     } else {
//       return builder. 
//     }
//   } else if (ast.isEdge(left)) {
//     return 
//   }
//   return right;
// }

// export const elementsToAstPath = (elements: (Node | Relationship | Path)[]) : (ast.Path) => {
//   return elements.reduceRight( (acc:ast.Path, element: (Node | Relationship | Path) ) => {
//     if (isNode(element)) {
//       acc.children[0] = concatAstPath(acc.children[0], boltNodeToAstNode(element));
//       return acc;
//     }
//     if (isRelationship(element)) {
//       acc.children[0] = concatAstPath(acc.children[0], boltRelationshipToAstRelationship(element));
//       return acc;
//     }
//     return acc;
//   }, builder.path());
// }

// export const boltRecordToAstPath = (record: Record): ast.Path => {
//   const recordAsObject = record.toObject();
//   const {elements, properties} = Object.entries(recordAsObject).reduce( (acc, [k,v]) => { 
//     if (isNode(v) || isRelationship(v) || isPath(v)) {
//       acc.elements.push(v)
//     } else {
//       acc.properties.push([toValidIdentifier(k),v])
//     }
//     return acc }, 
//     {elements:[], properties:[]} as { elements:any[], properties:[string,any][]}
//   );
//   const child = elementsToAstPath(elements).children[0];
//   const id = undefined;
//   const labels = undefined;
//   return builder.path(child, id, labels, propertiesToAstRecord(properties));
// };

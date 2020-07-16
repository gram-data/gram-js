// import * as ast from '@gram-data/gram-ast';

// export const literalToDate = (literal: ast.DateLiteral) => {
//   return new Date(literal.value);
// };

// export const literalToValue = (literal: ast.GramLiteral) => {
//   if (ast.isTaggedLiteral(literal)) {
//     switch (literal.tag) {
//       case 'date':
//         return new Date(literal.value);
//       default:
//         return literal.value;
//     }
//   } else {
//     switch (literal.type) {
//       case 'boolean':
//         return JSON.parse(literal.value);
//       case 'integer':
//         return Number.parseInt(literal.value);
//       case 'decimal':
//         return Number.parseFloat(literal.value);
//       default:
//         return literal.value;
//     }
//   }
// };

// export const recordToValue = (recordValue: ast.GramRecordValue): any => {
//   if (Array.isArray(recordValue)) {
//     return recordValue.map(v => recordToValue(v));
//   } else if (ast.isLiteral(recordValue)) {
//     return literalToValue(recordValue);
//   } else {
//     return Object.entries(recordValue).reduce((acc, [k, v]) => {
//       acc[k] = recordToValue(v);
//       return acc;
//     }, {} as { [key: string]: any });
//   }
// };

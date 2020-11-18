import {
  BooleanLiteral,
  StringLiteral,
  TaggedLiteral,
  DateLiteral,
  IntegerLiteral,
  MeasurementLiteral,
  DecimalLiteral,
  HexadecimalLiteral,
  OctalLiteral,
  TimeLiteral,
  DurationLiteral,
  GramRecordValue,
  GramLiteral,
  isGramLiteralArray,
  isLiteral,
  AnyGramLiteral,
  isGramRecord,
} from '@gram-data/gram-ast';

import {
  Parent as UnistParent,
  Literal as UnistLiteral,
  Node as UnistNode,
} from 'unist';

export const iso8601Year = /^([+-]\d{4,}\b|\d{4})$/;
export const iso8601YearMonth = /^([0-9]{4})-(1[0-2]|0[1-9])$/;
export const iso8601YearMonthDay = /^([0-9]{4})(-?)(1[0-2]|0[1-9])\2(3[01]|0[1-9]|[12][0-9])$/;
export const iso8601OrdinalDate = /^([0-9]{4})-?(36[0-6]|3[0-5][0-9]|[12][0-9]{2}|0[1-9][0-9]|00[1-9])$/;
export const iso8601WeekOfYear = /^([0-9]{4})-?W(5[0-3]|[1-4][0-9]|0[1-9])$/;
export const iso8601WeekDate = /^([0-9]{4})-?W(5[0-3]|[1-4][0-9]|0[1-9])-?([1-7])$/;
export const iso8601LocalTime = /^(2[0-3]|[01][0-9]):?([0-5][0-9])(:?([0-5][0-9](\.[0-9]{3})?))?$/;
// export const iso8601Time = /^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9](\.[0-9]{3})?)?(Z|[+-](?:2[0-3]|[01][0-9])(?::?(?:[0-5][0-9]))?)?$/;
export const iso8601Time = /^(2[0-3]|[01][0-9]):?([0-5][0-9]):?([0-5][0-9](\.[0-9]{3})?)?(Z|([+-])((?:2[0-3]|[01][0-9]))(?::?([0-5][0-9]))?)?$/;
export const iso8601Duration = /^P((\d+)Y)?((\d+)M)?((\d+)D)?(T((\d+)H)?((\d+)M)?((\d+)S)?)?$/;
export const iso8601Repeat = /^R(\d*)$/;

class InvalidAstError extends Error {
  ast: UnistParent | UnistLiteral | UnistNode;
  constructor(ast: UnistParent | UnistLiteral | UnistNode) {
    super('AST is invalid:' + JSON.stringify(ast));
    this.name = 'InvalidAstError';
    this.ast = ast;
  }
}

export const valueOf = (recordValue: GramRecordValue): any => {
  if (isGramLiteralArray(recordValue)) {
    return recordValue.map((v:GramLiteral) => valueOf(v));
  } else if (isLiteral(recordValue)) {
    return valueOfLiteral(recordValue as AnyGramLiteral);
  } else if (isGramRecord(recordValue)) {
    return recordValue.reduce((acc, property) => {
      acc[property.name] = valueOf(property.value);
      return acc;
    }, {} as { [key: string]: any });
  }
};

function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}
export const valueOfLiteral = (ast:AnyGramLiteral):any => {
  switch (ast.type) {
    case 'boolean': return valueOfBoolean(ast);
    case 'string': return valueOfString(ast);
    case 'integer': return valueOfInteger(ast);
    case 'decimal': return valueOfDecimal(ast);
    case 'hexadecimal': return valueOfHexadecimal(ast);
    case 'octal': return valueOfOctal(ast);
    case 'tagged': return 'tag, you are it!';
    case 'measurement': return 'measure by measure';
    default: 
      return assertNever(ast)
  }
}

export const valueOfBoolean = (ast: BooleanLiteral) =>
  ast.value && ast.value.toLowerCase() === 'true';

export const valueOfString = (ast: StringLiteral) => {
  if (ast.value) {
    return ast.value;
  }
  throw new InvalidAstError(ast);
};

export const valueOfTaggedLiteral = (ast: TaggedLiteral) => {
  if (ast.value) {
    return ast.value;
  }
  throw new InvalidAstError(ast);
};

export const valueOfDate = (ast: DateLiteral) => {
  if (ast.value) {
    let extracted = iso8601YearMonthDay.exec(ast.value);
    if (extracted) {
      return new Date(
        Number.parseInt(extracted[1]),
        Number.parseInt(extracted[3]),
        Number.parseInt(extracted[4])
      );
    }
    extracted = iso8601YearMonth.exec(ast.value);
    if (extracted) {
      return new Date(
        Number.parseInt(extracted[1]),
        Number.parseInt(extracted[2])
      );
    }
    extracted = iso8601Year.exec(ast.value);
    if (extracted) {
      return new Date(Number.parseInt(extracted[1]), 1);
    }
    throw SyntaxError(`Unable to parse date from ${ast.value}`);
  }
  throw new InvalidAstError(ast);
};

const MILLIS_IN_A_SECOND = 1000;
const MILLIS_IN_A_MINUTE = MILLIS_IN_A_SECOND * 60;
const MILLIS_IN_AN_HOUR = MILLIS_IN_A_MINUTE * 60;
const MILLIS_IN_A_DAY = MILLIS_IN_AN_HOUR * 24;
const MILLIS_IN_A_MONTH = MILLIS_IN_A_DAY * 30;
const MILLIS_IN_A_YEAR = MILLIS_IN_A_DAY * 365;

/**
 * Value of time as number of milliseconds since midnight.
 *
 * @param ast
 */
export const valueOfTime = (ast: TimeLiteral) => {
  if (ast.value) {
    const extracted = iso8601Time.exec(ast.value);
    if (extracted) {
      const hours = Number.parseInt(extracted[1]);
      const minutes = extracted[1] ? Number.parseInt(extracted[2]) : 0;
      const seconds = extracted[3] ? Number.parseFloat(extracted[3]) : 0.0;
      const tz = extracted[5];

      // console.log('time', extracted, hours, minutes, seconds, tz);

      const millis =
        hours * MILLIS_IN_AN_HOUR +
        minutes * MILLIS_IN_A_MINUTE +
        seconds * MILLIS_IN_A_SECOND;

      if (tz) {
        const offset =
          tz === 'Z'
            ? 0
            : Number.parseInt(extracted[7]) * MILLIS_IN_AN_HOUR +
              Number.parseInt(extracted[8] || '0') * MILLIS_IN_A_MINUTE;
        return new Date(
          extracted[6] === '-' ? millis + offset : millis - offset
        );
      }
      return new Date(millis);
    }
    throw SyntaxError(`Unable to parse time from ${ast.value}`);
  }
  throw new InvalidAstError(ast);
};

/**
 * Evaluates the duration as a total of milliseconds, unreliably estimating milliseconds
 * per year or month. Reliable duration values can only be calculated with precision
 * of days, hours, minutes or seconds.
 *
 * @param ast
 */
export const valueOfDuration = (ast: DurationLiteral) => {
  if (ast.value) {
    const extracted = iso8601Duration.exec(ast.value);
    if (extracted) {
      const years = extracted[2] ? Number.parseInt(extracted[2]) : 0;
      const months = extracted[4] ? Number.parseInt(extracted[4]) : 0;
      const days = extracted[6] ? Number.parseInt(extracted[6]) : 0;
      const hours = extracted[9] ? Number.parseInt(extracted[9]) : 0;
      const minutes = extracted[11] ? Number.parseInt(extracted[11]) : 0;
      const seconds = extracted[13] ? Number.parseInt(extracted[13]) : 0;

      // console.log('duration', extracted, years, months, days, hours, minutes, seconds);

      const millis =
        years * MILLIS_IN_A_YEAR +
        months * MILLIS_IN_A_MONTH +
        days * MILLIS_IN_A_DAY +
        hours * MILLIS_IN_AN_HOUR +
        minutes * MILLIS_IN_A_MINUTE +
        seconds * MILLIS_IN_A_SECOND;

      return new Date(millis);
    }
    throw SyntaxError(`Unable to parse duration from ${ast.value}`);
  }
  throw new InvalidAstError(ast);
};

export const valueOfInteger = (ast: IntegerLiteral) => {
  if (ast.value) {
    return Number.parseInt(ast.value);
  } else throw new InvalidAstError(ast);
};

export const valueOfMeasurement = (ast: MeasurementLiteral) => {
  if (ast.value) {
    return Number.parseInt(ast.value);
  } else throw new InvalidAstError(ast);
};

export const valueOfDecimal = (ast: DecimalLiteral) => {
  if (ast.value) {
    return Number.parseFloat(ast.value);
  } else throw new InvalidAstError(ast);
};

export const valueOfHexadecimal = (ast: HexadecimalLiteral) => {
  if (ast.value) {
    return Number.parseInt(ast.value, 16);
  } else throw new InvalidAstError(ast);
};

export const valueOfOctal = (ast: OctalLiteral) => {
  if (ast.value) {
    return Number.parseInt(ast.value, 8);
  } else throw new InvalidAstError(ast);
};

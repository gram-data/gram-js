import * as ast from '../src/gram-ast';

describe('gram ast boolean literals', () => {
  it('are a type with value', () => {
    const literal = { type: 'boolean', value: 'true' };
    expect(ast.isBooleanLiteral(literal)).toBeTruthy();
  });
  it('must have a type of "boolean"', () => {
    const literal = { type: 'balloon', value: 'false' };
    expect(ast.isBooleanLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'boolean' };
    expect(ast.isBooleanLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'boolean', value: 'banana' };
    expect(ast.isBooleanLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'boolean', value: 'false' };
    if (ast.isBooleanLiteral(literal)) expect(literal.type === 'boolean').toBeTruthy();
    else fail();
  });
});

describe('gram ast string literals', () => {
  it('are a type with value', () => {
    const literal = { type: 'string', value: 'textual information' };
    expect(ast.isStringLiteral(literal)).toBeTruthy();
  });
  it('must have a type of "string"', () => {
    const literal = { type: 'strange', value: 'textual information' };
    expect(ast.isStringLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'string' };
    expect(ast.isStringLiteral(literal)).toBeFalsy();
  });
  it('are lucky because the value is always a string so it is always valid', () => {
    const literal = { type: 'string', value: 'what string is not a string?' };
    expect(ast.isStringLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'string', value: 'false' };
    if (ast.isStringLiteral(literal)) expect(literal.type === 'string').toBeTruthy();
    else fail();
  });
});

describe('gram ast tagged literals', () => {
  it('are a type with value and a tag', () => {
    const literal = { type: 'tagged', tag: 'test', value: 'textual information' };
    expect(ast.isTaggedLiteral(literal)).toBeTruthy();
  });
  it('must be of type "tagged"', () => {
    const literal = { type: 'strange', tag: 'test', value: 'textual information' };
    expect(ast.isTaggedLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'tagged', tag: 'test' };
    expect(ast.isTaggedLiteral(literal)).toBeFalsy();
  });
  it('are lucky because the value is always a string so it is always valid', () => {
    const literal = { type: 'tagged', tag: 'test', value: 'what string is not a string?' };
    expect(ast.isTaggedLiteral(literal)).toBeTruthy();
  });
  it('must have a tag', () => {
    const literal = { type: 'tagged', value: 'some text' };
    expect(ast.isTaggedLiteral(literal)).toBeFalsy();
  });
  it('accept any string as a valid tag', () => {
    const literal = {
      type: 'tagged',
      tag: 'tags should follow something like identifier rules but the ast does not enforce that',
      value: 'what string is not a string?',
    };
    expect(ast.isTaggedLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'tagged', tag: 'test', value: 'false' };
    if (ast.isTaggedLiteral(literal)) expect(literal.type === 'tagged').toBeTruthy();
    else fail();
  });
});

describe('gram ast integer literals', () => {
  it('are a type with value', () => {
    const literal = { type: 'integer', value: '1123581321345589' };
    expect(ast.isIntegerLiteral(literal)).toBeTruthy();
  });
  it('must have a type of "integer"', () => {
    const literal = { type: 'interval', value: '1123581321345589' };
    expect(ast.isIntegerLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'integer' };
    expect(ast.isIntegerLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'integer', value: 'this is not a number' };
    expect(ast.isIntegerLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'integer', value: 'false' };
    if (ast.isIntegerLiteral(literal)) expect(literal.type === 'integer').toBeTruthy();
    else fail();
  });
});

describe('gram ast unit literals', () => {
  it('are a type with value and a unit', () => {
    const literal = { type: 'unit', unit: 'test', value: 'textual information' };
    expect(ast.isUnitLiteral(literal)).toBeTruthy();
  });
  it('must be of type "unit"', () => {
    const literal = { type: 'unity', unit: 'test', value: 'textual information' };
    expect(ast.isUnitLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'unit', unit: 'test' };
    expect(ast.isUnitLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'unit', unit: 'test', value: 'what string is not a string?' };
    expect(ast.isUnitLiteral(literal)).toBeTruthy();
  });
  it('must have a unit', () => {
    const literal = { type: 'unit', value: 'some text' };
    expect(ast.isUnitLiteral(literal)).toBeFalsy();
  });
  it('accept any string as a valid tag', () => {
    const literal = {
      type: 'unit',
      unit: 'units should follow something like identifier rules but the ast does not enforce that',
      value: 'what string is not a string?',
    };
    expect(ast.isUnitLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'unit', unit: 'test', value: 'false' };
    if (ast.isUnitLiteral(literal)) expect(literal.type === 'unit').toBeTruthy();
    else fail();
  });
});

describe('gram ast decimal literals', () => {
  it('are a type with value', () => {
    const literal = { type: 'decimal', value: '1.123581321345589' };
    expect(ast.isDecimalLiteral(literal)).toBeTruthy();
  });
  it('must have a type of "decimal"', () => {
    const literal = { type: 'decimark', value: '1.123581321345589' };
    expect(ast.isDecimalLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'decimal' };
    expect(ast.isDecimalLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'decimal', value: 'this is not a number' };
    expect(ast.isDecimalLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'decimal', value: 'false' };
    if (ast.isDecimalLiteral(literal)) expect(literal.type === 'decimal').toBeTruthy();
    else fail();
  });
});

describe('gram ast hexadecimal literals', () => {
  it('are a type with value', () => {
    const literal = { type: 'hexadecimal', value: '0xCAFE1337' };
    expect(ast.isHexadecimalLiteral(literal)).toBeTruthy();
  });
  it('must have a type of "hexadecimal"', () => {
    const literal = { type: 'hexagon', value: '1.0xCAFE1337' };
    expect(ast.isHexadecimalLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'hexadecimal' };
    expect(ast.isHexadecimalLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'hexadecimal', value: 'this is not a number' };
    expect(ast.isHexadecimalLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'hexadecimal', value: 'false' };
    if (ast.isHexadecimalLiteral(literal)) expect(literal.type === 'hexadecimal').toBeTruthy();
    else fail();
  });
});

describe('gram ast octal literals', () => {
  it('are a type with value', () => {
    const literal = { type: 'octal', value: '01372' };
    expect(ast.isOctalLiteral(literal)).toBeTruthy();
  });
  it('must have a type of "octal"', () => {
    const literal = { type: 'octopus', value: '1.01372' };
    expect(ast.isOctalLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'octal' };
    expect(ast.isOctalLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'octal', value: 'this is not a number' };
    expect(ast.isOctalLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'octal', value: 'false' };
    if (ast.isOctalLiteral(literal)) expect(literal.type === 'octal').toBeTruthy();
    else fail();
  });
});

describe('gram ast tagged date literals', () => {
  it('are a type with value and a tag', () => {
    const literal = { type: 'tagged', tag: 'date', value: 'textual information' };
    expect(ast.isDateLiteral(literal)).toBeTruthy();
  });
  it('must be of type "tagged"', () => {
    const literal = { type: 'strange', tag: 'date', value: 'textual information' };
    expect(ast.isDateLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'tagged', tag: 'date' };
    expect(ast.isDateLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'tagged', tag: 'date', value: 'what string is not a string?' };
    expect(ast.isDateLiteral(literal)).toBeTruthy();
  });
  it('must have a tag', () => {
    const literal = { type: 'tagged', value: 'some text' };
    expect(ast.isDateLiteral(literal)).toBeFalsy();
  });
  it('must be tagged as "date"', () => {
    const literal = { type: 'tagged', tag: 'this is not a date', value: 'this is not a date' };
    expect(ast.isDateLiteral(literal)).toBeFalsy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'tagged', tag: 'date', value: 'false' };
    if (ast.isDateLiteral(literal)) expect(literal.tag === 'date').toBeTruthy();
    else fail();
  });
});

describe('gram ast tagged geospatial literals', () => {
  it('are a type with value and a tag', () => {
    const literal = { type: 'tagged', tag: 'geo', value: 'textual information' };
    expect(ast.isGeospatialLiteral(literal)).toBeTruthy();
  });
  it('must be of type "tagged"', () => {
    const literal = { type: 'strange', tag: 'geo', value: 'textual information' };
    expect(ast.isGeospatialLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'tagged', tag: 'geo' };
    expect(ast.isGeospatialLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'tagged', tag: 'geo', value: 'what string is not a string?' };
    expect(ast.isGeospatialLiteral(literal)).toBeTruthy();
  });
  it('must have a tag', () => {
    const literal = { type: 'tagged', value: 'some text' };
    expect(ast.isGeospatialLiteral(literal)).toBeFalsy();
  });
  it('must be tagged as "date"', () => {
    const literal = { type: 'tagged', tag: 'this is not a date', value: 'this is not a date' };
    expect(ast.isGeospatialLiteral(literal)).toBeFalsy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'tagged', tag: 'geo', value: 'false' };
    if (ast.isGeospatialLiteral(literal)) expect(literal.tag === 'geo').toBeTruthy();
    else fail();
  });
});

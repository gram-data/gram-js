import {
  isStringLiteral,
  isBooleanLiteral,
  isTaggedLiteral,
  isIntegerLiteral,
  isMeasurementLiteral,
  isDecimalLiteral,
  isHexadecimalLiteral,
  isOctalLiteral,
  isDateLiteral,
  isWellKnownTextLiteral,
} from '../src/';

describe('gram ast boolean literals', () => {
  it('are a type with value', () => {
    const literal = { type: 'boolean', value: 'true' };
    expect(isBooleanLiteral(literal)).toBeTruthy();
  });
  it('must have a type of "boolean"', () => {
    const literal = { type: 'balloon', value: 'false' };
    expect(isBooleanLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'boolean' };
    expect(isBooleanLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'boolean', value: 'banana' };
    expect(isBooleanLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'boolean', value: 'false' };
    if (isBooleanLiteral(literal))
      expect(literal.type === 'boolean').toBeTruthy();
    else fail('Denied by typeguard');
  });
});

describe('gram ast string literals', () => {
  it('are a type with value', () => {
    const literal = { type: 'string', value: 'textual information' };
    expect(isStringLiteral(literal)).toBeTruthy();
  });
  it('must have a type of "string"', () => {
    const literal = { type: 'strange', value: 'textual information' };
    expect(isStringLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'string' };
    expect(isStringLiteral(literal)).toBeFalsy();
  });
  it('are lucky because the value is always a string so it is always valid', () => {
    const literal = { type: 'string', value: 'what string is not a string?' };
    expect(isStringLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'string', value: 'false' };
    if (isStringLiteral(literal))
      expect(literal.type === 'string').toBeTruthy();
    else fail('Denied by typeguard');
  });
});

describe('gram ast tagged literals', () => {
  it('are a type with value and a tag', () => {
    const literal = {
      type: 'tagged',
      tag: 'test',
      value: 'textual information',
    };
    expect(isTaggedLiteral(literal)).toBeTruthy();
  });
  it('must be of type "tagged"', () => {
    const literal = {
      type: 'strange',
      tag: 'test',
      value: 'textual information',
    };
    expect(isTaggedLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'tagged', tag: 'test' };
    expect(isTaggedLiteral(literal)).toBeFalsy();
  });
  it('are lucky because the value is always a string so it is always valid', () => {
    const literal = {
      type: 'tagged',
      tag: 'test',
      value: 'what string is not a string?',
    };
    expect(isTaggedLiteral(literal)).toBeTruthy();
  });
  it('must have a tag', () => {
    const literal = { type: 'tagged', value: 'some text' };
    expect(isTaggedLiteral(literal)).toBeFalsy();
  });
  it('accept any string as a valid tag', () => {
    const literal = {
      type: 'tagged',
      tag:
        'tags should follow something like identifier rules but the ast does not enforce that',
      value: 'what string is not a string?',
    };
    expect(isTaggedLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'tagged', tag: 'test', value: 'false' };
    if (isTaggedLiteral(literal))
      expect(literal.type === 'tagged').toBeTruthy();
    else fail('Denied by typeguard');
  });
});

describe('gram ast integer literals', () => {
  it('are a type with value', () => {
    const literal = { type: 'integer', value: '1123581321345589' };
    expect(isIntegerLiteral(literal)).toBeTruthy();
  });
  it('must have a type of "integer"', () => {
    const literal = { type: 'interval', value: '1123581321345589' };
    expect(isIntegerLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'integer' };
    expect(isIntegerLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'integer', value: 'this is not a number' };
    expect(isIntegerLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'integer', value: 'false' };
    if (isIntegerLiteral(literal))
      expect(literal.type === 'integer').toBeTruthy();
    else fail('Denied by typeguard');
  });
});

describe('gram ast measurement literals', () => {
  it('are a type with value and a unit', () => {
    const literal = {
      type: 'measurement',
      unit: 'test',
      value: 'textual information',
    };
    expect(isMeasurementLiteral(literal)).toBeTruthy();
  });
  it('must be of type "unit"', () => {
    const literal = {
      type: 'measure',
      unit: 'test',
      value: 'textual information',
    };
    expect(isMeasurementLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'measurement', unit: 'test' };
    expect(isMeasurementLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = {
      type: 'measurement',
      unit: 'test',
      value: 'what string is not a string?',
    };
    expect(isMeasurementLiteral(literal)).toBeTruthy();
  });
  it('must have a unit', () => {
    const literal = { type: 'measurement', value: 'some text' };
    expect(isMeasurementLiteral(literal)).toBeFalsy();
  });
  it('accept any string as a valid tag', () => {
    const literal = {
      type: 'measurement',
      unit:
        'units should follow something like identifier rules but the ast does not enforce that',
      value: 'what string is not a string?',
    };
    expect(isMeasurementLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'measurement', unit: 'test', value: 'false' };
    if (isMeasurementLiteral(literal))
      expect(literal.type === 'measurement').toBeTruthy();
    else fail('Denied by typeguard');
  });
});

describe('gram ast decimal literals', () => {
  it('are a type with value', () => {
    const literal = { type: 'decimal', value: '1.123581321345589' };
    expect(isDecimalLiteral(literal)).toBeTruthy();
  });
  it('must have a type of "decimal"', () => {
    const literal = { type: 'decimark', value: '1.123581321345589' };
    expect(isDecimalLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'decimal' };
    expect(isDecimalLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'decimal', value: 'this is not a number' };
    expect(isDecimalLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'decimal', value: 'false' };
    if (isDecimalLiteral(literal))
      expect(literal.type === 'decimal').toBeTruthy();
    else fail('Denied by typeguard');
  });
});

describe('gram ast hexadecimal literals', () => {
  it('are a type with value', () => {
    const literal = { type: 'hexadecimal', value: '0xCAFE1337' };
    expect(isHexadecimalLiteral(literal)).toBeTruthy();
  });
  it('must have a type of "hexadecimal"', () => {
    const literal = { type: 'hexagon', value: '1.0xCAFE1337' };
    expect(isHexadecimalLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'hexadecimal' };
    expect(isHexadecimalLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'hexadecimal', value: 'this is not a number' };
    expect(isHexadecimalLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'hexadecimal', value: 'false' };
    if (isHexadecimalLiteral(literal))
      expect(literal.type === 'hexadecimal').toBeTruthy();
    else fail('Denied by typeguard');
  });
});

describe('gram ast octal literals', () => {
  it('are a type with value', () => {
    const literal = { type: 'octal', value: '01372' };
    expect(isOctalLiteral(literal)).toBeTruthy();
  });
  it('must have a type of "octal"', () => {
    const literal = { type: 'octopus', value: '1.01372' };
    expect(isOctalLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'octal' };
    expect(isOctalLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'octal', value: 'this is not a number' };
    expect(isOctalLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'octal', value: 'false' };
    if (isOctalLiteral(literal)) expect(literal.type === 'octal').toBeTruthy();
    else fail('Denied by typeguard');
  });
});

describe('gram ast tagged date literals', () => {
  it('are a type with value and a tag', () => {
    const literal = {
      type: 'tagged',
      tag: 'date',
      value: 'textual information',
    };
    expect(isDateLiteral(literal)).toBeTruthy();
  });
  it('must be of type "tagged"', () => {
    const literal = {
      type: 'strange',
      tag: 'date',
      value: 'textual information',
    };
    expect(isDateLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'tagged', tag: 'date' };
    expect(isDateLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = {
      type: 'tagged',
      tag: 'date',
      value: 'what string is not a string?',
    };
    expect(isDateLiteral(literal)).toBeTruthy();
  });
  it('must have a tag', () => {
    const literal = { type: 'tagged', value: 'some text' };
    expect(isDateLiteral(literal)).toBeFalsy();
  });
  it('must be tagged as "date"', () => {
    const literal = {
      type: 'tagged',
      tag: 'this is not a date',
      value: 'this is not a date',
    };
    expect(isDateLiteral(literal)).toBeFalsy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'tagged', tag: 'date', value: 'false' };
    if (isDateLiteral(literal)) expect(literal.tag === 'date').toBeTruthy();
    else fail('Denied by typeguard');
  });
});

describe('gram ast tagged WKT geospatial literals', () => {
  it('are a type with value and a tag', () => {
    const literal = {
      type: 'tagged',
      tag: 'wkt',
      value: 'textual information',
    };
    expect(isWellKnownTextLiteral(literal)).toBeTruthy();
  });
  it('must be of type "tagged"', () => {
    const literal = {
      type: 'strange',
      tag: 'wkt',
      value: 'textual information',
    };
    expect(isWellKnownTextLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'tagged', tag: 'wkt' };
    expect(isWellKnownTextLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = {
      type: 'tagged',
      tag: 'wkt',
      value: 'what string is not a string?',
    };
    expect(isWellKnownTextLiteral(literal)).toBeTruthy();
  });
  it('must have a tag', () => {
    const literal = { type: 'tagged', value: 'some text' };
    expect(isWellKnownTextLiteral(literal)).toBeFalsy();
  });
  it('must be tagged as "date"', () => {
    const literal = {
      type: 'tagged',
      tag: 'this is not a date',
      value: 'this is not a date',
    };
    expect(isWellKnownTextLiteral(literal)).toBeFalsy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'tagged', tag: 'wkt', value: 'false' };
    if (isWellKnownTextLiteral(literal))
      expect(literal.tag === 'wkt').toBeTruthy();
    else fail('Denied by typeguard');
  });
});

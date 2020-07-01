import * as gramTypes from '../src/gram-types';

describe('gram unit', () => {
  it('is entirely empty', () => {
    const unit = { type: 'unit'}
    expect(gramTypes.isGramUnit(unit)).toBeTruthy();
    if (gramTypes.isGramUnit(unit)) {
      expect(unit.id).toBeUndefined();
      expect(unit.labels).toBeUndefined();
      expect(unit.record).toBeUndefined();
      expect(unit.children).toBeUndefined();
    }
  });
});

describe('gram nodes', () => {
  it('have identity, labels and a record, but no children', () => {
    const node = { type: 'node'}
    expect(gramTypes.isGramNode(node)).toBeTruthy();
    if (gramTypes.isGramNode(node)) {
      node.id = 'a';
      expect(node.id).toEqual('a');
      node.labels = ["A", "B"]
      expect(node.labels).toEqual(expect.arrayContaining(["A", "B"]));
      node.record = { k:{type:"string", value:"v"}};
      expect(gramTypes.isStringLiteral(node.record.k)).toBeTruthy();
      expect(node.children).toBeUndefined();
    }
  });
});

describe('gram ast boolean literals', () => {
  it('are a type with value', () => {
    const literal = { type: 'boolean', value: 'true' };
    expect(gramTypes.isBooleanLiteral(literal)).toBeTruthy();
  });
  it('must have a type of "boolean"', () => {
    const literal = { type: 'balloon', value: 'false' };
    expect(gramTypes.isBooleanLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'boolean' };
    expect(gramTypes.isBooleanLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'boolean', value: 'banana' };
    expect(gramTypes.isBooleanLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'boolean', value: 'false' };
    if (gramTypes.isBooleanLiteral(literal)) expect(literal.type === 'boolean').toBeTruthy();
    else fail('Denied by typeguard');
  });
});

describe('gram ast string literals', () => {
  it('are a type with value', () => {
    const literal = { type: 'string', value: 'textual information' };
    expect(gramTypes.isStringLiteral(literal)).toBeTruthy();
  });
  it('must have a type of "string"', () => {
    const literal = { type: 'strange', value: 'textual information' };
    expect(gramTypes.isStringLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'string' };
    expect(gramTypes.isStringLiteral(literal)).toBeFalsy();
  });
  it('are lucky because the value is always a string so it is always valid', () => {
    const literal = { type: 'string', value: 'what string is not a string?' };
    expect(gramTypes.isStringLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'string', value: 'false' };
    if (gramTypes.isStringLiteral(literal)) expect(literal.type === 'string').toBeTruthy();
    else fail('Denied by typeguard');
  });
});

describe('gram ast tagged literals', () => {
  it('are a type with value and a tag', () => {
    const literal = { type: 'tagged', tag: 'test', value: 'textual information' };
    expect(gramTypes.isTaggedLiteral(literal)).toBeTruthy();
  });
  it('must be of type "tagged"', () => {
    const literal = { type: 'strange', tag: 'test', value: 'textual information' };
    expect(gramTypes.isTaggedLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'tagged', tag: 'test' };
    expect(gramTypes.isTaggedLiteral(literal)).toBeFalsy();
  });
  it('are lucky because the value is always a string so it is always valid', () => {
    const literal = { type: 'tagged', tag: 'test', value: 'what string is not a string?' };
    expect(gramTypes.isTaggedLiteral(literal)).toBeTruthy();
  });
  it('must have a tag', () => {
    const literal = { type: 'tagged', value: 'some text' };
    expect(gramTypes.isTaggedLiteral(literal)).toBeFalsy();
  });
  it('accept any string as a valid tag', () => {
    const literal = {
      type: 'tagged',
      tag: 'tags should follow something like identifier rules but the ast does not enforce that',
      value: 'what string is not a string?',
    };
    expect(gramTypes.isTaggedLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'tagged', tag: 'test', value: 'false' };
    if (gramTypes.isTaggedLiteral(literal)) expect(literal.type === 'tagged').toBeTruthy();
    else fail('Denied by typeguard');
  });
});

describe('gram ast integer literals', () => {
  it('are a type with value', () => {
    const literal = { type: 'integer', value: '1123581321345589' };
    expect(gramTypes.isIntegerLiteral(literal)).toBeTruthy();
  });
  it('must have a type of "integer"', () => {
    const literal = { type: 'interval', value: '1123581321345589' };
    expect(gramTypes.isIntegerLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'integer' };
    expect(gramTypes.isIntegerLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'integer', value: 'this is not a number' };
    expect(gramTypes.isIntegerLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'integer', value: 'false' };
    if (gramTypes.isIntegerLiteral(literal)) expect(literal.type === 'integer').toBeTruthy();
    else fail("Denied by typeguard");
  });
});

describe('gram ast measurement literals', () => {
  it('are a type with value and a unit', () => {
    const literal = { type: 'measurement', unit: 'test', value: 'textual information' };
    expect(gramTypes.isMeasurementLiteral(literal)).toBeTruthy();
  });
  it('must be of type "unit"', () => {
    const literal = { type: 'measure', unit: 'test', value: 'textual information' };
    expect(gramTypes.isMeasurementLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'measurement', unit: 'test' };
    expect(gramTypes.isMeasurementLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'measurement', unit: 'test', value: 'what string is not a string?' };
    expect(gramTypes.isMeasurementLiteral(literal)).toBeTruthy();
  });
  it('must have a unit', () => {
    const literal = { type: 'measurement', value: 'some text' };
    expect(gramTypes.isMeasurementLiteral(literal)).toBeFalsy();
  });
  it('accept any string as a valid tag', () => {
    const literal = {
      type: 'measurement',
      unit: 'units should follow something like identifier rules but the ast does not enforce that',
      value: 'what string is not a string?',
    };
    expect(gramTypes.isMeasurementLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'measurement', unit: 'test', value: 'false' };
    if (gramTypes.isMeasurementLiteral(literal)) expect(literal.type === 'measurement').toBeTruthy();
    else fail("Denied by typeguard");
  });
});

describe('gram ast decimal literals', () => {
  it('are a type with value', () => {
    const literal = { type: 'decimal', value: '1.123581321345589' };
    expect(gramTypes.isDecimalLiteral(literal)).toBeTruthy();
  });
  it('must have a type of "decimal"', () => {
    const literal = { type: 'decimark', value: '1.123581321345589' };
    expect(gramTypes.isDecimalLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'decimal' };
    expect(gramTypes.isDecimalLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'decimal', value: 'this is not a number' };
    expect(gramTypes.isDecimalLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'decimal', value: 'false' };
    if (gramTypes.isDecimalLiteral(literal)) expect(literal.type === 'decimal').toBeTruthy();
    else fail('Denied by typeguard');
  });
});

describe('gram ast hexadecimal literals', () => {
  it('are a type with value', () => {
    const literal = { type: 'hexadecimal', value: '0xCAFE1337' };
    expect(gramTypes.isHexadecimalLiteral(literal)).toBeTruthy();
  });
  it('must have a type of "hexadecimal"', () => {
    const literal = { type: 'hexagon', value: '1.0xCAFE1337' };
    expect(gramTypes.isHexadecimalLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'hexadecimal' };
    expect(gramTypes.isHexadecimalLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'hexadecimal', value: 'this is not a number' };
    expect(gramTypes.isHexadecimalLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'hexadecimal', value: 'false' };
    if (gramTypes.isHexadecimalLiteral(literal)) expect(literal.type === 'hexadecimal').toBeTruthy();
    else fail('Denied by typeguard');
  });
});

describe('gram ast octal literals', () => {
  it('are a type with value', () => {
    const literal = { type: 'octal', value: '01372' };
    expect(gramTypes.isOctalLiteral(literal)).toBeTruthy();
  });
  it('must have a type of "octal"', () => {
    const literal = { type: 'octopus', value: '1.01372' };
    expect(gramTypes.isOctalLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'octal' };
    expect(gramTypes.isOctalLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'octal', value: 'this is not a number' };
    expect(gramTypes.isOctalLiteral(literal)).toBeTruthy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'octal', value: 'false' };
    if (gramTypes.isOctalLiteral(literal)) expect(literal.type === 'octal').toBeTruthy();
    else fail('Denied by typeguard');
  });
});

describe('gram ast tagged date literals', () => {
  it('are a type with value and a tag', () => {
    const literal = { type: 'tagged', tag: 'date', value: 'textual information' };
    expect(gramTypes.isDateLiteral(literal)).toBeTruthy();
  });
  it('must be of type "tagged"', () => {
    const literal = { type: 'strange', tag: 'date', value: 'textual information' };
    expect(gramTypes.isDateLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'tagged', tag: 'date' };
    expect(gramTypes.isDateLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'tagged', tag: 'date', value: 'what string is not a string?' };
    expect(gramTypes.isDateLiteral(literal)).toBeTruthy();
  });
  it('must have a tag', () => {
    const literal = { type: 'tagged', value: 'some text' };
    expect(gramTypes.isDateLiteral(literal)).toBeFalsy();
  });
  it('must be tagged as "date"', () => {
    const literal = { type: 'tagged', tag: 'this is not a date', value: 'this is not a date' };
    expect(gramTypes.isDateLiteral(literal)).toBeFalsy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'tagged', tag: 'date', value: 'false' };
    if (gramTypes.isDateLiteral(literal)) expect(literal.tag === 'date').toBeTruthy();
    else fail('Denied by typeguard');
  });
});

describe('gram ast tagged geospatial literals', () => {
  it('are a type with value and a tag', () => {
    const literal = { type: 'tagged', tag: 'geo', value: 'textual information' };
    expect(gramTypes.isGeospatialLiteral(literal)).toBeTruthy();
  });
  it('must be of type "tagged"', () => {
    const literal = { type: 'strange', tag: 'geo', value: 'textual information' };
    expect(gramTypes.isGeospatialLiteral(literal)).toBeFalsy();
  });
  it('must have a value', () => {
    const literal = { type: 'tagged', tag: 'geo' };
    expect(gramTypes.isGeospatialLiteral(literal)).toBeFalsy();
  });
  it('do not validate the value', () => {
    const literal = { type: 'tagged', tag: 'geo', value: 'what string is not a string?' };
    expect(gramTypes.isGeospatialLiteral(literal)).toBeTruthy();
  });
  it('must have a tag', () => {
    const literal = { type: 'tagged', value: 'some text' };
    expect(gramTypes.isGeospatialLiteral(literal)).toBeFalsy();
  });
  it('must be tagged as "date"', () => {
    const literal = { type: 'tagged', tag: 'this is not a date', value: 'this is not a date' };
    expect(gramTypes.isGeospatialLiteral(literal)).toBeFalsy();
  });
  it('has a type guard', () => {
    const literal: any = { type: 'tagged', tag: 'geo', value: 'false' };
    if (gramTypes.isGeospatialLiteral(literal)) expect(literal.tag === 'geo').toBeTruthy();
    else fail('Denied by typeguard');
  });
});

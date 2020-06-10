import { builder } from '@gram-data/gram-format';
import { recordToValue } from '../src';

describe('Gram Records to JS objects', () => {
  it('converts string literals to strings', () => {
    const literalValue = 'hello';
    const recordValue = builder.string(literalValue);
    const jsValue = recordToValue(recordValue);
    expect(jsValue).toStrictEqual(literalValue);
  });

  it('converts boolean literal to boolean true', () => {
    const literalValue = true;
    const recordValue = builder.boolean(literalValue);
    const jsValue = recordToValue(recordValue);
    expect(jsValue).toStrictEqual(literalValue);
  });

  it('converts boolean literal to boolean false', () => {
    const literalValue = false;
    const recordValue = builder.boolean(literalValue);
    const jsValue = recordToValue(recordValue);
    expect(jsValue).toStrictEqual(literalValue);
  });

  it('converts integer literals to integer numbers', () => {
    const literalValue = 42;
    const recordValue = builder.integer(literalValue);
    const jsValue = recordToValue(recordValue);
    expect(jsValue).toStrictEqual(literalValue);
  });

  it('converts decimal literals to float numbers', () => {
    const literalValue = 42.345;
    const recordValue = builder.decimal(literalValue);
    const jsValue = recordToValue(recordValue);
    expect(jsValue).toStrictEqual(literalValue);
  });

  it('converts arrays of integer literals to an integer array', () => {
    const literalValues = [1, 2, 3, 4, 5];
    const recordValue = literalValues.map(literalValue =>
      builder.integer(literalValue)
    );
    const jsValue = recordToValue(recordValue);
    expect(jsValue).toHaveLength(literalValues.length);
    expect(jsValue).toEqual(expect.arrayContaining(literalValues));
  });

  it('converts arrays of string literals to an string array', () => {
    const literalValues = ['a', 'b', 'c'];
    const recordValue = literalValues.map(literalValue =>
      builder.string(literalValue)
    );
    const jsValue = recordToValue(recordValue);
    expect(jsValue).toHaveLength(literalValues.length);
    expect(jsValue).toEqual(expect.arrayContaining(literalValues));
  });
});

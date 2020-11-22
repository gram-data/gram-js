import { builder } from '@gram-data/gram-builder';
import { valueOf } from '../src';

describe('Gram records to JS objects', () => {
  it('converts {k:"hello"}', () => {
    const literalValue = 'hello';
    const expectedObject = {
      k: literalValue,
    };
    const propertyMap = {
      k: builder.string(literalValue),
    };
    const record = builder.mapToRecord(propertyMap);
    const jsObject = valueOf(record);
    expect(jsObject).toStrictEqual(expectedObject);
  });

  it('converts {k:"true"}', () => {
    const literalValue = true;
    const expectedObject = {
      k: literalValue,
    };
    const propertyMap = {
      k: builder.boolean(literalValue),
    };
    const record = builder.mapToRecord(propertyMap);
    const jsObject = valueOf(record);
    expect(jsObject).toStrictEqual(expectedObject);
  });

  it('converts {k:42}', () => {
    const literalValue = 42;
    const expectedObject = {
      k: literalValue,
    };
    const propertyMap = {
      k: builder.integer(literalValue),
    };
    const record = builder.mapToRecord(propertyMap);
    const jsObject = valueOf(record);
    expect(jsObject).toStrictEqual(expectedObject);
  });

  it('converts {k:42.345}', () => {
    const literalValue = 42.345;
    const expectedObject = {
      k: literalValue,
    };
    const propertyMap = {
      k: builder.decimal(literalValue),
    };
    const record = builder.mapToRecord(propertyMap);
    const jsObject = valueOf(record);
    expect(jsObject).toStrictEqual(expectedObject);
  });

  it('converts arrays of integer literals to an integer array', () => {
    const literalValues = [1, 2, 3, 4, 5];
    const expectedObject = {
      k: literalValues,
    };
    const propertyMap = {
      k: literalValues.map(builder.integer),
    };
    const record = builder.mapToRecord(propertyMap);
    const jsObject = valueOf(record);
    expect(jsObject).toStrictEqual(expectedObject);
  });

  it('converts arrays of string literals to an string array', () => {
    const literalValues = ['a', 'b', 'c'];
    const expectedObject = {
      k: literalValues,
    };
    const propertyMap = {
      k: literalValues.map(builder.string),
    };
    const record = builder.mapToRecord(propertyMap);
    const jsObject = valueOf(record);
    expect(jsObject).toStrictEqual(expectedObject);
  });

  it('converts nested records of the form {k:{k2:1}}', () => {
    const literalValue = 1;
    const expectedObject = {
      k: {
        k2: 1,
      },
    };
    const record = [
      builder.property('k', [
        builder.property('k2', builder.integer(literalValue)),
      ]),
    ];
    const jsObject = valueOf(record);
    expect(jsObject).toStrictEqual(expectedObject);
  });
});

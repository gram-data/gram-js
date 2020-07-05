import {
  alphabets,
  isValidIdentifier,
  integerToBase,
  integerLiteralToBaseID,
  integerToBaseID,
} from '../src/gram-identity';

describe('base2 conversions', () => {
  it.each`
    source | result
    ${2}   | ${'_10'}
    ${4}   | ${'_100'}
    ${8}   | ${'_1000'}
    ${16}  | ${'_10000'}
    ${32}  | ${'_100000'}
    ${64}  | ${'_1000000'}
    ${128} | ${'_10000000'}
    ${127} | ${'_1111111'}
    ${117} | ${'_1110101'}
    ${92}  | ${'_1011100'}
    ${55}  | ${'_110111'}
    ${23}  | ${'_10111'}
  `('should convert integer $source to $result', ({ source, result }) => {
    expect(integerToBaseID(alphabets.base2, source)).toEqual(result);
  });
  it('should convert MAX_SAFE_INTEGER', () => {
    expect(integerToBaseID(alphabets.base2, Number.MAX_SAFE_INTEGER)).toEqual(
      '_11111111111111111111111111111111111111111111111111111'
    );
  });
  it('should fail to convert integers larger than MAX_SAFE_INTEGER', () => {
    expect(() => {
      integerToBase(alphabets.base2, Number.MAX_SAFE_INTEGER + 1);
    }).toThrow();
  });
  it.each`
    source   | result
    ${'2'}   | ${'_10'}
    ${'4'}   | ${'_100'}
    ${'8'}   | ${'_1000'}
    ${'16'}  | ${'_10000'}
    ${'32'}  | ${'_100000'}
    ${'64'}  | ${'_1000000'}
    ${'128'} | ${'_10000000'}
    ${'127'} | ${'_1111111'}
    ${'117'} | ${'_1110101'}
    ${'92'}  | ${'_1011100'}
    ${'55'}  | ${'_110111'}
    ${'23'}  | ${'_10111'}
  `('should convert integer literal $source to $result', ({ source, result }) => {
    expect(integerLiteralToBaseID(alphabets.base2, source)).toEqual(result);
  });
  it('should convert MAX_SAFE_INTEGER literal 9007199254740991', () => {
    expect(integerLiteralToBaseID(alphabets.base2, '9007199254740991')).toEqual(
      '_11111111111111111111111111111111111111111111111111111'
    );
  });
  it.each`
    source                    | result
    ${'9007199254740992'}     | ${'_100000000000000000000000000000000000000000000000000000'}
    ${'189007199254740992'}   | ${'_1010011111011111010000101111011011100100100000000000000000'}
    ${'32189007199254740992'} | ${'_11011111010110110010100111000000011001000000100100000000000000000'}
  `('should convert integer literals larger than MAX_SAFE_INTEGER', ({ source, result }) => {
    expect(integerLiteralToBaseID(alphabets.base2, source)).toEqual(result);
  });
});

describe('base8 conversions', () => {
  it.each`
    source | result
    ${2}   | ${'_2'}
    ${4}   | ${'_4'}
    ${8}   | ${'_10'}
    ${16}  | ${'_20'}
    ${32}  | ${'_40'}
    ${64}  | ${'_100'}
    ${128} | ${'_200'}
    ${127} | ${'_177'}
    ${117} | ${'_165'}
    ${92}  | ${'_134'}
    ${55}  | ${'_67'}
    ${23}  | ${'_27'}
  `('should convert integer $source to $result', ({ source, result }) => {
    expect(integerToBaseID(alphabets.base8, source)).toEqual(result);
  });
  it('should convert MAX_SAFE_INTEGER', () => {
    expect(integerToBaseID(alphabets.base8, Number.MAX_SAFE_INTEGER)).toEqual('_377777777777777777');
  });
  it('should fail to convert integers larger than MAX_SAFE_INTEGER', () => {
    expect(() => {
      integerToBase(alphabets.base8, Number.MAX_SAFE_INTEGER + 1);
    }).toThrow();
  });
  it.each`
    source   | result
    ${'2'}   | ${'_2'}
    ${'4'}   | ${'_4'}
    ${'8'}   | ${'_10'}
    ${'16'}  | ${'_20'}
    ${'32'}  | ${'_40'}
    ${'64'}  | ${'_100'}
    ${'128'} | ${'_200'}
    ${'127'} | ${'_177'}
    ${'117'} | ${'_165'}
    ${'92'}  | ${'_134'}
    ${'55'}  | ${'_67'}
    ${'23'}  | ${'_27'}
  `('should convert integer literal $source to $result', ({ source, result }) => {
    expect(integerLiteralToBaseID(alphabets.base8, source)).toEqual(result);
  });
  it('should convert MAX_SAFE_INTEGER literal 9007199254740991', () => {
    expect(integerLiteralToBaseID(alphabets.base8, '9007199254740991')).toEqual('_377777777777777777');
  });
  it.each`
    source                    | result
    ${'9007199254740992'}     | ${'_400000000000000000'}
    ${'189007199254740992'}   | ${'_12373720573344400000'}
    ${'32189007199254740992'} | ${'_3372662470031004400000'}
  `('should convert integer literals larger than MAX_SAFE_INTEGER', ({ source, result }) => {
    expect(integerLiteralToBaseID(alphabets.base8, source)).toEqual(result);
  });
});

describe('base2 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base2, sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('base8 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base8, sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('base10 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base10, sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('base11 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base11, sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('base16 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base16, sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('base32 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base32, sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('zBase32 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.zBase32, sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('crock32 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.crock32, sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('base32Hex identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base32Hex, sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('base36 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base36, sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('base58 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base58, sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('base62 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base62, sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });

  it.each`
    base10 | base62
    ${0}   | ${'_0'}
    ${1}   | ${'_1'}
    ${2}   | ${'_2'}
    ${3}   | ${'_3'}
    ${4}   | ${'_4'}
    ${5}   | ${'_5'}
    ${6}   | ${'_6'}
    ${7}   | ${'_7'}
    ${8}   | ${'_8'}
    ${9}   | ${'_9'}
    ${10}  | ${'_a'}
  `('$base10 in base-10 becomes $base62 in base-62', ({ base10, base62 }) => {
    expect(integerToBaseID(alphabets.base62, base10)).toBe(base62);
  });
});

describe('unusual but valid identifiers', () => {
  it.each`
    identifier
    ${'@akollegger'}
    ${'@a'}
    ${'_0n96pdf6@E'}
    ${'Im0_pWk0g4@@'}
    ${'42'}
    ${'12px'}
  `('$identifier is a valid identifier', ({ identifier }) => {
    expect(isValidIdentifier(identifier) ? identifier : false).toBeTruthy();
  });
});

describe('illegal identifiers', () => {
  it.each`
    identifier
    ${'abk@neo4j.com'}
    ${'count(n)'}
  `('$identifier is not a valid identifier', ({ identifier }) => {
    expect(isValidIdentifier(identifier) ? identifier : false).toBeFalsy();
  });
});

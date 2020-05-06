import { alphabets, isValidIdentifier, integerToBase, integerLiteralToBase, integerToBaseID } from '../src/gram-identity';

describe('base2 conversions', () => {
  it.each`
    source | result       
    ${2}   |       ${'10'} 
    ${4}   |      ${'100'} 
    ${8}   |     ${'1000'} 
    ${16}  |    ${'10000'} 
    ${32}  |   ${'100000'} 
    ${64}  |  ${'1000000'} 
    ${128} | ${'10000000'} 
    ${127} |  ${'1111111'} 
    ${117} |  ${'1110101'} 
    ${92}  |  ${'1011100'} 
    ${55}  |   ${'110111'} 
    ${23}  |    ${'10111'} 
  `('should convert integer $source to $result',({source, result}) => {
    expect(integerToBase(alphabets.base2, source)).toEqual(result);
  });
  it('should convert MAX_SAFE_INTEGER', () => {
    expect(integerToBase(alphabets.base2, Number.MAX_SAFE_INTEGER)).toEqual('11111111111111111111111111111111111111111111111111111');
  });
  it('should fail to convert integers larger than MAX_SAFE_INTEGER', () => {
    expect(() => {integerToBase(alphabets.base2, Number.MAX_SAFE_INTEGER + 1)}).toThrow();
  });
  it.each`
    source   | result        
    ${'2'}   |       ${'10'} 
    ${'4'}   |      ${'100'} 
    ${'8'}   |     ${'1000'} 
    ${'16'}  |    ${'10000'} 
    ${'32'}  |   ${'100000'} 
    ${'64'}  |  ${'1000000'} 
    ${'128'} | ${'10000000'} 
    ${'127'} |  ${'1111111'} 
    ${'117'} |  ${'1110101'} 
    ${'92'}  |  ${'1011100'} 
    ${'55'}  |   ${'110111'} 
    ${'23'}  |    ${'10111'}
  `('should convert integer literal $source to $result',({source, result}) => {
    expect(integerLiteralToBase(alphabets.base2, source)).toEqual(result);
  });
  it('should convert MAX_SAFE_INTEGER literal 9007199254740991', () => {
    expect(integerLiteralToBase(alphabets.base2, '9007199254740991')).toEqual('11111111111111111111111111111111111111111111111111111');
  });
  it.each`
    source                    | result        
    ${'9007199254740992'}     | ${'100000000000000000000000000000000000000000000000000000'} 
    ${'189007199254740992'}   | ${'1010011111011111010000101111011011100100100000000000000000'} 
    ${'32189007199254740992'} | ${'11011111010110110010100111000000011001000000100100000000000000000'} 
  `('should convert integer literals larger than MAX_SAFE_INTEGER', ({source, result}) => {
    expect(integerLiteralToBase(alphabets.base2, source)).toEqual(result);
  });
});

describe('base8 conversions', () => {
  it.each`
    source | result       
    ${2}   |   ${'2'} 
    ${4}   |   ${'4'} 
    ${8}   |  ${'10'} 
    ${16}  |  ${'20'} 
    ${32}  |  ${'40'} 
    ${64}  | ${'100'} 
    ${128} | ${'200'} 
    ${127} | ${'177'} 
    ${117} | ${'165'} 
    ${92}  | ${'134'} 
    ${55}  |  ${'67'} 
    ${23}  |  ${'27'} 
  `('should convert integer $source to $result',({source, result}) => {
    expect(integerToBase(alphabets.base8, source)).toEqual(result);
  });
  it('should convert MAX_SAFE_INTEGER', () => {
    expect(integerToBase(alphabets.base8, Number.MAX_SAFE_INTEGER)).toEqual('377777777777777777');
  });
  it('should fail to convert integers larger than MAX_SAFE_INTEGER', () => {
    expect(() => {integerToBase(alphabets.base8, Number.MAX_SAFE_INTEGER + 1)}).toThrow();
  });
  it.each`
    source   | result        
    ${'2'}   |   ${'2'} 
    ${'4'}   |   ${'4'} 
    ${'8'}   |  ${'10'} 
    ${'16'}  |  ${'20'} 
    ${'32'}  |  ${'40'} 
    ${'64'}  | ${'100'} 
    ${'128'} | ${'200'} 
    ${'127'} | ${'177'} 
    ${'117'} | ${'165'} 
    ${'92'}  | ${'134'} 
    ${'55'}  |  ${'67'} 
    ${'23'}  |  ${'27'}
  `('should convert integer literal $source to $result',({source, result}) => {
    expect(integerLiteralToBase(alphabets.base8, source)).toEqual(result);
  });
  it('should convert MAX_SAFE_INTEGER literal 9007199254740991', () => {
    expect(integerLiteralToBase(alphabets.base8, '9007199254740991')).toEqual('377777777777777777');
  });
  it.each`
    source                    | result        
    ${'9007199254740992'}     | ${'400000000000000000'} 
    ${'189007199254740992'}   | ${'12373720573344400000'} 
    ${'32189007199254740992'} | ${'3372662470031004400000'} 
  `('should convert integer literals larger than MAX_SAFE_INTEGER', ({source, result}) => {
    expect(integerLiteralToBase(alphabets.base8, source)).toEqual(result);
  });
});

describe('base2 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base2,sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('base8 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base8,sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('base10 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base10,sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('base11 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base11,sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('base16 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base16,sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('base32 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base32,sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('zBase32 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.zBase32,sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('crock32 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.crock32,sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('base32Hex identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base32Hex,sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('base36 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    console.log(Number.MAX_SAFE_INTEGER, 'crock32', integerToBase(alphabets.crock32, Number.MAX_SAFE_INTEGER));
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base36,sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('base58 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base58,sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('base62 identifiers', () => {
  it('are valid', () => {
    let sum = 0;
    for (let x = 0, y = 1; sum < Number.MAX_SAFE_INTEGER; x = y, y = sum, sum = x + y) {
      const identifier = integerToBaseID(alphabets.base62,sum);
      expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  });
});

describe('interesting identifiers', () => {
  it.each`
    identifier 
    ${'abk@neo4j.com'}
    ${'@akollegger'}
    ${'@a'}
  `('$identifier is a valid identifier',({identifier}) => {
    expect(isValidIdentifier(identifier) ? false : identifier).toBeFalsy();
    }
  )
});
import { tokens } from '../src';

describe('alphanumeric identifiers without backtick delimiters', () => {
  it('may begin with a letter', () => {
    const identifier = 'aye';
    expect(tokens.RE.identifier.test(identifier)).toBeTruthy();
  });
  it('may not begin with a number', () => {
    let identifier = '123';
    expect(tokens.RE.identifier.test(identifier)).toBeFalsy();
    identifier = '1280px';
    expect(tokens.RE.identifier.exec(identifier)).not.toContain(identifier);
  });
  it('can include "_" special character', () => {
    const identifier = 'abk_here_com';
    expect(tokens.RE.identifier.exec(identifier)).toContain(identifier);
  });
});

describe('boolean literals', () => {
  it('may be "true"', () => {
    const literal = 'true';
    expect(tokens.RE.boolean.test(literal)).toBeTruthy();
  });
  it('may be "false"', () => {
    const literal = 'false';
    expect(tokens.RE.boolean.test(literal)).toBeTruthy();
  });
  it('may be "TRUE"', () => {
    const literal = 'TRUE';
    expect(tokens.RE.boolean.test(literal)).toBeTruthy();
  });
  it('may be "FALSE"', () => {
    const literal = 'FALSE';
    expect(tokens.RE.boolean.test(literal)).toBeTruthy();
  });

  it('may not be "BLUE"', () => {
    const literal = 'BLUE';
    expect(tokens.RE.boolean.test(literal)).toBeFalsy();
  });
});

describe('hexadecimal literals', () => {
  it('must start with "0x"', () => {
    const literal = '0xFACE';
    expect(tokens.RE.hexadecimal.test(literal)).toBeTruthy();
  });
  it('may not include alphabetic characters higher than "F"', () => {
    const literal = '0xAGE8';
    expect(tokens.RE.hexadecimal.test(literal)).toBeFalsy();
  });
});

describe('octal literals', () => {
  it('must start with "0"', () => {
    const literal = '0123';
    expect(tokens.RE.octal.test(literal)).toBeTruthy();
  });
  it('may not include digit characters higher than "7"', () => {
    const literal = '0812';
    expect(tokens.RE.octal.test(literal)).toBeFalsy();
  });
});

describe('double-quoted string literals', () => {
  it('must be delimited by double quotes', () => {
    const literal = '"text goes here"';
    expect(tokens.RE.doubleQuotedString.test(literal)).toBeTruthy();
  });
  it('must begin with double quote', () => {
    const literal = 'text goes here"';
    expect(tokens.RE.doubleQuotedString.test(literal)).toBeFalsy();
  });
  it('must end with double quote', () => {
    const literal = '"text goes here';
    expect(tokens.RE.doubleQuotedString.test(literal)).toBeFalsy();
  });
});

describe('single-quoted string literals', () => {
  it('must be delimited by single quotes', () => {
    const literal = "'text goes here'";
    expect(tokens.RE.singleQuotedString.test(literal)).toBeTruthy();
  });
  it('must begin with single quote', () => {
    const literal = "text goes here'";
    expect(tokens.RE.singleQuotedString.test(literal)).toBeFalsy();
  });
  it('must end with single quote', () => {
    const literal = "'text goes here";
    expect(tokens.RE.singleQuotedString.test(literal)).toBeFalsy();
  });
});

describe('backtick-quoted string literals', () => {
  it('must be delimited by backticks', () => {
    const literal = '`text goes here`';
    expect(tokens.RE.tickedString.test(literal)).toBeTruthy();
  });
  it('must begin with backticks', () => {
    const literal = 'text goes here`';
    expect(tokens.RE.tickedString.test(literal)).toBeFalsy();
  });
  it('must end with backticks', () => {
    const literal = '`text goes here';
    expect(tokens.RE.tickedString.test(literal)).toBeFalsy();
  });
});

describe('tagged literals', () => {
  it('must be prefixed with an identifier-compatible tag, followed by a backtick delimited string', () => {
    const literal = 'example`text goes here`';
    expect(tokens.RE.taggedString.test(literal)).toBeTruthy();
  });
});

describe('integer literals', () => {
  it('must be a whole number like "123"', () => {
    const literal = '123';
    expect(tokens.RE.integer.test(literal)).toBeTruthy();
    expect(literal.match(tokens.RE.integer)).toContain('123');
  });
  it('will not include a decimal place', () => {
    const literal = '123.45';
    expect(literal.match(tokens.RE.integer)).toContain('123');
  });
  it('may include an exponent', () => {
    const literal = '123e-10';
    expect(literal.match(tokens.RE.integer)).toContain('123e-10');
  });
});

describe('unit literals', () => {
  it('include a trailing identifier-compatible unit like "cm" or "px"', () => {
    const literal = '1240px';
    expect(tokens.RE.measurement.test(literal)).toBeTruthy();
    expect(literal.match(tokens.RE.measurement)).toContain('1240px');
  });
});

describe('decimal literals', () => {
  it('must include a whole and fractional part separated by a decimal point like "123.456"', () => {
    const literal = '123.456';
    expect(tokens.RE.decimal.test(literal)).toBeTruthy();
    expect(literal.match(tokens.RE.decimal)).toContain('123.456');
  });
  it('may include an exponent', () => {
    const literal = '123.456e-10';
    expect(literal.match(tokens.RE.decimal)).toContain('123.456e-10');
  });
});

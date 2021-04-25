import { tokens } from '../../src/ast';

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
    expect(
      tokens.isValidIdentifier(identifier) ? identifier : false
    ).toBeTruthy();
  });
});

describe('illegal identifiers', () => {
  it.each`
    identifier
    ${'abk@neo4j.com'}
    ${'count(n)'}
  `('$identifier is not a valid identifier', ({ identifier }) => {
    expect(
      tokens.isValidIdentifier(identifier) ? identifier : false
    ).toBeFalsy();
  });

  it('rejects undefined strings', () => {
    expect(tokens.isValidIdentifier(undefined)).toBeFalsy();
  });
});

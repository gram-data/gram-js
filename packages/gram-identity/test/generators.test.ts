
import { alphabets, counterIDGenerator, nanoidGenerator } from "../src";

const {
  performance
} = require('perf_hooks');

const ITERATIONS = 1000;

describe("identity generators", () => {
  const generators = [
    {name:'counter', generator: counterIDGenerator()},
    {name:'nanoid default', generator: nanoidGenerator()},
    {name:'nanoid crock32', generator: nanoidGenerator(alphabets.crock32)},
    {name:'nanoid base58', generator: nanoidGenerator(alphabets.base58)},
    {name:'nanoid base62', generator: nanoidGenerator(alphabets.base62)},
  ]
  it(`over ${ITERATIONS} iterations`, () => {
    generators.forEach( ({name, generator}) => {
      const ids:Set<string> = new Set<string>();
      const fromTo:string[] = [];
      const t0 = performance.now();
      for (let i=0;i<=ITERATIONS; i++) {
        const id = generator.generate();
        expect(ids.has(id)).toBeFalsy();
        ids.add(id);
        if (i===0 || i === ITERATIONS) fromTo.push(id);
      }
      const t1 = performance.now();      
      console.log(`"${name}" generated from ${fromTo.join()} took ${t1-t0} milliseconds`)
    })
  });
  it('does not yet support unicode alphabets', () => {
    expect(true).toBeTruthy();
  })

});
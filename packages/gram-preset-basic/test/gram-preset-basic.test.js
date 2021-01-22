const unified = require("unified");
const gramParserPlugin = require("@gram-data/gram-parse").gramParserPlugin;

const gramPresetBasic = require("..");

const visit = require("unist-util-visit");

const inspect = require("unist-util-inspect");

const mockCompiler = () => {
  return "mock compiler for testing";
};

const testCompilerPlugin = function () {
  this.Compiler = mockCompiler;
};

const expectAllPathlikeElementsToHaveId = () => {
  return (tree) => {
    // console.log(inspect(tree));
    visit(tree, "path", (element) => {
      if (element) {
        expect(element.id).toBeDefined();
      }
    });
  };
};

const gramProcessor = unified()
  .use(gramParserPlugin)
  .use(gramPresetBasic)
  .use(testCompilerPlugin)
  .use(expectAllPathlikeElementsToHaveId);

describe("gram-preset-basic", () => {
  it('adds identity to a plain node "()" ', () => {
    const src = `()`;
    const processed = gramProcessor.process(src);
    expect(processed).toBeDefined();
  });
  it('adds identity to all plain nodes "() () ()" ', () => {
    const src = `() () ()`;
    const processed = gramProcessor.process(src);
    expect(processed).toBeDefined();
  });
  it('adds identity to connected nodes and edges"()-->()<--()" ', () => {
    const src = `()-->()<--()`;
    const processed = gramProcessor.process(src);
    expect(processed).toBeDefined();
  });
  it('adds identity to path compositions "[ {composed:true} (a),(b)]" ', () => {
    const src = `[ {composed:true} (a),(b)]`;
    const processed = gramProcessor.process(src);
    expect(processed).toBeDefined();
  });
});

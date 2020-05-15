#!/usr/bin/env node

const program = require('commander');
const fs = require("fs");
const inspect = require('unist-util-inspect')
const chalk = require("chalk");

const gram    = require('../dist').default;

program
  .name("gram-lint")
  .usage("[global options] input")
  .version('0.0.1')
  .option('-d, --debug', 'show parse stacks in error report')
  .option('-p, --profile', 'show profile with totals of each element')
  .option('-f, --format <type>', 'format ast as [plain|object|json|pretty]', 'plain')
  .option('-t, --transform', 'apply a post-process transform to the ast', '');

program.parse(process.argv);

const parser = gram.makeParser();
let gramSource = "";

if (program.args.length > 0) {
  gramSource = program.args[0];
} else {
  gramSource = fs.readFileSync(0, "utf-8");
}
try {
  let parsed = parser.feed(gramSource);
  let result = parsed.results[0];


  if (result === undefined) {
    console.error(`${chalk.red("[Error]")} Incomplete parse.`);
    process.exit(1)
  }
  // apply post-parse transforms
  if (program.transform) {
    result = gram.transform.reidentify(result, gram.identity.optionalPropertyValueFromNode('name'));
  }
  if (program.format === 'object') {
    console.dir(result, {depth:Infinity, colors:true, breakLength:120});
  } else if (program.format === 'json') {
    console.log(JSON.stringify(result));
  } else if (program.format === 'pretty') {
    console.log(gram.stringify(result));
  } else {
    console.log(inspect(result));
  }
  if (program.profile) {
    console.log("profile:")
    console.dir(gram.profile(result))
  }
} catch (parseError) {
  if (program.debug) {
    console.log(parseError.message);
  } else {
    console.log(gram.reporter.reportError(parser, parseError));
  }
  process.exit(1);
}
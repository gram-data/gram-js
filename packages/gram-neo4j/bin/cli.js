#!/usr/bin/env node

const program = require('commander');
const fs = require("fs");
const inspect = require('unist-util-inspect')
const chalk = require("chalk");

const gram    = require('@gram-data/gram-format').default;

const {fetch, boltRecordToAstPath}  = require('../dist');
const package = require('../package.json');
const {map,tap} = require('rxjs/operators');

program
  .name("gram-neo4j")
  .usage("[global options] input")
  .version(package.version)
  .option('-d, --debug', 'reveal internal details about processing')
  .option('-e, --export <cypher>', 'export result of Cypher query as gram')

program.parse(process.argv);

fetch('neo4j://localhost:7687/neo4j', program.export)
  .then( records => 
    records
    .pipe(
      tap(record => program.debug ? console.log(JSON.stringify(record)) : null),
      map(boltRecordToAstPath)
    ).subscribe({
    next: ast => console.log(gram.stringify(ast)),
    complete: () => { 
      console.log(`${chalk.green("[OK]")}.`)
      process.exit(0); 
    },
    error: reason => console.error(`${chalk.red("[Error]")} ${reason}`)
  })
, reason => console.error(`${chalk.red("[Error]")} ${reason}`)
);

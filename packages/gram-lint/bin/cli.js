#!/usr/bin/env node
'use strict'

var start = require('unified-args')
var processor = require('../dist')
var cli = require('../package.json')

var name = 'gram';

start({
  processor: processor,
  name: name,
  description: cli.description,
  version: [
    cli.name + ': ' + cli.version
  ].join(', '),
  pluginPrefix: name,
  presetPrefix: name + '-preset',
  packageField: name + 'Config',
  rcName: '.' + name + 'rc',
  ignoreName: '.' + name + 'ignore',
  extensions: ['gram']
})
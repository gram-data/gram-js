import { After, Before, Given, When, Then } from "cucumber";
import { expect } from "chai";
const find = require('unist-util-find')

import gram from '../../src';

Before(function() {
  this.parser = gram.parser()
})

After(function() {
  this.parser.finish();
});

Given('a gram written as {string}', function (src) {
  this.parser.feed(src);
  this.ast = this.parser.results[0];
  this.profile = gram.profile(this.ast);
});

Given('a gram written as', function (src) {
  this.parser.feed(src);
  this.ast = this.parser.results[0];
  this.profile = gram.profile(this.ast);
});

When('the first node is examined', function () {
  this.element = find(this.ast, {type:'node'});
});

Then('the stream should contain {int} path(s)', function (pathCount) {
  expect(this.profile.path.count).to.equal(pathCount);
});

Then('the path(s) should contain {int} node(s)', function (nodeCount) {
  expect(this.profile.node.count).to.equal(nodeCount);
});

Then('the nodes should have {int} identifier(s)', function (identifierCount) {
  expect(this.profile.node.identifiers.size).to.equal(identifierCount);
});

Then('the nodes should have {int} label(s)', function (labelCount) {
  expect(this.profile.node.labels.size).to.equal(labelCount);
});

Then('the node should have a property named {string} of type {string}', function (propertyName, propertyType) {
  expect(this.profile.properties[propertyName]).to.equal(propertyType);
});

Then('the path(s) should contain {int} relationship(s)', function (relationshipCount) {
  expect(this.profile.relationship.count).to.equal(relationshipCount);
});

Then('the relationships should have {int} identifier(s)', function (identifierCount) {
  expect(this.profile.relationship.identifiers.size).to.equal(identifierCount);
});

Then('the relationships should have {int} label(s)', function (labelCount) {
  expect(this.profile.relationship.labels.size).to.equal(labelCount);
});

Then('the relationship should have a property named {string} of type {string}', function (propertyName, propertyType) {
  expect(this.profile.properties[propertyName]).to.equal(propertyType);
});

Then('property {string} is tagged as a {string}', function (propertyName, expectedTag) {
  expect(this.element.record[propertyName].tag).to.equal(expectedTag);
});

Then('property {string} has the value {string}', function (propertyName, expectedValue) {
  expect(this.element.record[propertyName].value).to.equal(expectedValue);
});

Then('property {string} has unit {string}', function (propertyName, expectedUnit) {
  expect(this.element.record[propertyName].unit).to.equal(expectedUnit);
});
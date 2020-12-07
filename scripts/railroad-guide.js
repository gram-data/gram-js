const fs = require('fs')
const cheerio = require('cheerio');
const fromHtmlPath = './packages/gram-parse/railroad.html';
const toGuidePath = './docs/_guides/railroad.html';

let html = fs.readFileSync(fromHtmlPath, 'utf8');

const document = cheerio.load(html);
const body = document('body');

const header = `---
name: railroad
---

`;

fs.writeFileSync(toGuidePath, header);
fs.appendFileSync(toGuidePath, body.html());


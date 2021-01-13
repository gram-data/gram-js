const jetpack = require('fs-jetpack');
const path = require('path');

jetpack.find('docs', {matching: 'api/**/*.md'}).forEach( file => {
  const header = `---
title: ${path.basename(file, '.md')}
layout: api
---

`;

  console.log(file);
  const content = jetpack.read(file);
  jetpack.write(file, header);
  jetpack.append(file, content);
})

// jetpack.rename('docs/api/README.md', 'index.md');
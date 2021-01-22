define(function (require) {
  var gram = require('./gram.umd.development');
  console.log("Use require'd gram", gram);
  var src = document.getElementById('src').textContent;
  var ast = gram.parse(src);
  document.getElementById('ast').textContent = JSON.stringify(ast, null, 2);
});

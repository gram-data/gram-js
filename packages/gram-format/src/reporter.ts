const buildStateStacks = (state: any, visited: any) => {
  if (visited.indexOf(state) !== -1) {
    // Found cycle, return empty array (meaning no stacks)
    // to eliminate this path from the results, because
    // we don't know how to display it meaningfully
    return [];
  }
  if (state.wantedBy.length === 0) {
    return [[state]];
  }

  return state.wantedBy.reduce(function(stacks: any[], prevState: any) {
    return stacks.concat(
      buildStateStacks(prevState, [state].concat(visited)).map(function(stack: any) {
        return [state].concat(stack);
      })
    );
  }, []);
};

function reportError(this: any, parser: any, parseError: any) {
  const token = parseError.token;

  if (token === undefined) {
    return parseError.message;
  }

  var that = this;

  var lines = [];
  var tokenDisplay =
    (token.type ? token.type + ' token: ' : '') + JSON.stringify(token.value !== undefined ? token.value : token);
  lines.push(parser.lexer.formatError(token, 'Syntax error'));
  // lines.push(this.formatError(parser.lexer, token, 'Syntax error'));
  lines.push('Unexpected ' + tokenDisplay + '. Instead, I was expecting to see one of the following:\n');
  var lastColumnIndex = parser.table.length - 2;
  var lastColumn = parser.table[lastColumnIndex];
  var expectantStates = lastColumn.states.filter(function(state: any) {
    var nextSymbol = state.rule.symbols[state.dot];
    return nextSymbol && typeof nextSymbol !== 'string';
  });

  // Display a "state stack" for each expectant state
  // - which shows you how this state came to be, step by step.
  // If there is more than one derivation, we only display the first one.
  var stateStacks = expectantStates.map(function(state: any) {
    var stacks = buildStateStacks(state, []);
    return stacks[0];
  }, that);
  // Display each state that is expecting a terminal symbol next.
  stateStacks.forEach(function(stateStack: any) {
    var state = stateStack[0];
    var nextSymbol = state.rule.symbols[state.dot];
    var symbolDisplay = parser.getSymbolDisplay(nextSymbol);
    lines.push('A ' + symbolDisplay);
  }, that);

  lines.push('');
  return lines.join('\n');
}

export default {
  reportError,
};

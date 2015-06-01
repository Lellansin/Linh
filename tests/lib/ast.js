var util = require('util');
var Token = require('../../lib/token');
var Context = require('../../lib/context');
var AST = require('../../lib/ast');

var root = {};
var context = new Context(root);
var AstTree = new AST(context);

// var code = 'if let 10 gt 5, echo "10 > 5", else echo "10 < 5".';
var code = 'echo let 12 12 sum 12 12.';
var values = Token(code);
// console.log('values', values);

var list = AstTree.parse(values);
console.log('list', util.inspect(list, false, 15));

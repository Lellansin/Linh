var util = require('util');
var Token = require('./token');
var Context = require('./context');
var AST = require('./ast');

var root = {};
var context = new Context(root);
var AstTree = new AST(context);

module.exports = function(code) {
	var values = Token(code);
	// console.log('values', values);

	var list = AstTree.parse(values);
	// console.log('list', util.inspect(list, false, 15));

	var result;
	for (var i = 0; i < list.length; i++) {
		var expression = list[i];
		// console.log('expression', util.inspect(expression, false, 15));
		result = expression.run();
	}

	return result;
};

var util = require('util');
var scanf = require('scanf');
var Token = require('./token');
var Funcs = require('./func');
var AST = require('./ast');

var funcs = new Funcs();
var AstTree = new AST(funcs);

do {

	// process.stdout.write('> ');
	// var code = scanf('%S');
	// var code = 'add 5 sub 12 5';
	// var code = 'sub 12 add 5 6';
	var code = 'if true echo 123'

	if (code == 'exit') {
		console.log('bye~');
		process.exit();
	}

	try {
		var values = Token(code);
		var ast = AstTree.parse(values);
		console.log('ast', util.inspect(ast, true, 8));
		var result = ast.run(funcs);
		console.log(result);
	} catch (err) {
		console.error('error:', err.message);
	}

} while (false);
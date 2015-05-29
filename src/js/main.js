var util = require('util');
var scanf = require('scanf');
var Token = require('./token');
var Context = require('./context');
var AST = require('./ast');

var root = {};
var context = new Context(root);
var AstTree = new AST(context);

do {

	process.stdout.write('> ');
	var code = scanf('%S');
	// var code = 'add 5 sub 12 5';
	// var code = 'sub 12 add 5 6';
	// var code = 'if true echo 123'
	// var code = 'if gt 5 12. echo 123'
	// var code = 'if gt 3 2. echo "hello world,3 > 2" "test"';

	if (code == 'exit') {
		console.log('bye~');
		process.exit();
	}

	try {
		var values = Token(code);
		var expression = AstTree.parse(values);
		// console.log('ast', util.inspect(ast, true, 8));
		var result = expression.run();
		console.log(result);
	} catch (err) {
		throw err
		console.error('error:', err.message);
	}

} while (true);

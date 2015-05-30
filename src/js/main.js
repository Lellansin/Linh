var util = require('util');
var scanf = require('scanf');
var printc = require('./utils/printc');
var Token = require('./token');
var Context = require('./context');
var AST = require('./ast');

var root = {};
var context = new Context(root);
var AstTree = new AST(context);
var flag = true;

var line = function(code) {
	var values = Token(code);
	// console.log('values', values);
	var expression = AstTree.parse(values);
	// console.log('expression', expression);
	var result = expression.run();
	printc(result);
};

do {

	process.stdout.write('> ');
	var code = scanf('%S');
	// var code = 'add 5 sub 12 5';
	// var code = 'sub 12 add 5 6';
	// var code = 'if true echo 123'
	// var code = 'if gt 5 12. echo 123'
	// var code = 'if gt 3 2. echo "hello world,3 > 2" "test"';
	// var code = 'set name 1234'
	// var code = 'set num 3'
	// var code = 'do 3 gt 5'
	// var code = 'if do 5 lt 3, echo "5 < 3", else echo "5 > 3"'
	// flag = false;

	if (code == 'exit') {
		console.log('bye~');
		process.exit();
	}

	try {
		line(code);
	} catch (err) {
		throw err
		console.error('error:', err.message);
	}

} while (flag);
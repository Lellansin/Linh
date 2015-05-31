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

var run = function(code) {
	var values = Token(code);
	// console.log('values', values);
	var list = AstTree.parse(values);
	// console.log('list', util.inspect(list, false, 15));

	for (var i = 0; i < list.length; i++) {
		var expression = list[i];
		// console.log('expression', util.inspect(expression, false, 15));
		var result = expression.run();
	}

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
	// var code = 'do echo "world", echo "hello"'
	// flag = false;

	if (code == 'exit') {
		console.log('bye~');
		process.exit();
	}

	try {
		run(code);
		// run('set i 0');
		// run('while lt i 5, do echo i, inc i.');
		// run('while lt i 5, do echo i, inc i. echo "over"');
	} catch (err) {
		throw err
		console.error('error:', err.message);
	}

} while (flag);
var lexer = require('./lexer');

function token(text) {
	var list = [];
	var items = split(text);

	for (var i = 0; i < items.length; i++) {
		var value = lexer.parse(items[i]);
		list.push(value);
	}

	return list;
};

var split = function(text) {
	var result = [];
	var strings = [];
	var list = text.trim()
		.replace(/\"[\w\W]*?\"/g, function(match) {
			strings.push(match);
			return ' #str ';
		})
		.replace(/([.,])[^\d]?/g, ' $1 ')
		.split(/[\ ]+/);
	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		if (item == '#str') {
			result.push(strings.shift());
		} else if (item) {
			result.push(item);
		}
	}
	return result;
};

module.exports = token;

// console.log('token()', token('add 12,8'));
// console.log('token()', token('if do 5 lt 3, echo "5 < 3", else echo "5 > 3"'));
// console.log('token()', token('do 3 gt 5'));
// console.log('token()', token('if gt num 5 echo "num > 5". echo "num <= 5"'));
// console.log('token()', token('if gt i 20. echo "big!". else set j 10. echo "this is " j.'));
// console.log(split('if gt 3 2. echo "hello world,3 > 2" "test"'));
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
		.replace(/\"[\w\W]*?\"/, function(match) {
			strings.push(match);
			return ' #str ';
		})
		.split(/[\ ]*,[\ ]*|[\ ]+/);
	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		if (item[item.length - 1] == '.') {
			result.push(item.substr(0, item.length - 1));
			result.push('.');
		} else if (item == '#str') {
			result.push(strings.shift());
		} else if (item) {
			result.push(item);
		}
	}
	return result;
};

module.exports = token;

// console.log('token()', token('add 12,8'));
// console.log(split('if gt 3 2. echo "hello world,3 > 2" "test"'));
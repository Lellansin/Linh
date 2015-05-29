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
	return text.split(/[\ ]*,[\ ]*|\ /);
};

module.exports = token;

// console.log('token()', token('add 12,8'));
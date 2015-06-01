var lexer = require('./lexer');

function token(text) {
	var list = [];
	var items = split(text);

	for (var i = 0; i < items.length; i++) {
		var value = lexer.parse(items[i]);
		list.push(value);
	}

	return list;
}

var split = function(text) {
	var result = [];
	var strings = [];
	var arrays = [];
	var list = text.trim()
		.replace(/[\r\n\t]/g, ' ')
		.replace(/[^A-Za-z]\[[\w\W]*?\]/g, function(match) {
			arrays.push(match);
			return ' #arr ';
		})
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
		} else if (item == '#arr') {
			result.push(arrays.shift().trim());
		} else if (item) {
			result.push(item);
		}
	}
	return result;
};

module.exports = token;

var Value = require('./value');
var TYPE = require('./config/type');

exports.parse = function(str) {
	if (str == '.') {
		return new Value(TYPE.SYNTAX, str);
	}

	var re = new RegExp('(^[A-Za-z_$][\\w\\s?-]*?$)|(^[\\"\\\'][\\w\\W]*[\\"\\\']$)|(^[0-9]+(.[0-9]+)?$)');
	var m = str.match(re);

	if (!m) {
		throw new Error('token not recognize [' + str + ']');
	}

	if (m[1]) {
		switch (m[0]) {
			case 'true':
			case 'false':
				return new Value(TYPE.BOOL, Boolean(m[0]));
			case 'null':
				return new Value(TYPE.NULL, null);
			default:
				return new Value(TYPE.ID, m[0]);
		}
	}

	if (m[2]) {
		return new Value(TYPE.STR, m[0]);
	}

	if (m[3]) {
		return new Value(TYPE.NUM, m[0]);
	}
};


// console.log('parse', exports.parse('i'));;
// console.log('parse', exports.parse('$i'));;
// console.log('parse', exports.parse('name'));;
// console.log('parse', exports.parse('"name"'));;
// console.log('parse', exports.parse('"hello world"'));;
// console.log('parse', exports.parse('"hello world \\" "'));;
// console.log('parse', exports.parse('name1'));;
// console.log('parse', exports.parse('name_1'));;
// console.log('parse', exports.parse('_name'));;
// console.log('parse', exports.parse('name-1'));;
// console.log('parse', exports.parse('name-1 '));;
// console.log('parse', exports.parse('name-1?'));;
// console.log('parse', exports.parse('123'));;
// console.log('parse', exports.parse('1'));;
// console.log('parse', exports.parse('12.3'));;


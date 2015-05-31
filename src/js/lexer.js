var Value = require('./value');
var TYPE = require('./config/type');

exports.parse = function(str) {
	// sentence pause
	if (str == ',') {
		return new Value(TYPE.SYNTAX_PAUSE, str);
	}

	// sentence end
	if (str == '.') {
		return new Value(TYPE.SYNTAX_END, str);
	}

	if (str[0] == '[' && str[str.length - 1] == ']') {
		// todo recr every item
		return new Value(TYPE.ARR, str);
	}

	var re = new RegExp(
		'(^[A-Za-z_$][\\w\\s?-]*?$)|' + // identifier
		'(^[\\"\\\'][\\w\\W]*[\\"\\\']$)|' + // string
		'(^[0-9]+(.[0-9]+)?$)|' + // number (include float)
		'(^[A-Za-z_$][\\w\\s?-\\d\\[\\]]*?$)'); // array

	var m = str.match(re);

	if (!m) {
		var err = 'token not recognize \"' + str + '\"';
		throw new Error(err);
	}

	// identifier
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

	// string
	if (m[2]) {
		return new Value(TYPE.STR, m[0]);
	}

	// number
	if (m[3]) {
		return new Value(TYPE.NUM, m[0]);
	}

	// array
	if (m[5]) {
		return new Value(TYPE.ARR, m[0]);
	}
};


// console.log('parse', exports.parse('i'));;
// console.log('parse', exports.parse('arr[0]'));; // todo
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

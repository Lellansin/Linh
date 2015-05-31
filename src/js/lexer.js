var Value = require('./value');
var TYPE = require('./config/type');

exports.parse = function(str) {
	if (str == '.' || str == ',') {
		return new Value(TYPE.SYNTAX_STOP, str);
	}

	if (str[0] == '[' && str[str.length - 1] == ']') {
		// 递归处理好数组的每一个元素
		return new Value(TYPE.ARR, str);
	}

	var re = new RegExp(
		'(^[A-Za-z_$][\\w\\s?-]*?$)|' + // 标识符
		'(^[\\"\\\'][\\w\\W]*[\\"\\\']$)|' + // 字符串
		'(^[0-9]+(.[0-9]+)?$)|' + // 数字 （两个括号）
		'(^[A-Za-z_$][\\w\\s?-\\d\\[\\]]*?$)'); // 数组

	var m = str.match(re);

	if (!m) {
		var err = 'token not recognize \"' + str + '\"';
		throw new Error(err);
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
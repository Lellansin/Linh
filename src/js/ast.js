var TYPE = require('./config/type');
var Expression = require('./expr');

function AST(context) {
	this.context = context;
}

module.exports = AST;

AST.prototype.parse = function(values) {
	var self = this;

	if (!isFunc(self, values[0]) && values.length != 1) {
		throw new Error('expr error, first item is not function');
	}

	return parse(self, values);
};

var parse = function(self, values) {
	var node = new Expression(self.context, values[0]);

	for (var i = 1; i < values.length; i++) {
		var item = values[i];
		if (item.type == TYPE.SYNTAX_STOP) {
			node.len++;
			break;
		}
		if (!isFunc(self, item)) {
			node.add(item);
		} else {
			var son = parse(self, values.slice(i));
			node.add(son);
			i += son.length();
		}
	};

	return node;
}

var isFunc = function(self, values) {
	if (values.type == TYPE.ID || values.type == TYPE.FUNC) {
		// 是标识符
		if (self.context.funcs.have(values.content)) {
			return true;
		}
	}
	return false;
};

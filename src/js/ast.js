function AST(funcs) {
	this.funcs = funcs;
}

module.exports = AST;

AST.prototype.parse = function(values) {
	var self = this;

	if (!isFunc(self, values[0])) {
		throw new Error('expr error, first item is not function');
	}

	return parse(self, values);
};

var parse = function(self, values) {
	var node = new Tree(values[0]);

	for (var i = 1; i < values.length; i++) {
		var item = values[i];
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
	if (values.type == 0) {
		// 是标识符
		if (self.funcs.have(values.content)) {
			return true;
		}
	}
	return false;
};


function Tree(func) {
	this.func = func.content;
	this.params = [];
	this.isFunc = true;
}

Tree.prototype.add = function(value) {
	this.params.push(value);
};

Tree.prototype.length = function() {
	return this.params.length;
};

Tree.prototype.run = function(funcs) {
	return funcs.run(this.func, this.params);
};
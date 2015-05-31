var AST = require('./ast');
var TYPE = require('./config/type');
var property = require('./utils/define').property;

function Value(type, text) {
	this.init(type, text);
}

module.exports = Value;

Value.prototype.init = function(type, text) {
	if (!text) {
		var value = type;
		property(this, 'type', getType(value));
		this.content = value;
		return;
	}

	property(this, 'type', type);
	switch (type) {
		case TYPE.STR:
			this.content = dealStr(text);
			break;
		case TYPE.NUM:
			this.content = dealNum(text);
			break;
		case TYPE.ARR:
			this.content = dealArray(text);
			break;
		case TYPE.BOOL:
			this.content = Boolean(text);
			break;
		case TYPE.NULL:
			this.content = null;
			break;
		default:
			this.content = text;
	}

};

Value.prototype.load = function(context) {
	if (context.funcs.have(this.content)) {
		this.type = TYPE.FUNC;
		property(this, 'ast', new AST(context));
	}
	property(this, 'context', context);
};

Value.prototype.get = function() {
	if (this.type == TYPE.ID) {
		return this.context.get(this.content);
	}
	return this.content;
};

Value.prototype.set = function(val) {
	if (this.type == TYPE.ID) {
		return this.context.set(this.content, val);
	}
	return this.content = val;
};

Value.prototype.call = function(params) {
	var values = [this].concat(params);
	var expr = this.ast.parse(values).run();
	return expr;
};

Value.prototype.type = function() {
	return this.type;
};

var getType = function(value) {
	var type = typeof value;
	switch (type) {
		case 'string':
			switch (value) {
				case 'true':
				case 'false':
					return TYPE.BOOL;
				case 'null':
					return TYPE.NULL;
			}
			return TYPE.STR;
		case 'number':
			return TYPE.NUM;
		case 'boolean':
			return TYPE.BOOL;
		case 'object':
			// todo
			return TYPE.ARR;
	}
};

var dealStr = function(str) {
	return str.substring(1, str.length - 1);
};

var dealNum = function(str) {
	if (/[.]/.test(str)) {
		return parseFloat(str);
	}
	return parseInt(str);
};

var dealArray = function(str) {
	return JSON.parse(str);
};

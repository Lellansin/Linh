var TYPE = require('./config/type');

function Value(type, text) {
	this.init(type, text);
}

module.exports = Value;

Value.prototype.init = function(type, text) {
	if (!text) {
		var value = type;
		this.type = getType(value);
		this.content = value;
		return;
	}

	this.type = type;
	switch (type) {
		case TYPE.STR:
			this.content = dealStr(text);
			break;
		case TYPE.NUM:
			this.content = dealNum(text);
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

}

Value.prototype.get = function() {
	return this.content;
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
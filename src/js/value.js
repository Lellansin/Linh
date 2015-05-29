var TYPE = {
	ID: 0,
	STR: 1,
	NUM: 2,
	BOOL: 3,
	NULL: 4,
	SYNTAX: 5,
};

function Value(type, text) {
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

module.exports = Value;

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

Value.prototype.get = function() {
	return this.content;
};

Value.prototype.type = function() {
	return this.type;
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
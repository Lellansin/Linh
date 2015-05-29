var TYPE = {
	ID: 0,
	STR: 1,
	NUM: 2
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
		default:
			this.content = text;
	}
}

module.exports = Value;

var getType = function(value) {
	var type = typeof value;
	switch (type) {
		case 'string':
			return TYPE.STR;
		case 'number':
			return TYPE.NUM;
	}
}

Value.prototype.get = function() {
	return this.content;
};

Value.prototype.type = function() {
	return this.type;
};

var dealStr = function(str) {
	return str.substring(1, str.length - 1);
}

var dealNum = function(str) {
	if (/[.]/.test(str)) {
		return parseFloat(str);
	}
	return parseInt(str);
};

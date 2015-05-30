exports.if = function(params) {
	var expression = params[0];
	var iftrue = params[1];
	var iffalse = params[2];

	if (expression.get() && !!iftrue) {
		return iftrue.get();
	} else if (!!iffalse) {
		return iffalse.get();
	}

	return undefined;
};

exports.else = function(params) {
	for (var i = 0; i < params.length - 1; i++) {
		params[i].get();
	}

	return params[i].get();
};


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

exports.for = function(params) {
	return null;
};

exports.while = function(params) {
	var expression = params[0];
	var job = params[1];

	while (expression.get())
		job.get();

	return undefined;
};

/*
 * call arg1 method arg2 arg3 ...
 */
exports.call = function(params) {
	var func = params[1];
	var args = [params[0]].concat(params.slice(2));
	return func.call(args);
};

/*
 * do expr1 expr2 ...
 */
exports.do = function(params) {
	for (var i = 0; i < params.length - 1; i++) {
		params[i].get();
	}
	return params[i].get();
};

/*
 * 
 */
exports.is = function(params) {
	if (params.length != 1)
		throw new Error('function \"is\" only take one parameter');

	return params[0].get();
};

exports.and = function(params) {
	if (params.length != 1)
		throw new Error('function \"and\" only take one parameter');

	return params[0].get();
};

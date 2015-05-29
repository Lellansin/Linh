exports.if = function(params) {
	if (params[0].get() && !!params[1]) {
		return params[1].get();
	}
	return null;
};
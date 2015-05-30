exports.gt = function(params) {
	var num = params[0].get();
	var left = params.slice(1);

	for (var i = 0; i < left.length; i++) {
		var value = left[i].get();
		if (num <= value)
			return false;
	}
	return true;
};

exports.gte = function(params) {
	var flag = true;
	var num = params[0].get();
	params.slice(1).forEach(function(value) {
		if (num >= value.get())
			return false;
	});
	return flag;
};

exports.lt = function(params) {
	var flag = true;
	var num = params[0].get();
	params.slice(1).forEach(function(value) {
		if (num < value.get())
			return false;
	});
	return flag;
};

exports.lte = function(params) {
	var flag = true;
	var num = params[0].get();
	params.slice(1).forEach(function(value) {
		if (num <= value.get())
			return false;
	});
	return flag;
};

exports['gt'] = function(params) {
	var flag = true;
	var num = params[0].get();
	params.slice(1).forEach(function(value) {
		if (num > value.get())
			return false;
	});
	return flag;
};

exports['gte'] = function() {
	var flag = true;
	var num = params[0].get();
	params.slice(1).forEach(function(value) {
		if (num >= value.get())
			return false;
	});
	return flag;
};

exports['lt'] = function(params) {
	var flag = true;
	var num = params[0].get();
	params.slice(1).forEach(function(value) {
		if (num < value.get())
			return false;
	});
	return flag;
};

exports['lte'] = function() {
	var flag = true;
	var num = params[0].get();
	params.slice(1).forEach(function(value) {
		if (num <= value.get())
			return false;
	});
	return flag;
};

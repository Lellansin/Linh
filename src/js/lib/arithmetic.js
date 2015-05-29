exports.add = function(params) {
	var sum = 0;
	params.forEach(function(value) {
		sum += value.get();
	});
	return sum;
};

exports.sub = function(params) {
	var sum = params[0].get();
	params.slice(1).forEach(function(value) {
		sum -= value.get();
	});
	return sum;
};

exports.mul = function(params) {
	var sum = params[0].get();
	params.slice(1).forEach(function(value) {
		sum *= value.get();
	});
	return sum;
};

exports.div = function(params) {
	var sum = params[0].get();
	params.slice(1).forEach(function(value) {
		sum /= value.get();
	});
	return sum;
};

exports.mod = function(params) {
	var sum = params[0].get();
	params.slice(1).forEach(function(value) {
		sum %= value.get();
	});
	return sum;
};
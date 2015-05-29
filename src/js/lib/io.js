exports.echo = function(params) {
	var values = [];
	params.forEach(function(value) {
		values.push(value.get());
	})
	console.log.apply(null, values);
	return null;
};

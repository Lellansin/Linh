exports.echo = function(params) {
	var values = [];
	params.forEach(function(value) {
		values.push(value.get());
	})
	return console.log.apply(null, values);
};

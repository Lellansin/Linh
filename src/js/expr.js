/*
 * 表达式
 */

var func = require('./func');

function Expression(func, params) {
	this.func = func;
	this.params = params;
}

Expression.prototype.run = function() {
	var params = this.params.bootstrap();
	func.call(this.func, params);
};
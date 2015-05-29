var library = require('./lib');
var Value = require('./value');

function Functions() {
	this.list = {};
	this.load();
}

module.exports = Functions;

/*
 * 加载内置函数
 */
Functions.prototype.load = function() {
	for (var name in library) {
		var lib = library[name];

		for (var method in lib) {
			this.list[method] = lib[method];
		}
	}
};

/*
 * 函数注册
 */
Functions.prototype.register = function(func, code) {
	// 解析一系列的表达式出来，运行的时候动态填充数据计算。
	this.list[func] = code;
};

/*
 * 函数判断
 */
Functions.prototype.have = function(func) {
	return !!this.list[func];
};

/*
 * 函数调用
 */
Functions.prototype.run = function(func, params) {
	for (var i = 0; i < params.length; i++) {
		var item = params[i];
		if (item.isFunc) {
			params[i] = new Value(this.run(item.func, item.params));
		}
	}
	return this.list[func](params);
};

/*
 * 函数调用
 */
Functions.prototype.eval = function(ast) {
	this.list[func](params);
};
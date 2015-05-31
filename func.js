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
Functions.prototype.register = function(name, callback) {
	this.list[name] = callback;
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
	return this.list[func](params);
};

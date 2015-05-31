var TYPE = require('./config/type');
var Funcs = require('./func');

function Context(global) {
	this.global = global || {};
	this.funcs = new Funcs();
	this.local = {};

	this.init();
}

module.exports = Context;

Context.prototype.init = function() {
	var self = this;
	self.funcs.register('set', function(params) {
		var key = params[0].content;
		if (key) {
			self.local[key] = params[1].get();
		}
	});
};

/*
 * 定义
 */
Context.prototype.def = function(name, value) {
	if (!!this.local[name]) {
		throw new Error(name + ' has defined.');
	}
	this.local[name] = value;
};

/*
 * 设置
 */
Context.prototype.set = function(name, value) {
	if (!!this.local[name]) {
		this.local[name] = value;
	} else {
		this.global[name] = value;
	}
};

/* 
 * 获取
 */
Context.prototype.get = function(name) {
	if (this.local[name] !== undefined) {
		return this.local[name];
	} else {
		return this.global[name];
	}
};

/* 
 * 获取
 */
Context.prototype.set = function(name, val) {
	if (this.local[name] !== undefined) {
		this.local[name] = val;
	} else {
		this.global[name] = val;
	}
	return undefined;
};

/*
 * 运行
 */
Context.prototype.run = function(name, params) {
	return this.funcs.run(name, params);
};

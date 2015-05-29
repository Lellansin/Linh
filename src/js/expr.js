/*
 * 表达式
 */

var TYPE = require('./config/type');

function Expression(context, value) {
	this.context = context;
	this.name = value.content;
	this.params = [];
	this.isFunc = true;
	this.len = 0;
}

module.exports = Expression;

/*
 * 添加参数
 */
Expression.prototype.add = function(value) {
	if (value.type == TYPE.ID) {
		// 从上下文中得到标识符的值
		value = this.context.get(value.content);
	}
	this.params.push(value);
	this.len++;
};

/*
 * 获取匹配的参数个数
 */
Expression.prototype.length = function() {
	return this.len;
};

/*
 * 执行表达式
 */
Expression.prototype.run = function() {
	return this.context.run(this.name, this.params);
};

/*
 * 获取表达式的值
 */
Expression.prototype.get = function() {
	return this.run();
};
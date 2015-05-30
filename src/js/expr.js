/*
 * 表达式
 */

var Value = require('./value');
var property = require('./utils/define').property;
var TYPE = require('./config/type');

function Expression(context, value) {
	property(this, 'context', context);
	property(this, 'isFunc', true);
	property(this, 'len', 0);
	this.name = value.content;
	this.params = [];
}

module.exports = Expression;

/*
 * 添加参数
 */
Expression.prototype.add = function(value) {
	if (value.type == TYPE.ID) {
		// 从上下文中得到标识符的值
		// value = new Value(this.context.get(value.content));
		value.load(this.context);
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
	if (this.params.length > 0) {
		return this.context.run(this.name, this.params);
	}
	return this.context.get(this.name);
};

/*
 * 获取表达式的值
 */
Expression.prototype.get = function() {
	return this.run();
};
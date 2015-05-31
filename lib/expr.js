/*
 * Expression
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
 * Add parameter to the expression
 */
Expression.prototype.add = function(value) {
	if (value.type == TYPE.ID) {
		// 从上下文中得到标识符的值
		value.load(this.context);
	}
	this.params.push(value);
	this.len++;
};

/*
 * Get matched tokens length
 */
Expression.prototype.length = function() {
	return this.len;
};

/*
 * Eval the expression
 */
Expression.prototype.run = function() {
	if (this.params.length > 0) {
		return this.context.run(this.name, this.params);
	}
	return this.context.get(this.name);
};

/*
 * Get the value of the expression
 */
Expression.prototype.get = function() {
	return this.run();
};

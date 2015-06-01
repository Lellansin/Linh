/*
 * Expression
 */

var TYPE = require('./config/type');
var property = require('./utils/define').property;

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
    loadContext(this, value);
    this.params.push(value);
    this.len++;
};

/*
 * Insert parameters to the expression's begin
 */
Expression.prototype.insert = function(args) {
    var params = [];
    if (args.constructor == Array) {
        for (var i = args.length - 1; i >= 0; i--) {
            loadContext(this, args[i]);
        }
        params = params.concat(args);
    } else {
        loadContext(this, args);
        params.push(args);
    }

    this.params = params.concat(this.params);
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

/*
 * Check if it's time to end
 */
Expression.prototype.checkEnd = function(mark) {
    var flag = this.context.checkEnd(this.name, mark);
    return flag;
};

// Get identifier value from context
var loadContext = function(self, value) {
    if (value.type == TYPE.ID) {
        value.load(self.context);
    }
};

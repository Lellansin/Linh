var library = require('./core');
var Value = require('./value');
var MARK = require('./config/mark');

function Functions() {
    this.list = {};
    this.empty = [];
    this.load();
}

module.exports = Functions;

/*
 * Load core functions
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
 * Register a new function
 */
Functions.prototype.register = function(name, callback) {
    this.list[name] = callback;
};

/*
 * Have function
 */
Functions.prototype.have = function(func) {
    return !!this.list[func];
};

/*
 * Call the function
 */
Functions.prototype.run = function(func, params) {
    return this.list[func](params);
};

/*
 * Check end
 */
Functions.prototype.checkEnd = function(func, mark) {
    var end = this.list[func].end;

    if (end == MARK.END) {
        return MARK.END == mark;
    } else if (end !== undefined) {
        return (end == mark) || (MARK.END == mark);
    }

    return (MARK.COMMA == mark) || (MARK.END == mark);
};

/*
 * Check end
 */
Functions.prototype.catch = function(func) {
    if (this.list[func]) {
        return this.list[func].catch || this.empty;
    }
    return this.empty;
};

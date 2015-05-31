var library = require('./core');
var Value = require('./value');

function Functions() {
	this.list = {};
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

var MARK = require('../config/mark');

exports.if = function(params) {
    var expression = params[0];
    var iftrue = params[1];
    var iffalse = params[2];

    if (expression.get() && !!iftrue) {
        return iftrue.get();
    } else if (!!iffalse) {
        return iffalse.get();
    }

    return undefined;
};

exports.else = function(params) {
    for (var i = 0; i < params.length - 1; i++) {
        params[i].get();
    }

    return params[i].get();
};

exports.for = function(params) {
    return null;
};

exports.while = function(params) {
    var expression = params[0];
    var job = params[1];

    while (expression.get())
        job.get();

    return undefined;
};

/*
 * let arg1 arg2 ... method  argN ...
 */
exports.let = function(params) {
    var args = [];

    for (var i = 0; i < params.length; i++) {
        var item = params[i];
        if (item.isFunc) {
            item.insert(args);
            return item.run();
        }
        args.push(item);
    }
};

// set let stop with comma
exports.let.end = MARK.COMMA;

/*
 * do expr1 expr2 ...
 */
exports.do = function(params) {
    for (var i = 0; i < params.length - 1; i++) {
        params[i].get();
    }
    return params[i].get();
};

/*
 *
 */
exports.is = function(params) {
    if (params.length != 1)
        throw new Error('function \"is\" only take one parameter');

    return params[0].get();
};

exports.and = function(params) {
    if (params.length != 1)
        throw new Error('function \"and\" only take one parameter');

    return params[0].get();
};

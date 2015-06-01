var TYPE = require('../config/type');

 /*
  * increase
  */
exports.inc = function(params) {
    if (params.length != 1)
        throw new Error('function \"inc\" only take one parameter');

    var value = params[0],
        num = value.get() + 1;

    if (typeof num == 'number') 
        value.set(num);
    else
        throw new Error('type ' + value.type + ' increase not support');

    return num;
};

/*
 * decrease
 */
exports.dec = function(params) {
    if (params.length != 1)
        throw new Error('function \"inc\" only take one parameter');

    var value = params[0],
        num = value.get() - 1;

    if (typeof num == 'number')
        value.set(num);
    else
        throw new Error('type ' + value.type + ' increase not support');

    return num;
};

/*
 * plus
 */
exports.add = function(params) {
    var sum = 0;
    params.forEach(function(value) {
        sum += value.get();
    });
    return sum;
};

/*
 * minus
 */
exports.sub = function(params) {
    var sum = params[0].get();
    params.slice(1).forEach(function(value) {
        sum -= value.get();
    });
    return sum;
};

/*
 * multiply
 */
exports.mul = function(params) {
    var sum = params[0].get();
    params.slice(1).forEach(function(value) {
        sum *= value.get();
    });
    return sum;
};

/*
 * divide
 */
exports.div = function(params) {
    var sum = params[0].get();
    params.slice(1).forEach(function(value) {
        sum /= value.get();
    });
    return sum;
};

/*
 * modulo
 */
exports.mod = function(params) {
    var sum = params[0].get();
    params.slice(1).forEach(function(value) {
        sum %= value.get();
    });
    return sum;
};

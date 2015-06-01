exports.gt = function(params) {
    var num = params[0].get();
    var left = params.slice(1);

    for (var i = 0; i < left.length; i++) {
        var value = left[i].get();
        if (num <= value)
            return false;
    }
    return true;
};

exports.gte = function(params) {
    var num = params[0].get();
    var left = params.slice(1);

    for (var i = 0; i < left.length; i++) {
        var value = left[i].get();
        if (num < value)
            return false;
    }
    return true;
};

exports.lt = function(params) {
    var num = params[0].get();
    var left = params.slice(1);

    for (var i = 0; i < left.length; i++) {
        var value = left[i].get();
        if (num >= value)
            return false;
    }
    return true;
};

exports.lte = function(params) {
    var num = params[0].get();
    var left = params.slice(1);

    for (var i = 0; i < left.length; i++) {
        var value = left[i].get();
        if (num > value)
            return false;
    }
    return true;
};

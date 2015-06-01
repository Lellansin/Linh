
var stack = [];

exports.push = function(item) {
    stack.push(item);
};

exports.pop = function(item) {
    return stack.pop(item);
};


exports.property = function(obj, key, value) {
    Object.defineProperty(obj, key, {
        value: value,
        enumerable: false,
        configurable: true,
        writable: true
    });
};

exports.const = function(obj, key, value) {
    Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: false
    });
};

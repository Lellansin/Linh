
exports.range = function() {
    var start = params[0].get();
    var end = params[1].get();
    var interval = 1;

    if (!end) {
        end = start;
        start = 0;
    }

    if (!!params[2]) {
        interval = params[2].get();
    }

    var list = [start];

    for (var i = 0; i < end; i += interval) {
        list.push(i);
    }

    return list;
};
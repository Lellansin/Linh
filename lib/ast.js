var TYPE = require('./config/type');
var MARK = require('./config/mark');
var Expression = require('./expr');

function AST(context) {
    this.context = context;
}

module.exports = AST;

AST.prototype.parse = function(values) {
    var self = this;

    // expr with one value will directly return
    if (!isFunc(self, values[0]) && values.length != 1) {
        throw new Error('expr error, first item is not function');
    }

    var list = [];

    parse(self, values, list);

    return list;
};

var parse = function(self, values, list, deep) {
    if (!values[0] || values[0].type >= TYPE.SYNTAX_END) {
        if (values.length > 1)
            values = values.slice(1);
        else
            return;
    }

    // New expression node
    var node = new Expression(self.context, values[0]);
    var i = 1;

    for (; i < values.length; i++) {
        var item = values[i];
        node.matched++;

        if (item.type == TYPE.SYNTAX_PAUSE) {
            node.end = MARK.COMMA;
            i++;
            break;
        }

        if (item.type == TYPE.SYNTAX_END) {
            node.end = MARK.END;
            i++;
            break;
        }

        if (!isFunc(self, item)) {
            node.add(item);
        } else {
            var son = parse(self, values.slice(i), list, (deep || 0) + 1);
            node.add(son);
            i += son.matched;
            node.matched += son.matched;

            if (node.checkEnd(son.end)) {
                if (node.prospect(values[i + 1])) {
                    continue;
                }
                node.end = son.end;
                break;
            }
        }
    }

    if (!deep) {
        list.push(node);

        if (i != values.length) {
            parse(self, values.slice(i), list, 0);
        }
    }

    return node;
};

var isFunc = function(self, values) {
    // identifier
    if (values.type == TYPE.ID || values.type == TYPE.FUNC) {
        if (self.context.funcs.have(values.content)) {
            return true;
        }
    }
    return false;
};
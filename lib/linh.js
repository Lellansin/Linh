/*
 * 
 * 所有变量粒子化，加减乘除知不是粒子的状态改变
 *
 * 粒子包含值（当前计算值）、操作历史（操作行为、时间）
 * 
 * 目标是，可以嵌入语言的语言。
 * 
 */
var util = require('util');
var Token = require('./token');
var Context = require('./context');
var AST = require('./ast');

var root = {};
var context = new Context(root);
var AstTree = new AST(context);

module.exports = function(code) {
    var values = Token(code);
    // console.log('values', values);

    var list = AstTree.parse(values);
    // console.log('list', util.inspect(list, false, 15));

    var result;
    for (var i = 0; i < list.length; i++) {
        var expression = list[i];
        // console.log('expression', util.inspect(expression, false, 15));
        result = expression.run();
    }

    return result;
};

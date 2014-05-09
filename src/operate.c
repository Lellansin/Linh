
#include <stdio.h>
#include <assert.h>

#include "operate.h"

/**
 * 操作符列表
 */
operator_t operator_list[] =
{
    {"plus", "+", plusProc},
    {"minus", "-", minusProc},
    {"multiply", "*", multiplyProc},
    {"divide", "/", divideProc},
    {"modulo", "\45", moduloProc} // \45 即 %
};

// Todo:: 添加 operator 配置 init 函数
// Todo:: 改成操作符 list struct，然后动态添加 

/**
 * 判断
 */
var equal(int argc, char **argv)
{
    assert(argc == 2);
}

/**
 * 加法过程
 */
var plusProc(int argc, var *argv)
{
    var result = {"result", {0, 0}};
    assert(argc == 2);
    result.value.val._int = argv[0].value.val._int + argv[1].value.val._int;
    return result;
}

/**
 * 减法过程
 */
var minusProc(int argc, var *argv)
{
    var result = {"result", {0, 0}};
    assert(argc == 2);
    result.value.val._int = argv[0].value.val._int - argv[1].value.val._int;
    return result;
}

/**
 * 乘法过程
 */
var multiplyProc(int argc, var *argv)
{
    var result = {"result", {0, 0}};
    assert(argc == 2);
    result.value.val._int = argv[0].value.val._int * argv[1].value.val._int;
    return result;
}

/**
 * 除法过程
 */
var divideProc(int argc, var *argv)
{
    var result = {"result", {0, 0}};
    assert(argc == 2);
    result.value.val._int = argv[0].value.val._int / argv[1].value.val._int;
    return result;
}

/**
 * 求模过程
 */
var moduloProc(int argc, var *argv)
{
    var result = {"result", {0, 0}};
    assert(argc == 2);
    result.value.val._int = argv[0].value.val._int % argv[1].value.val._int;
    return result;
}

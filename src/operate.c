
#include <stdio.h>
#include <assert.h>

#include "operate.h"

operator_t operator_list[] =
{
    {"plus", "+", plusProc},
    {"minus", "-", minusProc},
    {"multiply", "*", multiplyProc},
    {"divide", "/", divideProc},
    {"modulo", "\45", moduloProc} // \45 即 %
};

var equal(int argc, char **argv)
{
    assert(argc == 2);
}

var plusProc(int argc, var *argv)
{
    var result = {"result", {0, 0}};
    assert(argc == 2);
    result.value.val._int = argv[0].value.val._int + argv[1].value.val._int;
    return result;
}

var minusProc(int argc, var *argv)
{
    var result = {"result", {0, 0}};
    assert(argc == 2);
    result.value.val._int = argv[0].value.val._int - argv[1].value.val._int;
    return result;
}

var multiplyProc(int argc, var *argv)
{
    var result = {"result", {0, 0}};
    assert(argc == 2);
    result.value.val._int = argv[0].value.val._int * argv[1].value.val._int;
    return result;
}

var divideProc(int argc, var *argv)
{
    var result = {"result", {0, 0}};
    assert(argc == 2);
    result.value.val._int = argv[0].value.val._int / argv[1].value.val._int;
    return result;
}

var moduloProc(int argc, var *argv)
{
    var result = {"result", {0, 0}};
    assert(argc == 2);
    result.value.val._int = argv[0].value.val._int % argv[1].value.val._int;
    return result;
}

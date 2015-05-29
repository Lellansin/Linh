
#include <stdio.h>
#include <stdlib.h>
#include <assert.h>

#include "error.h"
#include "operate.h"

/**
 * 操作符列表
 */
operator_t operator_list[] =
{
    {"plus", "+", plusProc, 2},
    {"minus", "-", minusProc, 2},
    {"multiply", "*", multiplyProc, 2},
    {"divide", "/", divideProc, 2},
    {"modulo", "\45", moduloProc, 2} // \45 即 %
};

// Todo:: 读取配置文件来加载
// Todo:: 添加 operator 配置 init 函数
// Todo:: 改成操作符 list struct，然后动态添加

/**
 * 根据字符串获取操作符
 */
operator_t getOperatorByString(char *str)
{
    printf("getOperatorByString: str: %s\n", str);
    int i, len = sizeof(operator_list) / sizeof(operator_t);
    for (i = 0; i < len; ++i)
    {
        if (strcmp(str, operator_list[i].content) == 0)
        {
            return operator_list[i];
        }
    }

    // Todo::add to error.h
    printf("Error %d: operator [%s] not found\n", ERROR_OPERATOR_NOT_FOUND, str);
    exit(ERROR_OPERATOR_NOT_FOUND);
}

/**
 * 根据操作符获取其目数
 * 
 * Unary operator
 * Binary operator
 * Ternary operator
 */
int getOperatorNumeral(operator_t *op)
{
    return op->num;
}

/**
 * 根据操作符 String 获取其目数
 * 
 * Unary operator
 * Binary operator
 * Ternary operator
 */
int getOperatorNumeralByString(char *str)
{
    printf("getOperatorNumeralByString str: %s\n", str);
    operator_t op = getOperatorByString(str);
    return op.num;
}


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
    if (argc != 2)
    {
        printf("argc: %d\n", argc);
        printf("argv[0]: %d\n", argv[0]);
        printf("argv[1]: %d\n", argv[1]);
        printf("argv[2]: %d\n", argv[2]);
    }
    // assert(argc == 2);
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
    // Todo::处理浮点数
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

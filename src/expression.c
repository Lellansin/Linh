
#include <stdio.h>
#include <string.h>

#include "operate.h"


/**
 * 运行表达式
 *
 * param expression_t * e      表达式
 * param var *          param  带入参数(用于调用下一层表达式)
 *
 * 表达式由 [item] + 操作符组成 表达式的值 = 操作符运算[item] 的结果
 */
var run_expression(expression_t *e)
{
    int i = 0;
    expression_t *start = e;
    expression_t *cur = e;
    operator_t cur_op;

    var *param = NULL;
    int  var_num;
    var *var_list;

    // Todo::check operate

loop:

    cur_op = getOperatorByString(cur->op.content);

    var_num = cur->num;
    var_list = (var *)cur->list;

    // 如果有结果的话
    if (param)
    {
        cur->list[0] = *param;
        var_num++;
    }
    else
    {
        var_list++;
    }

    cur->result = cur_op.func(var_num, var_list);


    // 调用下一层表达式
    if (cur->next)
    {
        param = &cur->result;
        cur = cur->next;
        goto loop;
    }

    return cur->result;
}
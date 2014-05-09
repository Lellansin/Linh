
#include <stdio.h>

#include "operate.h"


/**
 * 运行表达式
 *
 * 表达式由 [item] + 操作符组成 表达式的值 = 操作符运算[item] 的结果
 */
void run_expression(expression_t e)
{
    var result = {0};
    int i, len = sizeof(operator_list) / sizeof(operator_t);

    for (i = 0; i < len; ++i)
    {
        if (strcmp(e.op.content, operator_list[i].content) == 0)
        {
            result = operator_list[i].func(e.num, e.list);
            var_print(result);
        }
    }
}
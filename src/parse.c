#include <stdio.h>
#include <string.h>
#include <malloc.h>

#include "var.h"
#include "expression.h"

/**
 * 调试输出机械出来的参数
 */
static debug_params(int argc, char **argv)
{
    int i = 0;
    for (; i < argc; ++i)
    {
        switch (check_identifier(argv[i]))
        {
        case T_INTEGER:
            printf("param: %d -> [%s] type: integer\n", i, argv[i]);
            break;
        case T_STRING:
            printf("param: %d -> [%s] type: string\n", i, argv[i]);
            break;
        case T_FLOAT:
            printf("param: %d -> [%s] type: float\n", i, argv[i]);
            break;
        case T_IDENTIFIER:
            printf("param: %d -> [%s] type: identifier\n", i, argv[i]);
            break;
        case T_PUNCTUATION:
            printf("param: %d -> [%s] type: punctuation\n", i, argv[i]);
            break;
        case T_ERROR:
            printf("param: %d -> [%s] type: error\n", i, argv[i]);
            break;
        }
    }
}

/**
 * 运行语句
 */
void eval(int argc, char **argv)
{
    expression_t total = {0};
    var *tmp;
    int i;

#ifdef DEBUG
    debug_params(argc, argv);
#endif

    for (i = 0; i < argc; ++i)
    {
        /*
            判断 argv[i] 是否
            变量
                是变量加入当前运算表达式（可能未定）
                    判断运算表达式目数是否已满，满则新建表达式
            运算符
                是运算符
                    组成表达式

            变量之后一定是运算符，不可以两个变量毫无关联的放在一起

            判断当前表达式的二目是直接是当前变量还是新的表达式，就看下一个运算符的优先级是否高于当前运算符
        */
        if (type_is_constant_var(argv[i]))
        {
            printf("param: %d -> [%s] constant\n", i, argv[i]);
            get_var_from_str(&tmp, argv[i]);
            total.list[total.num++] = *tmp;
        }
        else
        {
            strcpy(total.op.content, argv[i]);
            printf("param: %d -> [%s]\n", i, argv[i]);
        }
    }

    run_expression(total);
}

/**
 * 解析暂停标志
 */
int parse_stop_check(int ch)
{
    if (ch == ' ')
    {
        return 1;
    }
    if (ch == '.' || ch == '"')
    {
        return 0;
    }
    return ispunct(ch);
}

/*
 * 解析一行语句
 */
void parse(char *cmd)
{
    int argc, i;
    char *argv[100];
    char *tmp = cmd, *end = cmd;
    char string_flag = 0;
    int count = 0, end_flag = 0;
    int length = 0, pun_flag;
    char SPACE = ' ', END = '\0', NEW_LINE = '\n';

    // 忽略开头空格
    while (*cmd == SPACE)
        cmd++;

    // 忽略结尾回车
    while (*end != END && *end != NEW_LINE)
        end++;

    while (cmd != end)
    {
        // 判断是否随后到结尾
        end_flag = (cmd + 1) == end;
        pun_flag = ispunct(*cmd);

        // 记录字符串标识
        if (*cmd == '"')
        {
            string_flag = 1 - string_flag;
        }

        if ((parse_stop_check(*cmd) && string_flag == 0) || end_flag)
        {
            length = cmd - tmp + (end_flag ? !pun_flag : 0);

            if ((*(cmd - 1) != SPACE || end_flag) && (length) > 0)
            {
                argv[count] = (char *)malloc(sizeof(char) * (length));
                argv[count][length] = '\0';
                strncpy(argv[count++], tmp, (length));
            }
            if (pun_flag)
            {
                argv[count] = (char *)malloc(sizeof(char) + 1);
                argv[count][0] = *cmd;
                argv[count++][1] = '\0';
            }
            tmp = cmd + 1;
        }
        cmd++;
    }
    argc = count;

    eval(argc, argv);

    for (i = 0; i < argc; ++i)
    {
        // printf("param: %d -> [%s]\n", i, argv[i]);
        free(argv[i]);
    }
}
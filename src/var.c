
#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <malloc.h>
#include <string.h>

#include "var.h"

/**
 * 输出 var
 */
void var_print(var t)
{
    switch (t.value.type)
    {
    case T_INTEGER:
        printf("%s: %d\n", t.name, t.value.val._int);
        break;
    case T_FLOAT:
        printf("%s: %f\n", t.name, t.value.val._float);
        break;
    case T_STRING:
        printf("%s: %s\n", t.name, t.value.val._string);
        break;
    }
}

/**
 * 检查标识符类型
 */
enum TYPE check_identifier(char *param)
{
    char *start = param;
    char *end = param;
    int float_flag = 0;

    // end 指向结尾
    while (*(end + 1) != '\0')
        end++;

    // 如果以 " 开头和结尾，则为字符串类型
    if (*start == '"' && *end == '"')
    {
        return T_STRING;
    }

    // 如果长度是一 并且是标点符号或特殊符号, 则为 T_PUNCTUATION
    if (strlen(start) == 1 && ispunct(*start))
    {
        return T_PUNCTUATION;
    }

    // 如果以字母开头
    if (isalpha(*param))
    {
        // 循环判断是否为标识符
        while (*++param != '\0')
        {
            if (!isalpha(*param))
            {
                printf("identifier parse error! [%s]\n", start);
                return T_ERROR;
            }
        }
        return T_IDENTIFIER;
    }
    // 如果以数字开头
    else if (isdigit(*param))
    {
        while (*++param)
        {
            // 如果有 '.''
            if (*param == '.')
            {
                float_flag++;
            }
            // 如果有不是数字的字符则报错
            else if (!isdigit(*param))
            {
                printf("number parse error! [%s]\n", start);
                return T_ERROR;
            }
        }
        if (float_flag == 0)
        {
            return T_INTEGER;
        }
        else if ( float_flag == 1)
        {
            return T_FLOAT;
        }
        else
        {
            return T_ERROR;
        }
    }

    // 如果以上条件均不满足则报错
    printf("check identifier error! [%s]\n", start);
    return T_ERROR;
}

/**
 * 检查类型是否为常量
 */
int type_is_constant_var(char *param)
{
    int type = check_identifier(param);
    if (type <= T_FLOAT)
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

/**
 * 返回型的变量
 */
var *var_new()
{
    return (var *)malloc(sizeof(var));
}

/**
 * 将 string 解析成 var
 */
int get_var_from_str(var **t, char *str)
{
    enum TYPE type = check_identifier(str);

    switch (type)
    {
    case T_INTEGER:
        *t = var_new();
        (*t)->value.type = T_INTEGER;
        (*t)->value.val._int = atoi(str);
        break;
    case T_FLOAT:
        *t = var_new();
        (*t)->value.type = T_FLOAT;
        (*t)->value.val._float = (float)atof(str);
        break;
    case T_STRING:
        *t = var_new();
        (*t)->value.type = T_STRING;
        strcpy((*t)->value.val._string, str);
        break;
    case T_IDENTIFIER:
        // Todo::通过当前标识符列表获取变量的值
        break;
    case T_PUNCTUATION:
    case T_ERROR:
        // Todo::错误处理
        break;
    }

    return 0;
}

int var_get_int(var t)
{
    if (t.value.type == V_INTEGER)
    {
        return t.value.val._int;
    }
    else
    {
        printf("var %s is not integer!\n", t.name);
        return 0;
    }
}

char *var_get_string(var t)
{
    if (t.value.type == V_STRING)
    {
        return t.value.val._string;
    }
    else
    {
        printf("var %s is not string!\n", t.name);
        return NULL;
    }
}

float var_get_float(var t)
{
    if (t.value.type == V_FLOAT)
    {
        return t.value.val._float;
    }
    else
    {
        printf("var %s is not float!\n", t.name);
        return 0.0;
    }
}

int var_set_int(var *t, int v)
{
    if (t->value.type == V_INTEGER)
    {
        t->value.val._int = v;
        return 1;
    }
    else
    {
        printf("var %s is not integer!\n", t->name);
        return 0;
    }
}

int var_set_string(var *t, char *v)
{
    int len = strlen(v);
    char *tmp = (char *)malloc(sizeof(char) * len);
    if (t->value.type == V_STRING)
    {
        strcpy(tmp, v);
        t->value.val._string = tmp;
        return 1;
    }
    else
    {
        printf("var %s is not string!\n", t->name);
        return 0;
    }
}

int var_set_float(var *t, float v)
{
    if (t->value.type == V_FLOAT)
    {
        t->value.val._float = v;
        return 1;
    }
    else
    {
        printf("var %s is not float!\n", t->name);
        return 0;
    }
}
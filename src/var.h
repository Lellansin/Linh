
#ifndef _VAR_H_
#define _VAR_H_

enum TYPE {T_INTEGER, T_STRING, T_FLOAT, T_IDENTIFIER, T_PUNCTUATION, T_ERROR};

enum VAR_TYPE {V_INTEGER, V_STRING, V_FLOAT, V_FUNCTION};

struct _operator_t;
struct _expression_t;

/**
 * 泛型 值 （内置）
 */
typedef union
{
    int _int;
    char *_string;
    float _float;
    struct _expression_t *_exp;
} __value__;

/**
 * 普通的值
 */
typedef struct
{
    __value__ val;
    int type;
} value_t;

/**
 * 键值对
 */
typedef struct
{
    char name[128];
    value_t value;
} var;

/**
 * 操作符
 */
typedef struct _operator_t
{
    char name[10];
    char content[10];
    var (*func)(int argc, var *argv);
} operator_t; 

/**
 * 表达式
 */
typedef struct _expression_t
{
    char name[10];
    var list[10];
    int num; // 操作符目数 
    operator_t op;
} expression_t;


var * var_new();
void var_print(var t);
enum TYPE check_identifier(char *param);
int type_is_constant_var(char *param);
int get_var_from_str(var **t, char *str);

int var_get_int(var t);
char *var_get_string(var t);
float var_get_float(var t);
int var_set_int(var *t, int v);
int var_set_string(var *t, char *v);
int var_set_float(var *t, float v);

#endif
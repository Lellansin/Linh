#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <malloc.h>

#include "file.h"
#include "str.h"
#include "error.h"

/**
 * 根据路径的 basename 获取名称
 * 
 * 例：D:\Test\app.exe
 * 返回 app
 */
char *getFilename(char *filename_in, char *origin, char *suffix )
{
    char *p = filename_in;
    char *dot;

    while ( *p )
    {
        if (*p == '.')
        {
            dot = p;
        }
        p++;
    }
    memcpy(origin, filename_in, dot - filename_in);
    *(origin + (dot - filename_in)) = '\0';

    sprintf(origin, "%s.%s\0", origin, suffix);

    return origin;
}

// 文件处理
void process(char filename_in[FILENAME_MAX])
{
    FILE *file_deal;
    FILE *file_out;
    char filename_out[FILENAME_MAX] = { 0, };
    char buffer[FILENAME_MAX];
    char *str = NULL;
    char *after;
    char command[50];

    if ((file_deal = fopen(filename_in, "r")) == NULL)
    {
        printf("文件打开失败");
        return ;
    }

    getFilename(filename_in, filename_out, "en.c");

    if ((file_out = fopen(filename_out, "w")) == NULL)
    {
        printf("文件生成失败");
        return ;
    }


    while ( (str = fgets(buffer, FILENAME_MAX, file_deal)) != NULL)
    {
        after = (char *)malloc(sizeof(char) * FILENAME_MAX);

        // 判断代码是否是注释

        // 不是注释,替换中文关键字
        replace_ZhToEn(str, after);

        // 是注释,忽略替换直接输出

        fputs(after, file_out);
        free(after);
    }

    fclose(file_deal);
    fclose(file_out);

    printf("文件处理成功");

    // 配置编译器环境变量
    system("config.bat");
    printf("\n");

    // 使用编译器编译生成的代码
    sprintf(command, "cl.exe %s", filename_out);
    system(command);

    // 如果编译成功,执行生成的exe文件
    getFilename(filename_out, command, "exe");
    printf("\n");
    system(command);

}


/*
 * 读取配置文件
 */
void ConfigInit()
{

}
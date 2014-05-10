#include <stdio.h>
#include <assert.h>
#include <stdlib.h>

#include "linh.h"
#include "args.h"
#include "parse.h"

// #define DEBUG

int main(int argc, char const *argv[])
{
    // check the arguments
    linh_args_check(argc, argv);

    // deal the file
    linh_args_files(argc, argv);


    repl();

    return 0;
}

/**
 * Read-Eval-Print-Loop
 *
 * 命令行交互
 */
void repl()
{
    char input[1024];

    while (1)
    {
        printf("> ");
        gets(input);

        printf("%s\n", input);

        // Todo::拆分一个命令 run 函数
        if (strcmp(input, "quit") == 0)
        {
            exit(0);
        }

        // 解析
        parse(input);
        // Todo::将解析出来的表达式放在此处运行
    }
}
#include <stdio.h>
#include <assert.h>
#include <stdlib.h>

#include "args.h"
// #include "parse.h"

void parse(char *cmd);

// #define DEBUG

void repl();

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

        if (strcmp(input, "quit") == 0)
        {
            exit(0);
        }

        parse(input);
    }
}
#include <stdio.h>
#include <malloc.h>
#include <string.h>
#include "args.h"

static void help();
static char **copy_argv(int argc, char const *argv[]);

/**
 * check arguments
 */
int linh_args_check(int argc, char const *argv[])
{
    if (argc == 1)
    {
        help();
    }
}

/**
 * get options
 */
int linh_args_options(int argc, char const *argv[])
{

}

/**
 * get files
 */
int linh_args_files(int argc, char const *argv[])
{
    int i;
    char **argv_copy = copy_argv(argc, argv);

    for (i = 1; i < argc; ++i)
    {

    }
}

static char **copy_argv(int argc, char const *argv[])
{
    int i;
    size_t len;
    size_t strlen_sum;
    char **argv_copy;
    char *argv_data;

    strlen_sum = 0;
    for (i = 0; i < argc; i++)
    {
        strlen_sum += strlen(argv[i]) + 1;
    }

    argv_copy = (char **) malloc(sizeof(char *) * (argc + 1) + strlen_sum);
    if (!argv_copy)
    {
        return NULL;
    }

    argv_data = (char *) argv_copy + sizeof(char *) * (argc + 1);

    for (i = 0; i < argc; i++)
    {
        argv_copy[i] = argv_data;
        len = strlen(argv[i]) + 1;
        memcpy(argv_data, argv[i], len);
        argv_data += len;
    }

    argv_copy[argc] = NULL;

    return argv_copy;
}

static void help()
{
    printf("No input file.\n");
}

#include <stdio.h>

#define TEST

#ifdef TEST
  #define ENTRY main
#endif

// todo place into special file
#define SUCCESS 0

#define BRACKETS_NOT_MATCH 1000
#define BRACKETS_NO_INTERVAL 1001


int match_brackets(char *sentence)
{
    int left = 0;
    int right = 0;
    int match = 0;
    int len = 0;
    int error = SUCCESS;
    char *p = sentence;

    while (*p)
    {
        if (*p == '(')
        {
            left++;
            match++;
        }
        else if (*p == ')')
        {
            right++;

            if (match != 0)
            {
                match--;
            }
            else
            {
                error = BRACKETS_NOT_MATCH;
                break;
            }

            // ()()   not allowed, there must have space
            if (*(p + 1) == '(' )
            {
                error = BRACKETS_NO_INTERVAL;
                break;
            }
        }

        len++;
        p++;
    }

    if (match != 0 || left != right)
    {
        error = BRACKETS_NOT_MATCH;
    }

    return 0;
}

int ENTRY(int argc, char const *argv[])
{
    printf("%d\n", match_brackets("(print hello world)"));
    printf("%d\n", match_brackets("(+ 1 1)"));
    printf("%d\n", match_brackets("(int 1)"));
    printf("%d\n", match_brackets("(print (if \
                                        (> 2 1) \
                                        (str \"yes\") \
                                        (str \"no\")))"));
    return 0;
}
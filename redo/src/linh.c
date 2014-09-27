

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
        expresion *e = parse(input);
        // Todo::将解析出来的表达式放在此处运行
        var *result = eval(e);

        print_var(result);
    }
}

/**
 * deal with file
 */
void dealFile()
{
    char input[1024];
    FILE *fp;

    // todo read file 
    std::vector<char> v;
    if (!(fp = fopen("filename", "r")))
    {
    	exit(1); // todo config
    }

    char buf[1024];
    while (size_t len = fread(buf, 1, sizeof(buf), fp))
        v.insert(v.end(), buf, buf + len);

    fclose(fp);





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

// #define DEBUG

int start()
{
    // 参数检查, 拷贝
    // 如果是文件
    // 判断文件
    // 如果不是文件
    // 启动 repl

    // check the arguments
    linh_args_check(argc, argv);

    // deal the file
    linh_args_files(argc, argv);


    repl();

    return 0;
}
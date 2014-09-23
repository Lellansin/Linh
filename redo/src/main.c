#include "linh.h"

#ifdef _WIN32

int wmain(int argc, wchar_t *wargv[])
{
    // 将 argv 转成 UTF8 编码
    // ...
    return start(argc, argv);
}

#else

// UNIX/Linux
int main(int argc, char *argv[])
{
    return start(argc, argv);
}
#endif

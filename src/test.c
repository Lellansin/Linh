// #include <stdio.h>

// int main()
// {
//     int i = 1, j = 2;
//     int x, y, z;
//     int number = 0;
//     while ( i <= 20000 )
//     {
//         while ( j <= 20000 )
//         {
//             // z = 20000 - j;
//             x = i;
//             // y = j - i;
//             // if (z >= 5000 && y >= 5000 && x >= 5000)
//             // {
//                 // number = number + 1;
//                 // printf("%d\n",i);
//             // }
//             // j++;
//         }
//         i++;
//         // printf("%d\n", i);
//     }
//     printf("%f \n",(float)(number/20000.0)*100);
//     printf("over\n");
//     return 0;
// }


#include <stdio.h>
#include <string.h>
int main()
{
    // int i = 4294967295;
    // printf("%d\n", i);
    int i, t, b, sum = 0;
    char a[10];
    scanf("%s", a);
    t = 1, b = 1;
    for (i = strlen(a) - 1; i >= 0; i--)
    {
        if (a[i] <= '9' && a[i] >= '0')
            t = (a[i] - '0');
        else if ( a[i] >= 'A' && a[i] <= 'F')
            t = (a[i] - 'A' + 10);
        sum = sum + t * b;
        b = b * 16;
    }
    printf("%d\n", sum);
    return 0;
}
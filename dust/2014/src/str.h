#ifndef _STR_H_
#define _STR_H_

// 获取字符串中的中文，并替换成英文
void getChinese(char *str);
// 通过关键字的中文获取到英文
char *getValueByName(char *name, char *add);
// 获取字符串中的中文(未使用)
void replace_ZhToEn(char *str, char *after);

#endif
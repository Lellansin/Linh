#ifndef ERROR_H
#define ERROR_H ERROR_H

#define CHECK(Expression,Value,String)    \
if (Expression == Value)                  \
{                                         \
	printf("Error: %s\n", String);        \
}                                         \

#endif
#ifndef ERROR_H
#define ERROR_H ERROR_H

#define CHECK(Expression,Value,String)    \
if (Expression == Value)                  \
{                                         \
	printf("Error: %s\n", String);        \
}                                         \


#define ERROR_OPERATOR_NOT_FOUND 100

#endif
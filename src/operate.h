
#ifndef _OPERATE_H_
#define _OPERATE_H_

#include "var.h"

operator_t getOperatorByString(char *str);
int getOperatorNumeralByString(char *str);
var plusProc(int argc, var *argv);
var minusProc(int argc, var *argv);
var multiplyProc(int argc, var *argv);
var divideProc(int argc, var *argv);
var moduloProc(int argc, var *argv);

extern operator_t operator_list[5];


#endif

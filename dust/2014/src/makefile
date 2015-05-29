CC = gcc

#
# todo move the output file to ./out/debug
#
OBJ = linh.o parse.o args.o var.o operate.o expression.o
Clear = rm -rf ./out/debug/*.o
Move = mv
Exec = ./linh

#
# set clear by os
#
ifeq ($(OS),Windows_NT)
	Clear = del *.o linh.exe
	Move = move
	Exec = linh
endif

linh : ${OBJ}
	${CC} -o $@ $^
	${Move} *.o ./out/debug && ${Exec}
	
.c.o:
	${CC} -c $< -o $@

clear:
	${Clear}

redo:
	make clear
	make

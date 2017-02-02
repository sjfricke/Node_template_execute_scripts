#include <stdio.h>
#include <ctype.h>

int main(int argc, char** argv)
{
    int i = 0;
    while(argv[1][i]) {
	putchar(toupper(argv[1][i]));
	i++;
    }
    return 0;
}

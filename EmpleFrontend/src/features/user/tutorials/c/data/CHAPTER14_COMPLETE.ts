export const CHAPTER14_COMPLETE = [
  {
    instruction: "Fill in the blanks to perform a bitwise left shift on 'x' by 2 positions.",
    template: `#include <stdio.h>

int main() {
    int x = 3;
    int result = x ___ 2;
    printf("%d", result);
    return ___; 
}`,
    answer: `#include <stdio.h>

int main() {
    int x = 3;
    int result = x << 2;
    printf("%d", result);
    return 0; 
}`,
    blanks: ["<<", "0"]
  },
  {
    instruction: "Fill in the blanks to correctly extract the 1st bit (0-indexed) of 'num'.",
    template: `#include <stdio.h>

int main() {
    int num = 6; // 0110
    int bit = (num ___ 1) ___ 1;
    printf("Bit is %d", bit);
    return 0;
}`,
    answer: `#include <stdio.h>

int main() {
    int num = 6; // 0110
    int bit = (num >> 1) & 1;
    printf("Bit is %d", bit);
    return 0;
}`,
    blanks: [">>", "&"]
  }
];

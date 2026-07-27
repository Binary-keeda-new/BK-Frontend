export const CHAPTER14_DEBUG = [
  {
    title: "Checking Even or Odd",
    instruction: "Fix the bug in the following code to correctly check if a number is odd using bitwise operators.",
    buggy: `#include <stdio.h>

int main() {
    int num = 7;
    if (num | 1) {
        printf("Odd\\n");
    } else {
        printf("Even\\n");
    }
    return 0;
}`,
    fixed: `#include <stdio.h>

int main() {
    int num = 7;
    if (num & 1) {
        printf("Odd\\n");
    } else {
        printf("Even\\n");
    }
    return 0;
}`,
    expectedOutput: "Odd",
    hints: ["To check the least significant bit, use the bitwise AND operator, not OR.", "num & 1 will be 1 for odd numbers and 0 for even numbers."]
  },
  {
    title: "Toggling a Bit",
    instruction: "Fix the bitwise operation to correctly toggle (flip) the 2nd bit (0-indexed) of the number.",
    buggy: `#include <stdio.h>

int main() {
    int num = 5; // 0101
    num = num ~ (1 << 2);
    printf("%d\\n", num);
    return 0;
}`,
    fixed: `#include <stdio.h>

int main() {
    int num = 5; // 0101
    num = num ^ (1 << 2);
    printf("%d\\n", num);
    return 0;
}`,
    expectedOutput: "1",
    hints: ["The bitwise NOT operator \`~\` is unary and does not toggle specific bits.", "Use the XOR operator \`^\` with a mask to toggle specific bits."]
  },
  {
    title: "Clearing a Bit",
    instruction: "Fix the code to successfully clear the 3rd bit of the variable 'flags'.",
    buggy: `#include <stdio.h>

int main() {
    int flags = 15; // 1111
    flags = flags & (1 << 3);
    printf("%d\\n", flags);
    return 0;
}`,
    fixed: `#include <stdio.h>

int main() {
    int flags = 15; // 1111
    flags = flags & ~(1 << 3);
    printf("%d\\n", flags);
    return 0;
}`,
    expectedOutput: "7",
    hints: ["Using \`flags & (1 << 3)\` will isolate the 3rd bit, not clear it.", "You need to AND with the inverse of the mask: \`~(1 << 3)\`."]
  }
];

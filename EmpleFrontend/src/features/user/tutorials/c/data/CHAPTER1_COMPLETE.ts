// CHAPTER1_COMPLETE.ts
export const CHAPTER1_COMPLETE = [
  {
    instructions: "Fill in the blanks to complete this basic Hello World program.",
    template: `____ <stdio.h>

int main() {
    ____("Hello, World!\\n");
    return 0;
}`,
    blanks: ["#include", "printf"],
    answer: ["#include", "printf"]
  },
  {
    instructions: "Fill in the blanks to correctly return from the main function.",
    template: `#include <stdio.h>

int main() {
    printf("Learning C!\\n");
    ____ ____;
}`,
    blanks: ["return", "0"],
    answer: ["return", "0"]
  }
];
// CHAPTER2_COMPLETE.ts
export const CHAPTER2_COMPLETE = [
  {
    instructions: "Fill in the blanks to declare an integer variable 'age' and a float variable 'height'.",
    template: `____ age = 25;
____ height = 5.9;`,
    blanks: ["int", "float"],
    answer: ["int", "float"]
  },
  {
    instructions: "Fill in the blanks to correctly print the char variable 'grade'.",
    template: `#include <stdio.h>

int main() {
    char grade = 'A';
    printf("Grade: ____\\n", ____);
    return 0;
}`,
    blanks: ["%c", "grade"],
    answer: ["%c", "grade"]
  }
];

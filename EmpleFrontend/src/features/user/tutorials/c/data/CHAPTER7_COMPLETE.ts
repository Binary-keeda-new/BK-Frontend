// CHAPTER7_COMPLETE.ts
export const CHAPTER7_COMPLETE = [
  {
    instructions: "Fill in the blanks to define a function named 'multiply' that takes two integers and returns their product.",
    template: `____ multiply(int a, int b) {
    ____ a * b;
}`,
    blanks: ["int", "return"],
    answer: ["int", "return"]
  },
  {
    instructions: "Fill in the blanks to call the function 'displayScore' passing the variable 'myScore'.",
    template: `#include <stdio.h>
void displayScore(int s);

int main() {
    int myScore = 100;
    ____(____);
    return 0;
}`,
    blanks: ["displayScore", "myScore"],
    answer: ["displayScore", "myScore"]
  }
];

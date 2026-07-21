export const CHAPTER2_COMPLETE = [
  {
    instruction: "Complete the C code to find the Base-2 logarithm of a number 'x'.",
    template: `#include <stdio.h>
#include <math.h>

int main() {
    double x = 16.0;
    // The function for log base 2 in the math library is log2()
    double result = ________(x);
    printf("Result is %.2f", result);
    return 0;
}`,
    answer: "log2",
    blanks: ["log2"]
  },
  {
    instruction: "Complete the code to round down a decimal number to the nearest integer.",
    template: `#include <math.h>

int roundDown(double value) {
    // Use the mathematical function that always rounds down
    return (int)________(value);
}`,
    answer: "floor",
    blanks: ["floor"]
  }
];
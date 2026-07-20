export const CHAPTER2_DEBUG = [
  {
    instructions: "Fix this C code that attempts to calculate the ceiling of an array's midpoint. It keeps giving the wrong answer because it uses integer division before applying the ceiling function.",
    buggy: `#include <math.h>

int getMidpointCeil(int length) {
    // Bug: Integer division happens FIRST, so length/2 truncates the decimal
    // before ceil() even sees it! (e.g. 7/2 = 3. ceil(3) = 3.0 instead of 4.0)
    double mid = ceil(length / 2);
    return (int)mid;
}`,
    fixed: `#include <math.h>

int getMidpointCeil(int length) {
    // Fix: Force floating point division by using 2.0
    double mid = ceil(length / 2.0);
    return (int)mid;
}`,
    hints: [
      "In C, an int divided by an int results in an int.",
      "If you divide 7 / 2, the result is 3, not 3.5.",
      "Change '2' to '2.0' to force floating point division."
    ],
    expectedOutput: "The ceiling calculates correctly for odd array lengths."
  },
  {
    instructions: "Fix this code attempting to calculate 2^N. It's using the XOR operator instead of the power function or bitwise shift.",
    buggy: `#include <stdio.h>
#include <math.h>

int calculateTwoPowerN(int n) {
    // Bug: In C, ^ is the Bitwise XOR operator, NOT the power operator!
    int result = 2 ^ n;
    return result;
}`,
    fixed: `#include <stdio.h>
#include <math.h>

int calculateTwoPowerN(int n) {
    // Fix: Use the pow() function or bitwise left shift (1 << n)
    int result = (int)pow(2, n);
    // Alternatively: return 1 << n;
    return result;
}`,
    hints: [
      "What does the ^ operator do in C/C++?",
      "The ^ symbol means XOR (exclusive OR) in most C-like languages.",
      "Use the math library function pow(base, exponent) or a bitwise left shift."
    ],
    expectedOutput: "Code correctly outputs the power of two."
  },
  {
    instructions: "This algorithm tries to find the sum of an arithmetic series 1 + 2 + ... + n using the formula n(n+1)/2. However, it can cause an integer overflow bug for large N. Fix it.",
    buggy: `long long sumArithmetic(int n) {
    // Bug: n * (n+1) can overflow a 32-bit int BEFORE being cast to long long
    long long sum = (n * (n + 1)) / 2;
    return sum;
}`,
    fixed: `long long sumArithmetic(int n) {
    // Fix: Cast 'n' to long long BEFORE the multiplication
    long long sum = ((long long)n * (n + 1)) / 2;
    return sum;
}`,
    hints: [
      "When is the type cast happening? Before or after the multiplication?",
      "The expression (n * (n+1)) is evaluated as a 32-bit integer first.",
      "Cast 'n' to a (long long) before multiplying to force 64-bit arithmetic."
    ],
    expectedOutput: "Handles large values of N without overflowing."
  }
];
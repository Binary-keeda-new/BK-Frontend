export const CHAPTER2_CONTENT = {
  title: "Mathematical Foundations",
  description: "An overview of the mathematical groundwork necessary for algorithm analysis. We will dive into fundamental number systems, powers, exponents, and logarithms, which frequently appear in complexity calculations. Additionally, you will master the concepts of floor and ceiling functions, which are critical when dealing with fractional steps in divide-and-conquer recurrences.",
  points: [
    {
      heading: "Number systems",
      body: "Number systems form the foundation of how computers represent and manipulate data. The most common systems are:\n\n- **Decimal (Base 10):** Human-readable, uses digits 0-9.\n- **Binary (Base 2):** Computer-native, uses bits 0 and 1. All algorithms eventually compile down to binary operations.\n- **Hexadecimal (Base 16):** Used extensively in memory addressing, uses 0-9 and A-F.\n\nUnderstanding how to convert between these systems is essential for tasks like bitwise manipulation and understanding memory constraints."
    },
    {
      heading: "Powers and exponents",
      body: "Exponents denote repeated multiplication. In algorithm analysis, powers of 2 are particularly prevalent due to the binary nature of computers. \n\nKey rules:\n- $x^a \\cdot x^b = x^{a+b}$\n- $\\frac{x^a}{x^b} = x^{a-b}$\n- $(x^a)^b = x^{ab}$\n\nIn algorithm analysis, we frequently see expressions like $2^n$ denoting exponential time complexity, which indicates that the problem size doubles with every added element."
    },
    {
      heading: "Logarithms",
      body: "A logarithm is the inverse operation to exponentiation. It answers the question: 'To what power must the base be raised, to produce a given number?'\n\nIn computer science, unless otherwise specified, $\\log(n)$ usually means $\\log_2(n)$ (base 2). Logarithms appear frequently in the time complexity of divide-and-conquer algorithms, such as Binary Search and Merge Sort. For example, a time complexity of $O(\\log n)$ means the algorithm effectively halves the search space at each step."
    },
    {
      heading: "Floor and Ceiling",
      body: "When dealing with real numbers in discrete algorithms (like dividing an array in half), we use floor and ceiling functions to ensure we get integer indices.\n\n- **Floor ( $\\lfloor x \\rfloor$ ):** Returns the greatest integer less than or equal to $x$. Example: $\\lfloor 3.7 \\rfloor = 3$.\n- **Ceiling ( $\\lceil x \\rceil$ ):** Returns the smallest integer greater than or equal to $x$. Example: $\\lceil 3.2 \\rceil = 4$.\n\nThese are crucial in recurrences, such as $T(n) = T(\\lfloor n/2 \\rfloor) + 1$ for binary search."
    }
  ],
  codeDescription: "Demonstrating Core Mathematical Operations",
  code: `// --- Mathematical Foundations in Algorithms ---
#include <stdio.h>
#include <math.h>

int main() {
    /* 
     * 1. FLOOR AND CEILING
     * These are essential when dealing with fractional indices, 
     * like dividing an array of length 7 in half (7/2 = 3.5).
     * You cannot have an index of 3.5, so we use floor or ceil!
     */
    double n = 7.0 / 2.0; // 3.5
    
    // floor() rounds DOWN to the nearest whole number (3)
    printf("Floor of %.1f is: %.0f\\n", n, floor(n));
    
    // ceil() rounds UP to the nearest whole number (4)
    printf("Ceiling of %.1f is: %.0f\\n", n, ceil(n));
    
    
    /*
     * 2. LOGARITHMS
     * Logarithms measure how many times you can divide a number by the base.
     * In Computer Science, we mostly care about Base-2 Logarithm (log2).
     * Why? Because algorithms like Binary Search repeatedly divide the data by 2.
     */
    double data_size = 1024.0;
    
    // log2(1024) = 10, meaning a Binary Search on 1024 items takes at most 10 steps!
    printf("Base-2 Log of %.0f is: %.0f\\n", data_size, log2(data_size));
    
    return 0;
}`
};
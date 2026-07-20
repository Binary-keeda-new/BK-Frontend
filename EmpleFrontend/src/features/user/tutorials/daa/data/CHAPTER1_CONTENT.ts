export const CHAPTER1_CONTENT = {
  title: "Introduction to Algorithms",
  description: "A comprehensive introduction to algorithms. You will learn the formal definition of an algorithm, its key characteristics, and how to prove its correctness. We will explore core algorithm design principles, learn how to express logic using pseudocode and flowcharts, and understand the crucial concepts of algorithm performance measurement and the time vs space trade-off.",
  points: [
    {
      heading: "What is an algorithm?",
      body: "An algorithm is a step-by-step procedure or a set of rules used for problem-solving and computation. It is an unambiguous specification of how to solve a class of problems. Algorithms can perform calculation, data processing, and automated reasoning tasks. In computer science, an algorithm is essentially a recipe that describes the exact steps needed for the computer to solve a problem or reach a goal."
    },
    {
      heading: "Characteristics of an algorithm",
      body: "A well-defined algorithm must possess several key characteristics:\n\n1. **Clear and Unambiguous:** Each step must be clear and lead to only one meaning.\n2. **Well-Defined Inputs:** If an algorithm requires inputs, they should be well-defined.\n3. **Well-Defined Outputs:** The algorithm must clearly define what output will be produced and well-defined.\n4. **Finiteness:** The algorithm must terminate after a finite number of steps.\n5. **Feasibility:** The steps must be practical and capable of being carried out with available resources.\n6. **Language Independent:** The algorithm should be plain instructions that can be implemented in any programming language."
    },
    {
      heading: "Correctness of algorithms",
      body: "An algorithm is considered correct if, for every valid input, it halts and produces the desired output. Proving correctness often involves rigorous mathematical techniques such as loop invariants (to prove that a loop performs the desired action) and mathematical induction (to prove recursive algorithms). If an algorithm produces an incorrect answer or fails to halt for even a single valid input, it is incorrect."
    },
    {
      heading: "Algorithm design principles",
      body: "Algorithm design involves strategies and paradigms to construct efficient solutions. Common principles include:\n\n- **Divide and Conquer:** Breaking a problem into smaller sub-problems, solving them, and combining the results.\n- **Greedy Strategy:** Making the locally optimal choice at each step with the hope of finding a global optimum.\n- **Dynamic Programming:** Breaking down problems into overlapping subproblems and storing the results of subproblems to avoid redundant computation.\n- **Backtracking:** Incrementally building candidates for solutions, and abandoning a candidate as soon as it determines that it cannot lead to a valid solution."
    },
    {
      heading: "Pseudocode",
      body: "Pseudocode is an informal high-level description of the operating principle of a computer program or algorithm. It uses the structural conventions of a normal programming language, but is intended for human reading rather than machine reading. It omits details that are essential for machine understanding, such as variable declarations and system-specific code, making it easier to understand the core logic.\n\nExample:\n```text\nAlgorithm FindMax(A, B)\n  If A > B Then\n    Return A\n  Else\n    Return B\n```"
    },
    {
      heading: "Flowcharts",
      body: "A flowchart is a visual representation of an algorithm. It uses different shapes to denote different types of instructions and arrows to define the flow of control.\n\n- **Ovals** indicate the start and end of the algorithm.\n- **Parallelograms** denote input and output operations.\n- **Rectangles** represent processing steps (like mathematical operations).\n- **Diamonds** are used for decision-making (conditional statements)."
    },
    {
      heading: "Measuring algorithm performance",
      body: "Performance measurement of an algorithm is crucial for comparing different solutions to the same problem. We primarily measure two factors:\n\n1. **Time Complexity:** The amount of time an algorithm takes to complete as a function of the length of the input. We are usually interested in the worst-case scenario (longest possible running time).\n2. **Space Complexity:** The amount of memory an algorithm requires during its execution, also measured as a function of the input size."
    },
    {
      heading: "Time vs Space trade-off",
      body: "In computer science, a space-time or time-memory tradeoff is a situation where the memory use can be reduced at the cost of slower program execution, or, conversely, the computation time can be reduced at the cost of increased memory use.\n\nFor example, using a hash table to store precomputed values (Memoization) uses extra memory (space) but drastically reduces the time needed to compute values on the fly. Choosing between time and space depends heavily on the specific constraints of the system you are developing for."
    }
  ],
  codeDescription: "A Simple Algorithm: Sum of N numbers",
  code: `// --- Anatomy of a Simple Algorithm ---
#include <stdio.h>

/*
 * ALGORITHM: Find the sum of first 'n' natural numbers
 * This demonstrates the fundamental characteristics of an algorithm:
 * 1. Well-Defined Input: An integer 'n'
 * 2. Well-Defined Output: The total sum
 * 3. Finiteness: The loop runs exactly 'n' times and stops
 */
int calculateSum(int n) {
    int sum = 0; // Initialize an accumulator variable
    
    // Iterate 'n' times, adding the current number to the sum
    for (int i = 1; i <= n; i++) {
        sum += i; // The core computational step
    }
    
    return sum; // Return the well-defined output
}

int main() {
    int n = 5;
    int total = calculateSum(n);
    printf("The sum of the first %d numbers is: %d\\n", n, total);
    
    return 0;
}`
};
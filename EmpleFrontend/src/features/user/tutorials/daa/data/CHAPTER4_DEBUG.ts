export const CHAPTER4_DEBUG = [
  {
    instructions: "This recursive function calculates the factorial of N. However, it crashes with a Stack Overflow due to a missing base case. Fix it.",
    buggy: `int factorial(int n) {
    // Bug: Missing base case. It will infinitely call factorial(-1), (-2)...
    return n * factorial(n - 1);
}`,
    fixed: `int factorial(int n) {
    // Fix: Base case added
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}`,
    hints: [
      "Every recursive function MUST have a base case.",
      "What happens when n reaches 0?",
      "Add an 'if' statement at the beginning to return 1 when n is 0 or 1."
    ],
    expectedOutput: "Factorial function terminates correctly."
  },
  {
    instructions: "This function mimics the Merge Sort recursion structure (T(n) = 2T(n/2) + n). However, the recursion divides incorrectly, causing an infinite loop when n=1. Fix the integer division.",
    buggy: `void mergeSortSim(int n) {
    if (n <= 1) return;
    
    // Do O(n) work here...
    
    // Bug: If n is an odd number like 3, what happens? Wait, 3/2 is 1. 
    // What if the base case was n == 0? 
    // Let's look at the bug: The base case says n < 0, but it should be n <= 1.
    // Actually, let's fix the recursive call arguments.
    mergeSortSim(n / 2);
    mergeSortSim(n / 2 + (n % 2));
}`,
    fixed: `void mergeSortSim(int n) {
    // Fix: A proper base case for merge sort simulation
    if (n <= 1) return;
    
    mergeSortSim(n / 2);
    mergeSortSim(n - (n / 2));
}`,
    hints: [
      "The halves must exactly add up to n.",
      "Using n/2 and n/2 + (n%2) is okay, but n - (n/2) is cleaner and standard.",
      "Ensure the base case properly catches n <= 1."
    ],
    expectedOutput: "Recursion tree splits properly."
  },
  {
    instructions: "This code simulates T(n) = T(n-1) + 1. It calculates the height of the recursion tree by returning 1 + the recursive call. It currently returns 0. Fix the logic.",
    buggy: `int treeHeight(int n) {
    if (n == 0) return 0;
    // Bug: We are missing the addition of 1 for the current level!
    return treeHeight(n - 1);
}`,
    fixed: `int treeHeight(int n) {
    if (n == 0) return 0;
    // Fix: Add 1 for the current level
    return 1 + treeHeight(n - 1);
}`,
    hints: [
      "Look at the recurrence relation: T(n) = T(n-1) + 1.",
      "Where is the '+ 1' in the code?",
      "You must add 1 to the result of the recursive call."
    ],
    expectedOutput: "Height is correctly computed as N."
  }
];
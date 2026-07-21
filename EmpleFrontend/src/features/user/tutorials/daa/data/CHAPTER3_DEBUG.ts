export const CHAPTER3_DEBUG = [
  {
    instructions: "This algorithm tries to find the largest element in an array but has an O(n^2) time complexity due to a bug. Fix it to be O(n).",
    buggy: `int findMax(int arr[], int n) {
    // Bug: Comparing every element with every other element is O(n^2)
    for (int i = 0; i < n; i++) {
        bool isMax = true;
        for (int j = 0; j < n; j++) {
            if (arr[j] > arr[i]) {
                isMax = false;
                break;
            }
        }
        if (isMax) return arr[i];
    }
    return -1;
}`,
    fixed: `int findMax(int arr[], int n) {
    // Fix: Keep a running maximum to do it in O(n)
    int max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}`,
    hints: [
      "Look at the nested loops. Do you really need to compare every element with EVERY other element?",
      "You can solve this with a single pass through the array.",
      "Just maintain a 'currentMax' variable and update it as you iterate."
    ],
    expectedOutput: "Algorithm finds the maximum in O(n) time."
  },
  {
    instructions: "This code tries to execute a loop O(log n) times, but it runs infinitely. Fix the increment logic.",
    buggy: `void logNLoop(int n) {
    int i = 1;
    // Bug: We are adding 2, which makes it an O(n) loop
    // But since 'i' is initialized to 1, and we do i+2, it's actually just 
    // a slow O(n) loop. Wait, what if we want O(log n)?
    while (i < n) {
        printf("%d\\n", i);
        i = i + 2; 
    }
}`,
    fixed: `void logNLoop(int n) {
    int i = 1;
    while (i < n) {
        printf("%d\\n", i);
        i = i * 2; // Fix: Multiplying by 2 halves the remaining distance logarithmically
    }
}`,
    hints: [
      "Adding a constant to 'i' makes the loop run in O(n) time.",
      "To achieve O(log n) time, the value of 'i' needs to grow exponentially.",
      "Multiply 'i' by 2 instead of adding 2."
    ],
    expectedOutput: "The loop executes exactly floor(log2(n)) times."
  },
  {
    instructions: "This recursive Fibonacci function has O(2^n) time complexity. Fix it to have O(n) time and O(n) space using memoization (an array).",
    buggy: `int fib(int n) {
    // Bug: Standard recursion causes immense redundant recalculations
    if (n <= 1) return n;
    return fib(n-1) + fib(n-2);
}`,
    fixed: `int fib(int n) {
    // Fix: Using an array for dynamic programming gives O(n) time
    if (n <= 1) return n;
    int f[n+2];
    f[0] = 0;
    f[1] = 1;
    for (int i = 2; i <= n; i++) {
        f[i] = f[i-1] + f[i-2];
    }
    return f[n];
}`,
    hints: [
      "Recursion recalculates fib(3) multiple times.",
      "Can you store the results in an array as you calculate them from the bottom up?",
      "Use a loop and an array 'f' where f[i] = f[i-1] + f[i-2]."
    ],
    expectedOutput: "Fibonacci executes in linear time."
  }
];
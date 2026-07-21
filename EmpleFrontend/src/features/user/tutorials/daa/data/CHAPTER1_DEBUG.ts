export const CHAPTER1_DEBUG = [
  {
    instructions: "Fix the logic to calculate the sum of the first N natural numbers correctly. The algorithm currently returns an incorrect result for large numbers because it starts at the wrong value.",
    buggy: `int sumOfNaturalNumbers(int n) {
    int sum = 0;
    // Bug: loop starts at 0, which is redundant, but the real bug is it stops before 'n'
    for (int i = 0; i < n; i++) {
        sum += i;
    }
    return sum;
}`,
    fixed: `int sumOfNaturalNumbers(int n) {
    int sum = 0;
    // Fix: loop must include 'n'
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}`,
    hints: [
      "Does the loop run 'n' times?",
      "If n is 5, the loop adds 0, 1, 2, 3, 4. Is that correct?",
      "Change the loop condition to include 'n' (i <= n)."
    ],
    expectedOutput: "The sum logic correctly includes the Nth number."
  },
  {
    instructions: "This algorithm is supposed to find the maximum of two numbers, but it fails when the numbers are equal.",
    buggy: `int findMax(int a, int b) {
    if (a > b) {
        return a;
    } else if (b > a) {
        return b;
    }
    // Bug: Missing a return for when they are equal!
}`,
    fixed: `int findMax(int a, int b) {
    if (a > b) {
        return a;
    } else {
        // Fix: Handles b > a AND b == a
        return b;
    }
}`,
    hints: [
      "What happens if a and b are the exact same value?",
      "The 'else if' misses the equality case entirely, causing undefined behavior.",
      "Just use an 'else' block, since if a is not greater than b, returning b is always safe."
    ],
    expectedOutput: "Algorithm safely handles all equality edge cases."
  },
  {
    instructions: "Fix this infinite loop algorithm. It is supposed to count down from N to 1, but it never terminates.",
    buggy: `void countdown(int n) {
    int current = n;
    while (current > 0) {
        printf("%d\\n", current);
        // Bug: We forgot to modify the loop variable!
    }
}`,
    fixed: `void countdown(int n) {
    int current = n;
    while (current > 0) {
        printf("%d\\n", current);
        current--; // Fix: Decrement to ensure finiteness
    }
}`,
    hints: [
      "One of the key properties of an algorithm is 'Finiteness'.",
      "Why doesn't the while loop ever stop?",
      "You need to decrement 'current' inside the loop."
    ],
    expectedOutput: "Algorithm terminates successfully."
  }
];
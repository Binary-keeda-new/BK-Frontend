export const CHAPTER3_COMPLETE = [
  {
    instruction: "Complete the statement that defines Big-O notation mathematically.",
    template: `// f(n) = O(g(n)) if there exist positive constants c and n0 such that:
// f(n) <= c * g(n) for all n >= ________`,
    answer: "n0",
    blanks: ["n0"]
  },
  {
    instruction: "Complete the inner loop condition to make this an O(n^2) algorithm.",
    template: `void printPairs(int n) {
    for (int i = 0; i < n; i++) {
        // Inner loop runs n times for every outer loop iteration
        for (int j = 0; j < ________; j++) {
            printf("%d, %d", i, j);
        }
    }
}`,
    answer: "n",
    blanks: ["n"]
  }
];
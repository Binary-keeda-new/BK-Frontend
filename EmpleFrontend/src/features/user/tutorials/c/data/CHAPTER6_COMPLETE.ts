// CHAPTER6_COMPLETE.ts
export const CHAPTER6_COMPLETE = [
  {
    instructions: "Fill in the blanks to write a for loop that iterates exactly 5 times, printing 1 to 5.",
    template: `____ (int i = 1; i ____ 5; i++) {
    printf("%d ", i);
}`,
    blanks: ["for", "<="],
    answer: ["for", "<="]
  },
  {
    instructions: "Fill in the blanks to correctly implement a do-while loop.",
    template: `int count = 0;
____ {
    printf("Count: %d\\n", count);
    count++;
} ____ (count < 3)____`,
    blanks: ["do", "while", ";"],
    answer: ["do", "while", ";"]
  }
];

// CHAPTER5_COMPLETE.ts
export const CHAPTER5_COMPLETE = [
  {
    instructions: "Fill in the blanks to check if 'score' is a passing grade (50 or more).",
    template: `int score = 75;
if (score ____ 50) {
    printf("Passed!");
} ____ {
    printf("Failed.");
}`,
    blanks: [">=", "else"],
    answer: [">=", "else"]
  },
  {
    instructions: "Fill in the blanks to write a switch statement that prints 'One' when val is 1.",
    template: `int val = 1;
____ (val) {
    ____ 1: 
        printf("One");
        ____;
}`,
    blanks: ["switch", "case", "break"],
    answer: ["switch", "case", "break"]
  }
];

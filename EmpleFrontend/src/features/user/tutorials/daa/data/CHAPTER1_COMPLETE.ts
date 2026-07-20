export const CHAPTER1_COMPLETE = [
  {
    instruction: "Complete the algorithm to swap two variables without using a third variable.",
    template: `void swap(int *a, int *b) {
    *a = *a + *b;
    *b = ________;
    *a = *a - *b;
}`,
    answer: "*a - *b",
    blanks: ["*a - *b"]
  },
  {
    instruction: "Complete the basic algorithm that checks if a number is even.",
    template: `bool isEven(int num) {
    // If the remainder when divided by 2 is 0
    if (num ________ 2 == 0) {
        return true;
    }
    return false;
}`,
    answer: "%",
    blanks: ["%"]
  }
];
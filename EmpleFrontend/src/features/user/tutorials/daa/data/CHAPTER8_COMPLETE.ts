export const CHAPTER8_COMPLETE = [
  {
    instruction: "Complete the signature for a function pointer that compares two integers (commonly used in qsort).",
    template: `// The comparison function must return an int 
// and take two const void pointers as arguments.
int compare(________ a, ________ b) {
    int int_a = *( (int*) a );
    int int_b = *( (int*) b );
    return (int_a - int_b);
}`,
    answer: "const void*",
    blanks: ["const void*", "const void*"]
  },
  {
    instruction: "Complete the definition of algorithmic stability.",
    template: `// A sorting algorithm is stable if:
// Given arr[i] == arr[j] and i < j in the input,
// after sorting, arr[i] will ________ arr[j] in the output array.`,
    answer: "precede",
    blanks: ["precede|come before|appear before"]
  }
];
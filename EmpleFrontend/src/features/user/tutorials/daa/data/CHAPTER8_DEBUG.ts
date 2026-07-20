export const CHAPTER8_DEBUG = [
  {
    instructions: "This utility function attempts to swap two integer pointers. It crashes with a segfault. Fix it.",
    buggy: `void swap(int *a, int *b) {
    // Bug: Dereferencing without checking, or swapped incorrectly
    int temp = a;
    a = b;
    b = temp;
}`,
    fixed: `void swap(int *a, int *b) {
    // Fix: Dereference the pointers to swap the values
    int temp = *a;
    *a = *b;
    *b = temp;
}`,
    hints: [
      "In C, swapping pointers themselves does not change the actual data in the array.",
      "You need to access the VALUE at the memory address.",
      "Use the dereference operator (*)."
    ],
    expectedOutput: "The values in the array are successfully swapped in memory."
  },
  {
    instructions: "This simple print array function loops infinitely. Fix the bug.",
    buggy: `void printArray(int arr[], int n) {
    int i = 0;
    while (i < n) {
        printf("%d ", arr[i]);
        // Bug: Loop control variable never updates
    }
    printf("\\n");
}`,
    fixed: `void printArray(int arr[], int n) {
    int i = 0;
    while (i < n) {
        printf("%d ", arr[i]);
        // Fix: Increment i
        i++;
    }
    printf("\\n");
}`,
    hints: [
      "Look at the while loop condition.",
      "Is 'i' ever changing?",
      "Add i++ inside the loop."
    ],
    expectedOutput: "Prints the array and terminates."
  },
  {
    instructions: "This function checks if an array is sorted. It throws an array out of bounds error. Fix it.",
    buggy: `int isSorted(int arr[], int n) {
    for (int i = 0; i <= n; i++) {
        // Bug: Accesses arr[n] which is out of bounds
        if (arr[i] > arr[i+1]) {
            return 0; // Not sorted
        }
    }
    return 1; // Sorted
}`,
    fixed: `int isSorted(int arr[], int n) {
    // Fix: Loop until i < n - 1
    for (int i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i+1]) {
            return 0; // Not sorted
        }
    }
    return 1; // Sorted
}`,
    hints: [
      "If the array length is 'n', the last valid index is 'n-1'.",
      "What happens when 'i' is 'n-1' and you check arr[i+1]?",
      "You check arr[n], which is out of bounds. The loop must stop before the last element."
    ],
    expectedOutput: "Correctly evaluates array sorting without segfaults."
  }
];
export const CHAPTER9_DEBUG = [
  {
    instructions: "This Bubble Sort implementation is missing the logic to 'swap' adjacent elements. Complete it.",
    buggy: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Bug: Swapping logic is missing or incorrect
                arr[j] = arr[j+1];
                arr[j+1] = arr[j];
            }
        }
    }
}`,
    fixed: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // Fix: Use a temporary variable to swap
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}`,
    hints: [
      "Look at how the values are assigned.",
      "By doing arr[j] = arr[j+1], you overwrite arr[j] before saving it!",
      "You must store arr[j] in a 'temp' variable first."
    ],
    expectedOutput: "The array is correctly sorted in ascending order."
  },
  {
    instructions: "This optimized Bubble Sort never terminates early because the 'swapped' flag is implemented incorrectly. Fix it.",
    buggy: `void bubbleSortOpt(int arr[], int n) {
    int swapped;
    for (int i = 0; i < n - 1; i++) {
        swapped = 1; // Bug: Initializes to true (1)
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                swapped = 1;
            }
        }
        if (swapped == 0) break;
    }
}`,
    fixed: `void bubbleSortOpt(int arr[], int n) {
    int swapped;
    for (int i = 0; i < n - 1; i++) {
        swapped = 0; // Fix: Must initialize to false (0) at start of pass
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                swapped = 1;
            }
        }
        // If no two elements were swapped by inner loop, then break
        if (swapped == 0) break;
    }
}`,
    hints: [
      "We want to break the loop if NO swaps occurred.",
      "But 'swapped' is initialized to 1 before the inner loop.",
      "Initialize 'swapped' to 0. If a swap happens, it becomes 1."
    ],
    expectedOutput: "Terminates in O(n) time for already sorted arrays."
  },
  {
    instructions: "This Bubble Sort tries to optimize the inner loop boundary but gets the math wrong, causing out-of-bounds access.",
    buggy: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        // Bug: Loop condition j < n is wrong. 
        // arr[j+1] will access arr[n], which is out of bounds!
        for (int j = 0; j < n; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}`,
    fixed: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        // Fix: Inner loop goes up to n - i - 1
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}`,
    hints: [
      "If j goes up to n - 1, then arr[j+1] accesses arr[n].",
      "Also, after 'i' passes, the last 'i' elements are already sorted.",
      "The correct bound is n - i - 1."
    ],
    expectedOutput: "Sorts the array safely without segfaulting."
  }
];
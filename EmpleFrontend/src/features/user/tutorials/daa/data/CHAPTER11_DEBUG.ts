export const CHAPTER11_DEBUG = [
  {
    instructions: "This Insertion Sort shifts elements in the wrong direction, overwriting data. Fix it.",
    buggy: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            // Bug: Shifting the wrong way! Overwrites arr[j]
            arr[j] = arr[j + 1];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
    fixed: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            // Fix: Shift elements to the right to make room
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
    hints: [
      "When we find an element arr[j] that is larger than the key, we need to make space for the key.",
      "We do this by shifting the larger element ONE POSITION TO THE RIGHT.",
      "Change arr[j] = arr[j + 1] to arr[j + 1] = arr[j]."
    ],
    expectedOutput: "The array sorts correctly without losing data."
  },
  {
    instructions: "This Insertion Sort throws an array index out of bounds error because of the while loop condition. Fix it.",
    buggy: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        // Bug: Evaluates arr[j] BEFORE checking if j >= 0
        while (arr[j] > key && j >= 0) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
    fixed: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        // Fix: Use short-circuit evaluation! Check j >= 0 FIRST.
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
    hints: [
      "In C, logical AND (&&) uses short-circuit evaluation from left to right.",
      "If 'j' becomes -1, evaluating 'arr[j] > key' causes a segfault!",
      "Put the bounds check 'j >= 0' before the array access."
    ],
    expectedOutput: "The loop terminates safely when it reaches the beginning of the array."
  },
  {
    instructions: "This Insertion Sort is unstable because it shifts elements that are EQUAL to the key. Fix the logic.",
    buggy: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        // Bug: Shifts if arr[j] is >= key, breaking stability
        while (j >= 0 && arr[j] >= key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
    fixed: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        // Fix: Only shift if strictly greater than
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
    hints: [
      "Stability means equal elements retain their original relative order.",
      "If we shift an element that is EQUAL to the key, the key will end up placed BEFORE it.",
      "Remove the '=' from the 'arr[j] >= key' comparison."
    ],
    expectedOutput: "Maintains stability by not swapping equal elements."
  }
];
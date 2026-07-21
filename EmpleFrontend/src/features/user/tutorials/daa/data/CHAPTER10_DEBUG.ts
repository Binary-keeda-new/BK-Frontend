export const CHAPTER10_DEBUG = [
  {
    instructions: "This Selection Sort fails to find the correct minimum index. Fix it.",
    buggy: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            // Bug: Checking the wrong thing!
            if (arr[j] > arr[min_idx]) {
                min_idx = j;
            }
        }
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`,
    fixed: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            // Fix: Check for strictly less than
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`,
    hints: [
      "Selection Sort should find the MINIMUM element.",
      "Look at the condition: arr[j] > arr[min_idx].",
      "That finds the MAXIMUM element! Change it to '<'."
    ],
    expectedOutput: "The array is correctly sorted in ascending order."
  },
  {
    instructions: "This Selection Sort swaps elements incorrectly, overwriting values.",
    buggy: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        // Bug: Incorrect swap logic
        arr[i] = arr[min_idx];
        arr[min_idx] = arr[i];
    }
}`,
    fixed: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        // Fix: Use a temp variable
        if(min_idx != i) {
            int temp = arr[i];
            arr[i] = arr[min_idx];
            arr[min_idx] = temp;
        }
    }
}`,
    hints: [
      "Look at how the swap is performed at the end of the outer loop.",
      "arr[i] is overwritten with arr[min_idx], but its original value is lost!",
      "Use a 'temp' integer variable to hold the value before overwriting."
    ],
    expectedOutput: "Values are preserved and swapped successfully."
  },
  {
    instructions: "This Selection Sort goes out of bounds during the inner loop.",
    buggy: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        // Bug: j should start at i + 1
        for (int j = i; j <= n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`,
    fixed: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        // Fix: Start at i+1 and stop BEFORE n
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`,
    hints: [
      "What is the maximum valid index of an array of size 'n'?",
      "The loop goes up to 'j <= n', which checks arr[n] (out of bounds).",
      "Change it to 'j < n'. Also, starting 'j' at 'i+1' is more efficient."
    ],
    expectedOutput: "Executes without accessing invalid memory segments."
  }
];
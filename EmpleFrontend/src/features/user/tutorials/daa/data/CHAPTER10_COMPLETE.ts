export const CHAPTER10_COMPLETE = [
  {
    instruction: "Complete the inner loop condition to scan the unsorted portion.",
    template: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        // We only scan the elements AFTER the currently sorted portion
        for (int j = ________; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        // swap...
    }
}`,
    answer: "i + 1",
    blanks: ["i + 1", "i+1"]
  },
  {
    instruction: "Complete the condition inside the inner loop to find the minimum element.",
    template: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            // Update min_idx if a smaller element is found
            if (arr[j] ________ arr[min_idx]) {
                min_idx = j;
            }
        }
        // swap...
    }
}`,
    answer: "<",
    blanks: ["<"]
  }
];
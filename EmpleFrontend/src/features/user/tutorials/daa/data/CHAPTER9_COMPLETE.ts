export const CHAPTER9_COMPLETE = [
  {
    instruction: "Complete the inner loop condition for Bubble Sort.",
    template: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        // The last 'i' elements are already in place
        for (int j = 0; j < ________; j++) {
            if (arr[j] > arr[j + 1]) {
                // Swap logic...
            }
        }
    }
}`,
    answer: "n - i - 1",
    blanks: ["n - i - 1", "n-i-1"]
  },
  {
    instruction: "Complete the condition that triggers a swap in ascending Bubble Sort.",
    template: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            // Check if they are out of order
            if (arr[j] ________ arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}`,
    answer: ">",
    blanks: [">"]
  }
];
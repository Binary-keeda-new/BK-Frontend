export const CHAPTER11_COMPLETE = [
  {
    instruction: "Complete the statement to shift an element to the right.",
    template: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            // Shift the element at j one position to the right
            arr[________] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
    answer: "j + 1",
    blanks: ["j + 1", "j+1"]
  },
  {
    instruction: "Complete the statement to insert the 'key' into its final found position.",
    template: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        // Insert the key
        arr[________] = key;
    }
}`,
    answer: "j + 1",
    blanks: ["j + 1", "j+1"]
  }
];
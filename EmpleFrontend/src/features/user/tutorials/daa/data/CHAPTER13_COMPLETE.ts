export const CHAPTER13_COMPLETE = [
  {
    instruction: "Complete the base case condition for the recursive quickSort function.",
    template: `void quickSort(int arr[], int low, int high) {
    // Only sort if there is more than one element
    if (low ________ high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
    answer: "<",
    blanks: ["<"]
  },
  {
    instruction: "Complete the swap statement to place the pivot in its final position in Lomuto's partition.",
    template: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    // Place the pivot in its correct position
    swap(&arr[________], &arr[high]);
    return (i + 1);
}`,
    answer: "i + 1",
    blanks: ["i + 1", "i+1"]
  }
];
export const CHAPTER13_DEBUG = [
  {
    instructions: "This partition function (Lomuto scheme) fails to place the pivot correctly at the end. Fix it.",
    buggy: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    // Bug: The pivot is left at arr[high]. It needs to be moved to its rightful place.
    return (i + 1);
}`,
    fixed: `int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    // Fix: Swap the pivot element with the element at i + 1
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}`,
    hints: [
      "The loop successfully groups all elements smaller than the pivot to the left.",
      "But the pivot itself (arr[high]) is never moved!",
      "You must swap arr[i + 1] and arr[high]."
    ],
    expectedOutput: "The pivot is correctly placed in its final sorted position."
  },
  {
    instructions: "This quickSort function enters an infinite recursion loop due to wrong partition indexing. Fix it.",
    buggy: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        
        // Bug: Includes the pivot in both recursive calls!
        quickSort(arr, low, pi);
        quickSort(arr, pi, high);
    }
}`,
    fixed: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        
        // Fix: Exclude the pivot (pi) from the recursive calls
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
    hints: [
      "The partition function places the pivot exactly in its FINAL, correct position.",
      "Does the pivot need to be sorted again?",
      "No! The left half should end at pi - 1, and the right half should start at pi + 1."
    ],
    expectedOutput: "Recursion terminates and the array is sorted correctly."
  },
  {
    instructions: "This function is meant to pick a random pivot to avoid O(n^2) worst case, but the random index is calculated incorrectly.",
    buggy: `int randomPartition(int arr[], int low, int high) {
    // Bug: rand() % high could be smaller than 'low', or out of bounds
    int random = rand() % high;
    
    swap(&arr[random], &arr[high]);
    return partition(arr, low, high);
}`,
    fixed: `int randomPartition(int arr[], int low, int high) {
    // Fix: Calculate a random index strictly between low and high (inclusive)
    int random = low + rand() % (high - low + 1);
    
    swap(&arr[random], &arr[high]);
    return partition(arr, low, high);
}`,
    hints: [
      "rand() % high only gives a number between 0 and high-1.",
      "What if 'low' is 5 and 'high' is 10? rand() % 10 could give 2 (out of bounds for this sub-array).",
      "You need an offset: low + (rand() % (range))."
    ],
    expectedOutput: "Safely picks a valid random pivot within the sub-array bounds."
  }
];
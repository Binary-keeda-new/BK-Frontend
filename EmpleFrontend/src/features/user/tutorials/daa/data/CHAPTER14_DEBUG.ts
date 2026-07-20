export const CHAPTER14_DEBUG = [
  {
    instructions: "This heapify function fails to maintain the Max-Heap property. Find the logical error.",
    buggy: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;

    // Bug: It's checking if the left child is LESS than the parent
    if (l < n && arr[l] < arr[largest])
        largest = l;

    if (r < n && arr[r] < arr[largest])
        largest = r;

    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}`,
    fixed: `void heapify(int arr[], int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;

    // Fix: We need a MAX-heap, so we check if the child is GREATER than the parent
    if (l < n && arr[l] > arr[largest])
        largest = l;

    if (r < n && arr[r] > arr[largest])
        largest = r;

    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}`,
    hints: [
      "For a Max-Heap, the parent node must be LARGER than its children.",
      "Look at the comparisons: arr[l] < arr[largest]. This is building a Min-Heap!",
      "Change the '<' signs to '>' to find the largest element."
    ],
    expectedOutput: "Successfully sifts down elements to maintain the Max-Heap property."
  },
  {
    instructions: "This heapSort function builds the heap incorrectly by iterating in the wrong direction.",
    buggy: `void heapSort(int arr[], int n) {
    // Bug: Building the heap from top to bottom (0 to n)
    for (int i = 0; i < n / 2; i++)
        heapify(arr, n, i);

    for (int i = n - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        heapify(arr, i, 0);
    }
}`,
    fixed: `void heapSort(int arr[], int n) {
    // Fix: Build the heap from bottom to top (n/2 - 1 down to 0)
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    for (int i = n - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        heapify(arr, i, 0);
    }
}`,
    hints: [
      "To build a heap in O(n) time, you must start from the LAST non-leaf node and move backwards to the root.",
      "The last non-leaf node is at index n/2 - 1.",
      "Change the loop to start at n/2 - 1 and decrement down to 0."
    ],
    expectedOutput: "The array is correctly sorted using Heap Sort."
  },
  {
    instructions: "This heapSort function fails to exclude the extracted maximum element from the next heapify step.",
    buggy: `void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    for (int i = n - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        // Bug: Passes 'n' as the size instead of the shrinking size 'i'
        heapify(arr, n, 0);
    }
}`,
    fixed: `void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);

    for (int i = n - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        // Fix: Pass 'i' so the sorted elements at the end are ignored
        heapify(arr, i, 0);
    }
}`,
    hints: [
      "In Heap Sort, we swap the root (max element) with the last element of the heap.",
      "That max element is now sorted, so the active 'heap size' shrinks by 1.",
      "Look at what size is being passed into heapify inside the second loop."
    ],
    expectedOutput: "The heap size shrinks correctly, and the array becomes sorted."
  }
];
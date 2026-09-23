export const CHAPTER14_DEBUG = [
  {
    instructions: "Fix the heapify function to correctly identify the largest node among parent and children.",
    buggy: "void heapify(int arr[], int n, int i) {\n    int largest = i;\n    int l = 2*i + 1;\n    int r = 2*i + 2;\n    if (l < n && arr[l] > arr[i]) largest = l;\n    if (r < n && arr[r] > arr[i]) largest = r;\n    if (largest != i) {\n        swap(&arr[i], &arr[largest]);\n        heapify(arr, n, largest);\n    }\n}",
    fixed: "void heapify(int arr[], int n, int i) {\n    int largest = i;\n    int l = 2*i + 1;\n    int r = 2*i + 2;\n    if (l < n && arr[l] > arr[largest]) largest = l;\n    if (r < n && arr[r] > arr[largest]) largest = r;\n    if (largest != i) {\n        swap(&arr[i], &arr[largest]);\n        heapify(arr, n, largest);\n    }\n}",
    hints: ["You are comparing the children against the ORIGINAL parent 'i'.", "You should compare the right child against the 'largest' found so far!"],
    expectedOutput: "Max-heap property restored correctly."
  },
  {
    instructions: "Correct the 'build_heap' loop bound.",
    buggy: "void build_heap(int arr[], int n) {\n    for (int i = n; i >= 0; i--) {\n        heapify(arr, n, i);\n    }\n}",
    fixed: "void build_heap(int arr[], int n) {\n    for (int i = n / 2 - 1; i >= 0; i--) {\n        heapify(arr, n, i);\n    }\n}",
    hints: ["Leaves of a binary heap don't need to be heapified.", "Start from the last non-leaf node, which is at index (n/2) - 1."],
    expectedOutput: "Heap built optimally in O(n) time."
  },
  {
    instructions: "Fix the extraction phase of Heap Sort.",
    buggy: "void heap_sort(int arr[], int n) {\n    build_heap(arr, n);\n    for (int i = n - 1; i >= 0; i--) {\n        swap(&arr[0], &arr[i]);\n        heapify(arr, n, 0);\n    }\n}",
    fixed: "void heap_sort(int arr[], int n) {\n    build_heap(arr, n);\n    for (int i = n - 1; i >= 0; i--) {\n        swap(&arr[0], &arr[i]);\n        heapify(arr, i, 0);\n    }\n}",
    hints: ["When you call heapify in the extraction loop, you must reduce the heap size.", "Pass 'i' as the current heap size, not 'n'."],
    expectedOutput: "Array sorted correctly in-place."
  }
];
export const CHAPTER14_CONTENT = {
  title: "Heap Sort",
  description: "An explanation of Heap Sort, which leverages the Heap data structure to achieve an optimal O(n log n) time complexity while remaining strictly in-place. You will learn about Max Heaps, Min Heaps, the 'Heapify' process, and how the algorithm systematically extracts the largest element to build a sorted array.",
  points: [
    {
      heading: "Binary Heap",
      body: "A Binary Heap is a complete binary tree that satisfies the heap property. \n- **Max-Heap:** The value of every parent node is greater than or equal to the values of its children. The largest element is at the root.\n- **Min-Heap:** The value of every parent node is less than or equal to its children. The smallest element is at the root.\nIn Heap Sort, we typically use an array to represent this tree where for index $i$, the left child is $2i+1$ and the right child is $2i+2$."
    },
    {
      heading: "Heapify",
      body: "`Heapify` is a procedure to maintain the heap property. If a node violates the max-heap property (i.e., it is smaller than its children), `heapify` swaps it with its largest child, pushing the smaller element down the tree. It then recursively calls itself on the affected sub-tree. The time complexity of `heapify` on a single node is $O(\\log n)$."
    },
    {
      heading: "Build Heap",
      body: "Before we can sort, we must convert the unsorted array into a Max-Heap. We do this by running `heapify` starting from the last non-leaf node (index $n/2 - 1$) all the way up to the root. Surprisingly, a tight mathematical analysis shows that building a heap from an unsorted array takes $O(n)$ time, not $O(n \\log n)$."
    },
    {
      heading: "Heap Sort Algorithm",
      body: "Once the Max-Heap is built:\n1. The largest element is at the root (`arr[0]`).\n2. Swap the root with the last element of the heap. Now the largest element is in its final sorted position.\n3. Reduce the heap size by 1 (ignoring the sorted element).\n4. Call `heapify` on the new root to restore the max-heap property.\n5. Repeat steps 2-4 until the heap size is 1."
    },
    {
      heading: "Complexity",
      body: "- **Time Complexity (Best, Worst, Average):** $O(n \\log n)$. Building the heap takes $O(n)$, and extracting the maximum element $n$ times takes $O(n \\log n)$. The performance is completely consistent.\n- **Space Complexity:** $O(1)$. Heap sort is an entirely **in-place** sorting algorithm."
    },
    {
      heading: "Comparison with Quick Sort",
      body: "While both Heap Sort and Quick Sort are in-place algorithms, Quick Sort is typically faster in practice due to better cache locality and smaller constant factors. However, Heap Sort guarantees an $O(n \\log n)$ worst-case time limit, whereas Quick Sort can degrade to $O(n^2)$. This makes Heap Sort useful in systems that require strict worst-case guarantees (like embedded systems or within the Introsort algorithm)."
    }
  ],
  code: "// Heap Sort in C\n#include <stdio.h>\n\nvoid heapify(int arr[], int n, int i) {\n    int largest = i;\n    int left = 2 * i + 1;\n    int right = 2 * i + 2;\n\n    if (left < n && arr[left] > arr[largest]) largest = left;\n    if (right < n && arr[right] > arr[largest]) largest = right;\n\n    if (largest != i) {\n        int temp = arr[i]; arr[i] = arr[largest]; arr[largest] = temp;\n        heapify(arr, n, largest);\n    }\n}\n\nvoid heapSort(int arr[], int n) {\n    // Build max heap\n    for (int i = n / 2 - 1; i >= 0; i--)\n        heapify(arr, n, i);\n\n    // Extract elements one by one\n    for (int i = n - 1; i > 0; i--) {\n        int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp;\n        heapify(arr, i, 0);\n    }\n}\n"
};
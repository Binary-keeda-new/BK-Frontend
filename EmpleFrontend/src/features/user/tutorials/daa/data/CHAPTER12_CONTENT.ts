export const CHAPTER12_CONTENT = {
  title: "Merge Sort",
  description: "Enter the world of Advanced Sorting with Merge Sort. Explore the Divide and Conquer strategy powering Merge Sort. You will learn how the array is recursively divided into halves and seamlessly merged back together. We'll deeply analyze its consistent O(n log n) time complexity, out-of-place memory footprint, and implementation details.",
  points: [
    {
      heading: "Divide and Conquer",
      body: "Merge Sort is a quintessential **Divide and Conquer** algorithm. It works by:\n1. **Divide:** Dividing the unsorted list into $n$ sublists, each containing one element (a list of one element is considered sorted).\n2. **Conquer:** Repeatedly merging sublists to produce new sorted sublists until there is only one sorted list remaining. This will be the sorted list."
    },
    {
      heading: "Merge Procedure",
      body: "The core of Merge Sort is the `merge` function. It takes two adjacent sorted subarrays and combines them into a single sorted subarray. It does this by using pointers (or indices) at the start of each subarray, comparing the elements, picking the smaller one to place in a temporary array, and advancing the pointer. Finally, any remaining elements are copied over."
    },
    {
      heading: "Recursive Tree",
      body: "Visualizing Merge Sort as a tree shows how the array is halved at each step until reaching size 1. An array of size $n$ will have a tree height of $\\log_2 n$. At each level of the tree, merging all the subarrays takes $O(n)$ time. Therefore, the total time is $O(n \\log n)$."
    },
    {
      heading: "Complexity",
      body: "- **Time Complexity (Best, Worst, Average):** $O(n \\log n)$. Merge Sort always divides the array in half and takes linear time to merge, regardless of the initial order of the elements. It is highly predictable.\n- **Space Complexity:** $O(n)$. It requires an auxiliary array of size $n$ to temporarily hold the merged elements. This makes it an **Out-of-place** sort."
    },
    {
      heading: "Stability",
      body: "Merge Sort is inherently **Stable**. When merging two subarrays, if elements are equal, the algorithm always picks the element from the left subarray first. This preserves the original relative order of duplicate elements."
    },
    {
      heading: "External Sorting",
      body: "Because of its sequential data access pattern, Merge Sort is the algorithm of choice for **External Sorting**. When data is too large to fit in RAM (e.g., stored on a hard drive or tape), pieces can be read into memory, sorted, written back out, and then merged together without requiring random access to the disk."
    },
    {
      heading: "Iterative Merge Sort",
      body: "While usually implemented recursively, Merge Sort can also be implemented iteratively (bottom-up). It starts by merging pairs of 1 element into sorted arrays of 2, then merging pairs of 2 into 4, and so on. This avoids the overhead of recursive function calls on the call stack."
    }
  ],
  code: "// Merge Sort (merge step) in C\n#include <stdio.h>\n#include <stdlib.h>\n\nvoid merge(int arr[], int l, int m, int r) {\n    int i, j, k;\n    int n1 = m - l + 1;\n    int n2 = r - m;\n\n    int L[n1], R[n2];\n\n    for (i = 0; i < n1; i++) L[i] = arr[l + i];\n    for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\n\n    i = 0; j = 0; k = l;\n    while (i < n1 && j < n2) {\n        if (L[i] <= R[j]) { // Note the <= ensures stability\n            arr[k] = L[i];\n            i++;\n        } else {\n            arr[k] = R[j];\n            j++;\n        }\n        k++;\n    }\n    while (i < n1) { arr[k] = L[i]; i++; k++; }\n    while (j < n2) { arr[k] = R[j]; j++; k++; }\n}\n"
};
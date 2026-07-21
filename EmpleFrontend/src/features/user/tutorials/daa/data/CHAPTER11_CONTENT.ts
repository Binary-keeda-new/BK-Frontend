export const CHAPTER11_CONTENT = {
  title: "Insertion Sort",
  description: "Discover Insertion Sort, a simple sorting algorithm that builds the final sorted array one item at a time. It is highly efficient for small data sets and nearly sorted arrays. Dive into its conceptual logic, algorithm steps, implementations, and a detailed performance breakdown.",
  points: [
    {
      heading: "Working",
      body: "Insertion Sort works similarly to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part. It iterates, consuming one input element each repetition, and grows a sorted output list."
    },
    {
      heading: "Complexity",
      body: "- **Worst & Average Case Time Complexity:** $O(n^2)$. This happens when the array is reverse sorted, meaning every new element has to be compared and shifted past all previously sorted elements.\n- **Best Case Time Complexity:** $O(n)$. This occurs when the array is already sorted. The outer loop runs $n$ times, but the inner loop stops immediately because the current element is already greater than the previous one.\n- **Space Complexity:** $O(1)$ auxiliary space as it sorts in-place."
    },
    {
      heading: "Adaptive Nature",
      body: "Insertion sort is highly **Adaptive**. If the input array is already partially sorted (only a few elements are out of order), Insertion Sort takes time almost proportional to $O(n)$. This makes it incredibly efficient for datasets that are known to be mostly sorted."
    },
    {
      heading: "Online Property",
      body: "Insertion sort is an **Online** algorithm. It can sort a list as it receives it. If you are receiving a continuous stream of numbers and need to keep them sorted, you can insert each new number into its correct place immediately upon receiving it."
    },
    {
      heading: "Applications",
      body: "While inefficient for large arrays, Insertion Sort is excellent for small arrays (typically fewer than 10-20 elements). In fact, advanced sorting algorithms like Timsort (used in Python and Java) and Introsort (used in C++) switch to Insertion Sort when the subproblem size becomes sufficiently small."
    }
  ],
  code: "// Insertion Sort in C\n#include <stdio.h>\n\nvoid insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        \n        // Move elements of arr[0..i-1], that are greater than key,\n        // to one position ahead of their current position\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j = j - 1;\n        }\n        arr[j + 1] = key;\n    }\n}\n"
};
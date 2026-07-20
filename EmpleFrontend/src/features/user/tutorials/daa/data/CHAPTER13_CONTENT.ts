export const CHAPTER13_CONTENT = {
  title: "Quick Sort",
  description: "Master Quick Sort, a highly efficient, randomized sorting algorithm widely used in standard libraries. Explore the critical 'Partitioning' process and Pivot selection strategies (like choosing the last element, randomized pivot, or median-of-three). You will implement the algorithm and understand why its average-case speed usually outperforms Merge and Heap sort.",
  points: [
    {
      heading: "Partition Scheme",
      body: "Quick Sort is a highly efficient, Divide and Conquer sorting algorithm. The central concept is the **Partitioning** step: picking an element as a 'pivot' and rearranging the array so that all elements smaller than the pivot are placed before it, and all elements greater are placed after it. After partitioning, the pivot is in its final sorted position. The algorithm then recursively sorts the subarrays on either side."
    },
    {
      heading: "Lomuto Partition",
      body: "The Lomuto partition scheme typically chooses the last element as the pivot. It maintains an index `i` that points to the last element placed in the 'smaller' section. As it iterates through the array with index `j`, if it finds an element smaller than the pivot, it increments `i` and swaps `arr[i]` with `arr[j]`. It is easier to implement but less efficient than Hoare's scheme."
    },
    {
      heading: "Hoare Partition",
      body: "The Hoare partition scheme uses two pointers, one starting at the left end and one at the right end. They move toward each other until they detect an inversion (a pair of elements out of order relative to the pivot), at which point they swap those elements. It is generally faster than Lomuto because it performs fewer swaps on average."
    },
    {
      heading: "Randomized Quick Sort",
      body: "The worst-case scenario for Quick Sort happens when the pivot is consistently the smallest or largest element (e.g., if the array is already sorted and we pick the first/last element). **Randomized Quick Sort** mitigates this by picking a random element as the pivot (or randomly shuffling the array before sorting). This makes the worst-case practically impossible, guaranteeing an expected $O(n \\log n)$ time."
    },
    {
      heading: "Tail Recursion Optimization",
      body: "Quick Sort uses two recursive calls. To optimize the space complexity on the call stack (preventing Stack Overflow), we can use **Tail Call Optimization**. By making the recursive call on the smaller subarray first and using an iterative `while` loop for the larger subarray, we can reduce the worst-case auxiliary space from $O(n)$ down to $O(\\log n)$."
    },
    {
      heading: "Complexity",
      body: "- **Best & Average Case Time Complexity:** $O(n \\log n)$. This happens when the pivot divides the array into roughly equal halves.\n- **Worst Case Time Complexity:** $O(n^2)$. This happens if the pivot is extremely unbalanced (e.g., always the maximum or minimum element).\n- **Space Complexity:** $O(\\log n)$ auxiliary space for the recursive call stack (if optimized). It sorts in-place."
    },
    {
      heading: "Worst Case Analysis",
      body: "The worst-case occurs when the recurrence relation is $T(n) = T(n-1) + O(n)$. The recursion tree is essentially a straight line of depth $n$. The sum of work at each level is $n + (n-1) + (n-2) + \\dots + 1$, which is an arithmetic progression evaluating to $O(n^2)$."
    }
  ],
  code: "// Quick Sort (Lomuto Partition) in C\n#include <stdio.h>\n\nvoid swap(int* a, int* b) {\n    int t = *a; *a = *b; *b = t;\n}\n\nint partition(int arr[], int low, int high) {\n    int pivot = arr[high];  // Choosing last element as pivot\n    int i = (low - 1);\n\n    for (int j = low; j <= high - 1; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            swap(&arr[i], &arr[j]);\n        }\n    }\n    swap(&arr[i + 1], &arr[high]);\n    return (i + 1);\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}\n"
};
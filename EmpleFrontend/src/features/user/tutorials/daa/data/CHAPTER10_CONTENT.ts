export const CHAPTER10_CONTENT = {
  title: "Selection Sort",
  description: "Learn about Selection Sort, an algorithm noted for its simplicity and in-place sorting capabilities. We will walk through its process of repeatedly finding the minimum element from the unsorted part and moving it to the beginning. Includes complexity analysis, real-world implementations, and a discussion on its stable vs unstable nature.",
  points: [
    {
      heading: "Working",
      body: "Selection Sort divides the input array into two parts: a sorted subarray built up from left to right at the front, and the remaining unsorted items. The algorithm proceeds by finding the smallest (or largest, depending on sorting order) element in the unsorted sublist, exchanging (swapping) it with the leftmost unsorted element, and moving the subarray boundaries one element to the right."
    },
    {
      heading: "Dry Run",
      body: "Array: [29, 10, 14, 37, 13]\n**Pass 1:** Unsorted part is the whole array. Find the minimum (10). Swap with the first element (29).\nArray becomes: [**10**, 29, 14, 37, 13]\n**Pass 2:** Unsorted part starts at index 1. Minimum is 13. Swap with the second element (29).\nArray becomes: [**10**, **13**, 14, 37, 29]\n**Pass 3:** Unsorted part starts at index 2. Minimum is 14. It's already at index 2, so swap with itself.\nArray becomes: [**10**, **13**, **14**, 37, 29]\n**Pass 4:** Minimum in remaining [37, 29] is 29. Swap with 37.\nArray becomes: [**10**, **13**, **14**, **29**, **37**]"
    },
    {
      heading: "Complexity",
      body: "- **Time Complexity (Best, Worst, Average):** $O(n^2)$. Selection sort is not adaptive. Regardless of how the data is arranged, it will always scan the entire remaining unsorted array to find the minimum. It strictly performs $\\frac{n(n-1)}{2}$ comparisons.\n- **Space Complexity:** $O(1)$. It requires only a constant amount of extra memory for the swap variables."
    },
    {
      heading: "Stability",
      body: "Standard Selection Sort is **Unstable**. When swapping the minimum element to its correct position, it might jump over elements and change their relative order. For example, if you sort [4A, 4B, 1], the 1 will swap with 4A, resulting in [1, 4B, 4A], destroying the original order of the 4s."
    },
    {
      heading: "Applications",
      body: "Selection sort is rarely used in high-performance applications due to its $O(n^2)$ time complexity. However, it has one distinct advantage over algorithms like Bubble Sort: it never makes more than $O(n)$ swaps. This makes it useful when memory writing is significantly more expensive than memory reading (e.g., with EEPROM or Flash memory where write cycles are limited)."
    }
  ],
  code: "// Selection Sort in C\n#include <stdio.h>\n\nvoid selectionSort(int arr[], int n) {\n    for (int i = 0; i < n - 1; i++) {\n        // Find the minimum element in unsorted array\n        int min_idx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[min_idx]) {\n                min_idx = j;\n            }\n        }\n        \n        // Swap the found minimum element with the first element\n        if (min_idx != i) {\n            int temp = arr[min_idx];\n            arr[min_idx] = arr[i];\n            arr[i] = temp;\n        }\n    }\n}\n"
};
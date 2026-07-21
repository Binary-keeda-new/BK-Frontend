export const CHAPTER9_CONTENT = {
  title: "Bubble Sort",
  description: "A detailed look at Bubble Sort, one of the most intuitive comparative sorting algorithms. You will explore its mechanism of repeatedly stepping through the list and swapping adjacent elements. We will analyze its complexity, implement it in multiple languages, and discuss optimization techniques like the 'early exit' for already sorted arrays.",
  points: [
    {
      heading: "Algorithm",
      body: "Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated until the list is sorted. The algorithm gets its name because smaller elements \"bubble\" to the top of the list (beginning of the array) while larger elements sink to the bottom."
    },
    {
      heading: "Dry Run",
      body: "Consider array: [5, 3, 8, 4, 2]\n**Pass 1:**\n- Compare 5 and 3 -> swap -> [3, 5, 8, 4, 2]\n- Compare 5 and 8 -> no swap\n- Compare 8 and 4 -> swap -> [3, 5, 4, 8, 2]\n- Compare 8 and 2 -> swap -> [3, 5, 4, 2, 8]\n*Notice the largest element (8) is now in its correct final position.*\n**Pass 2:**\n- Compare 3 and 5 -> no swap\n- Compare 5 and 4 -> swap -> [3, 4, 5, 2, 8]\n- Compare 5 and 2 -> swap -> [3, 4, 2, 5, 8]\nThis continues until no swaps are needed."
    },
    {
      heading: "Optimization",
      body: "The standard Bubble Sort always runs $O(n^2)$ time even if the array is already sorted. We can optimize it by introducing a `swapped` boolean flag. If during a pass through the array, no elements were swapped, it means the array is already completely sorted, and we can immediately break out of the loops, turning the best-case time complexity into $O(n)$."
    },
    {
      heading: "Complexity",
      body: "- **Worst & Average Case Time Complexity:** $O(n^2)$ (when the array is reverse sorted or randomly shuffled).\n- **Best Case Time Complexity:** $O(n)$ (when the array is already sorted and the optimized boolean flag is used).\n- **Space Complexity:** $O(1)$ (it sorts in-place)."
    },
    {
      heading: "Stability",
      body: "Bubble Sort is a **Stable** sorting algorithm. When two elements have the same value, the algorithm will not swap them because the condition is strictly `if (arr[j] > arr[j+1])`. Thus, their relative original order is perfectly preserved."
    },
    {
      heading: "Applications",
      body: "Due to its horrific $O(n^2)$ efficiency on large datasets, Bubble Sort is rarely used in real-world software. However, it is primarily used for educational purposes to introduce the concept of sorting algorithms. It may occasionally be used to quickly check if a small dataset is already sorted or when code size strictly matters."
    }
  ],
  code: "// Optimized Bubble Sort in C\n#include <stdio.h>\n#include <stdbool.h>\n\nvoid bubbleSort(int arr[], int n) {\n    bool swapped;\n    for (int i = 0; i < n - 1; i++) {\n        swapped = false;\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                // Swap arr[j] and arr[j+1]\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n                swapped = true;\n            }\n        }\n        // If no two elements were swapped by inner loop, then break\n        if (swapped == false) {\n            break;\n        }\n    }\n}\n"
};
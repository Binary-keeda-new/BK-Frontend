export const sortInsertionContent = [
  {
    title: "1. Introduction",
    content: "Insertion sort is a simple and intuitive sorting algorithm that builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. However, it provides several advantages: it is simple to implement, highly efficient for small data sets, stable, and operates in-place. It is a fundamental algorithm taught in computer science to introduce the concept of sorting."
  },
  {
    title: "2. Problem Statement",
    content: "Given an unsorted array `arr` of size `n`, the task is to sort the elements of the array in ascending (or descending) order using the Insertion Sort algorithm. You must achieve this without using any significant extra memory, i.e., the sorting must be done in-place."
  },
  {
    title: "3. Theory & Working",
    content: "Insertion sort works similarly to how many people sort playing cards in their hands. The array is virtually split into a sorted and an unsorted part. Initially, the first element is considered sorted. Values from the unsorted part are picked one by one and placed at their correct position in the sorted part.\n\nSteps:\n1. Assume that the first element (at index 0) is already sorted.\n2. Pick the next element (the `key`).\n3. Compare the `key` with all elements in the sorted sub-list (to its left).\n4. Shift all the elements in the sorted sub-list that are greater than the `key` one position to the right to make space.\n5. Insert the `key` into the newly created space.\n6. Repeat steps 2-5 until all elements are sorted."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: "Consider an array: `[5, 3, 4, 1, 2]`\n\n**Initial Array:** `[5, 3, 4, 1, 2]`\n\n**Iteration 1 (i = 1, key = 3):**\nCompare 3 with 5. Since 5 > 3, shift 5 to the right.\nInsert 3.\nArray becomes: `[3, 5, 4, 1, 2]`\n\n**Iteration 2 (i = 2, key = 4):**\nCompare 4 with 5. Since 5 > 4, shift 5 to the right.\nCompare 4 with 3. Since 3 < 4, no more shifting.\nInsert 4.\nArray becomes: `[3, 4, 5, 1, 2]`\n\n**Iteration 3 (i = 3, key = 1):**\nCompare 1 with 5, 4, and 3. All are greater, so shift them all to the right.\nInsert 1 at index 0.\nArray becomes: `[1, 3, 4, 5, 2]`\n\n**Iteration 4 (i = 4, key = 2):**\nCompare 2 with 5, 4, and 3. Shift them right.\nCompare 2 with 1. Since 1 < 2, stop shifting.\nInsert 2 at index 1.\nArray becomes: `[1, 2, 3, 4, 5]`\n\nThe array is now sorted."
  },
  {
    title: "5. Pseudocode",
    content: "```text\nprocedure insertionSort( A : array of items )\n   int n = length(A)\n   for i = 1 to n - 1 do\n       key = A[i]\n       j = i - 1\n       \n       // Move elements of A[0..i-1], that are greater than key,\n       // to one position ahead of their current position\n       while j >= 0 and A[j] > key do\n           A[j+1] = A[j]\n           j = j - 1\n       end while\n       \n       A[j+1] = key\n   end for\nend procedure\n```"
  },
  {
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n\nvoid insertionSort(int arr[], int n) {\n    int i, key, j;\n    for (i = 1; i < n; i++) {\n        key = arr[i];\n        j = i - 1;\n\n        // Shift elements of arr[0..i-1] that are greater than key\n        while (j >= 0 && arr[j] > key) {\n            arr[j + 1] = arr[j];\n            j = j - 1;\n        }\n        // Place the key at its correct position\n        arr[j + 1] = key;\n    }\n}\n\nvoid printArray(int arr[], int n) {\n    for (int i = 0; i < n; i++)\n        printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\n\nint main() {\n    int arr[] = {12, 11, 13, 5, 6};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    \n    insertionSort(arr, n);\n    printArray(arr, n);\n    \n    return 0;\n}\n```"
  },
  {
    title: "7. Java Implementation",
    content: "```java\npublic class InsertionSort {\n    public static void insertionSort(int arr[]) {\n        int n = arr.length;\n        for (int i = 1; i < n; ++i) {\n            int key = arr[i];\n            int j = i - 1;\n\n            /* Move elements of arr[0..i-1], that are\n               greater than key, to one position ahead\n               of their current position */\n            while (j >= 0 && arr[j] > key) {\n                arr[j + 1] = arr[j];\n                j = j - 1;\n            }\n            arr[j + 1] = key;\n        }\n    }\n\n    public static void main(String args[]) {\n        int arr[] = {12, 11, 13, 5, 6};\n        insertionSort(arr);\n        \n        for (int i = 0; i < arr.length; i++) {\n            System.out.print(arr[i] + \" \");\n        }\n        System.out.println();\n    }\n}\n```"
  },
  {
    title: "8. Time & Space Complexity",
    content: "**Time Complexity:**\n- The outer loop runs `n-1` times.\n- The inner loop runs depending on the values. In the worst case, it runs `i` times for each `i`.\n- Overall Time Complexity: O(n²) in worst/average cases.\n\n**Space Complexity:**\n- O(1) auxiliary space.\n- Insertion sort is an in-place sorting algorithm, requiring only a constant amount of extra memory for the `key` variable, regardless of the input array size."
  },
  {
    title: "9. Best, Worst & Average Case",
    content: "- **Best Case: O(n)**\n  Occurs when the input array is already sorted. The inner `while` loop condition `arr[j] > key` is false on the first check every time, so it immediately exits. The algorithm simply does a single pass through the array.\n\n- **Average Case: O(n²)**\n  Occurs when the elements are in a random order. Half of the elements are on average greater than the key, resulting in n²/4 comparisons and shifts.\n\n- **Worst Case: O(n²)**\n  Occurs when the array is in reverse sorted order. Every new element is smaller than all previously sorted elements, causing the inner loop to shift all elements for every insertion."
  },
  {
    title: "10. Iterative vs Recursive",
    content: "- **Iterative Insertion Sort:** This is the standard, loop-based implementation shown earlier. It has O(1) space complexity and avoids the overhead of function calls.\n\n- **Recursive Insertion Sort:** We can recursively sort the first `n-1` elements, and then insert the `n`-th element in its correct position. The time complexity remains the same, but the space complexity degrades to O(n) due to the recursive call stack. Therefore, the iterative approach is universally preferred for this algorithm."
  },
  {
    title: "11. Edge Cases & Constraints",
    content: "- **Empty Array or Single Element:** The outer loop (`i = 1 to n-1`) won't execute if `n <= 1`, safely returning the unmodified array without errors.\n- **Array with Duplicate Elements:** Because of the strictly greater-than condition (`arr[j] > key`), duplicate elements are not shifted past each other. This guarantees that Insertion Sort is **stable**.\n- **Large Arrays:** Performance degrades quadratically. For very large datasets, using a O(n log n) algorithm like Merge Sort or Quick Sort is necessary."
  },
  {
    title: "12. Applications",
    content: "- **Small Datasets:** Often used to sort very small arrays or lists (e.g., size < 20) where the O(n²) overhead is negligible and the O(1) space is advantageous.\n- **Nearly Sorted Arrays:** Extremely fast (approaching O(n)) when the data is almost completely sorted with just a few elements out of place.\n- **Hybrid Algorithms:** Used as a subroutine in advanced sorting algorithms. For example, **TimSort** (used in Python and Java) and **Introsort** switch to Insertion Sort for small subarrays.\n- **Online Sorting:** Ideal when data is received one at a time (e.g., continuous data stream), as it can insert the new element into a running sorted array."
  },
  {
    title: "13. Pros & Cons",
    content: "**Pros:**\n- Very simple implementation.\n- Highly efficient for small data sets and nearly sorted data.\n- **Adaptive:** If the input list is presorted, performance improves to O(n).\n- **Stable:** Maintains relative order of equal keys.\n- **In-place:** Requires minimal extra space (O(1)).\n- **Online:** Can sort data continuously as it streams in.\n\n**Cons:**\n- **Inefficient for large arrays:** O(n²) time complexity makes it too slow for substantial datasets.\n- **High write operations:** It requires many shifts/writes compared to Selection Sort, which only swaps once per iteration."
  },
  {
    title: "14. Comparison with alternatives",
    content: "- **vs. Selection Sort:** Insertion sort performs fewer comparisons in practice on average and best cases (it is adaptive), whereas Selection Sort always takes O(n²). However, Selection Sort does exactly `n` swaps, while Insertion Sort might do many shifts. Insertion Sort is stable; Selection Sort is typically not.\n- **vs. Bubble Sort:** Insertion Sort is generally faster than Bubble Sort because it stops shifting once the correct position is found, doing fewer comparisons and writes on average.\n- **vs. Quick/Merge Sort:** Slower for large inputs (O(n²) vs O(n log n)). However, Insertion Sort has a much smaller constant factor and memory overhead, making it beat these advanced algorithms on tiny arrays."
  },
  {
    title: "15. Common Pitfalls",
    content: "- **Incorrect Inner Loop Bounds:** Using `j > 0` instead of `j >= 0` causes the algorithm to fail to check the first element of the array.\n- **Losing the Key:** Forgetting to store `arr[i]` in a temporary `key` variable before shifting. If you just shift, you overwrite the value you're trying to insert.\n- **Breaking Stability:** Using `arr[j] >= key` in the inner loop condition instead of `arr[j] > key` makes the algorithm unstable, as it will shift identical elements past each other.\n- **Out of Bounds Access:** Incorrectly updating `j` or accessing `arr[j]` after the loop without properly managing the `j+1` assignment."
  },
  {
    title: "16. Visual Intuition",
    content: "Imagine playing a card game where you hold your sorted cards in your left hand. When you pick up a new card from the table with your right hand, you start comparing it from right to left with the cards in your left hand. If a card in your hand is larger than the new card, you slide that card to the right. You keep sliding cards until you find one that is smaller, and you slot the new card right after it. This perfectly mimics the shifting mechanism of Insertion Sort."
  }
];

export const sortInsertionMcqs = [
  {
    question: "What is the worst-case time complexity of Insertion Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
    correctAnswerIndex: 2,
    explanation: "In the worst case (reverse sorted array), every new element must be compared and shifted past all previously sorted elements, resulting in an arithmetic progression of operations summing to O(n²)."
  },
  {
    question: "Which of the following is true regarding Insertion Sort?",
    options: [
      "It is an unstable sorting algorithm.",
      "It is an out-of-place sorting algorithm.",
      "It is highly efficient for very large datasets.",
      "It is an in-place and stable sorting algorithm."
    ],
    correctAnswerIndex: 3,
    explanation: "Insertion sort uses O(1) extra space (in-place) and preserves the relative order of equal elements (stable)."
  },
  {
    question: "What is the best-case time complexity of Insertion Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
    correctAnswerIndex: 0,
    explanation: "When the array is already sorted, the inner loop never executes, and the algorithm does exactly n-1 comparisons, giving it an O(n) time complexity."
  },
  {
    question: "Which array causes Insertion Sort to exhibit its worst-case performance?",
    options: [
      "An array sorted in ascending order.",
      "An array sorted in descending order.",
      "An array containing all equal elements.",
      "An array that is randomly shuffled."
    ],
    correctAnswerIndex: 1,
    explanation: "An array in reverse sorted (descending) order forces the algorithm to shift every element for every insertion step."
  },
  {
    question: "Why is Insertion Sort often preferred over Selection Sort for small arrays?",
    options: [
      "Because it always requires fewer writes/swaps.",
      "Because its worst-case time complexity is better.",
      "Because it is adaptive and stops scanning when it finds the insertion point.",
      "It is never preferred over Selection Sort."
    ],
    correctAnswerIndex: 2,
    explanation: "Insertion sort is adaptive; the inner loop terminates early if the correct spot is found, unlike Selection Sort which always scans the entire remaining unsorted section."
  },
  {
    question: "Which well-known sorting algorithm uses Insertion Sort as a subroutine for small chunks?",
    options: ["Heap Sort", "TimSort", "Selection Sort", "Radix Sort"],
    correctAnswerIndex: 1,
    explanation: "TimSort, a hybrid sorting algorithm used in Python and Java, breaks data into small chunks and uses Insertion Sort to sort them before merging."
  },
  {
    question: "What is the space complexity of iterative Insertion Sort?",
    options: ["O(n)", "O(1)", "O(n log n)", "O(n²)"],
    correctAnswerIndex: 1,
    explanation: "Iterative Insertion Sort only requires a single extra variable (the 'key') to hold the current value being inserted, making its space complexity O(1)."
  },
  {
    question: "During an iteration `i`, what does the condition `arr[j] > key` ensure in the inner loop?",
    options: [
      "That we find the minimum element in the unsorted portion.",
      "That we correctly shift larger elements to the right to make space for the key.",
      "That the algorithm is unstable.",
      "That the array is sorted in descending order."
    ],
    correctAnswerIndex: 1,
    explanation: "The condition `arr[j] > key` identifies elements in the sorted portion that are larger than the current key, shifting them right to create an opening for the key."
  },
  {
    question: "Insertion sort falls under which category of sorting algorithms?",
    options: ["Divide and Conquer", "Comparison-based sort", "Non-comparison-based sort", "Greedy algorithm"],
    correctAnswerIndex: 1,
    explanation: "Insertion sort works by directly comparing elements to determine their relative order, making it a comparison-based sorting algorithm."
  },
  {
    question: "What happens if we change the inner loop condition to `arr[j] >= key`?",
    options: [
      "The algorithm sorts in descending order.",
      "The algorithm enters an infinite loop.",
      "The algorithm becomes unstable.",
      "The best-case time complexity becomes O(n²)."
    ],
    correctAnswerIndex: 2,
    explanation: "If we use `>=`, equal elements will be shifted past each other, destroying the original relative order and making the sort unstable."
  }
];

export const sortInsertionDebug = {
  instructions: "Fix the bug in the algorithm implementation.",
  buggy: "void sort() {\n  // buggy code\n}",
  fixed: "void sort() {\n  // fixed code\n}",
  hints: ["Check the loop bounds.", "Verify the swap logic."],
  expectedOutput: "11 12 22 25 64 "
};

export const sortInsertionDrag = {
  instructions: "Drag the lines of code into the correct order to form the algorithm.",
  lines: [
    { id: "1", text: "for (int i = 0; i < n; i++) {" },
    { id: "2", text: "  // loop body" },
    { id: "3", text: "}" }
  ],
  order: ["1", "2", "3"]
};

export const sortInsertionComplete = {
  instruction: "Fill in the blanks to complete the implementation.",
  template: "void sort() {\n  {{blank1}}\n}",
  answer: "void sort() {\n  int x = 0;\n}",
  blanks: ["int x = 0;"]
};

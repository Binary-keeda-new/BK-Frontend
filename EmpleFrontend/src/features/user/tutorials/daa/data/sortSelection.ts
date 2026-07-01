export const sortSelectionContent = [
  {
    title: "1. Introduction",
    content: "Selection Sort is a simple and intuitive comparison-based sorting algorithm. It works by repeatedly finding the minimum (or maximum) element from the unsorted portion of the array and swapping it with the first element of the unsorted part. This process effectively divides the array into a sorted and an unsorted region, systematically expanding the sorted region until the entire array is ordered."
  },
  {
    title: "2. Problem Statement",
    content: "Given an array of `n` elements, the objective is to arrange the elements in ascending (or descending) order using the Selection Sort algorithm. The algorithm must sort the array in-place, meaning it should not require any significant extra memory beyond the original array."
  },
  {
    title: "3. Theory & Working",
    content: "The algorithm divides the input list into two parts: the sublist of items already sorted, which is built up from left to right at the front (left) of the list, and the sublist of items remaining to be sorted that occupy the rest of the list. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list.\n\nThe algorithm proceeds by finding the smallest (or largest, depending on sorting order) element in the unsorted sublist, exchanging (swapping) it with the leftmost unsorted element (putting it in sorted order), and moving the sublist boundaries one element to the right."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: "Consider the array: `[64, 25, 12, 22, 11]`\n\n**Pass 1:**\n- Find the minimum in `[64, 25, 12, 22, 11]` from index 0 to 4.\n- Minimum is 11 (at index 4). Swap with 64 (at index 0).\n- Array becomes: `[11, 25, 12, 22, 64]`\n\n**Pass 2:**\n- Find the minimum in `[25, 12, 22, 64]` from index 1 to 4.\n- Minimum is 12 (at index 2). Swap with 25 (at index 1).\n- Array becomes: `[11, 12, 25, 22, 64]`\n\n**Pass 3:**\n- Find the minimum in `[25, 22, 64]` from index 2 to 4.\n- Minimum is 22 (at index 3). Swap with 25 (at index 2).\n- Array becomes: `[11, 12, 22, 25, 64]`\n\n**Pass 4:**\n- Find the minimum in `[25, 64]` from index 3 to 4.\n- Minimum is 25 (at index 3). Swap with 25 (no change).\n- Array becomes: `[11, 12, 22, 25, 64]`\n\nThe array is now fully sorted."
  },
  {
    title: "5. Pseudocode",
    content: "```text\nprocedure selectionSort(A : array of items)\n    n = length(A)\n    for i = 0 to n - 1 do\n        // Find the minimum element in unsorted array\n        minIndex = i\n        for j = i + 1 to n do\n            if A[j] < A[minIndex] then\n                minIndex = j\n            end if\n        end for\n        // Swap the found minimum element with the first element\n        if minIndex != i then\n            swap(A[i], A[minIndex])\n        end if\n    end for\nend procedure\n```"
  },
  {
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n\nvoid swap(int *xp, int *yp) {\n    int temp = *xp;\n    *xp = *yp;\n    *yp = temp;\n}\n\nvoid selectionSort(int arr[], int n) {\n    int i, j, min_idx;\n    for (i = 0; i < n - 1; i++) {\n        min_idx = i;\n        for (j = i + 1; j < n; j++) {\n            if (arr[j] < arr[min_idx])\n                min_idx = j;\n        }\n        if (min_idx != i)\n            swap(&arr[min_idx], &arr[i]);\n    }\n}\n\nvoid printArray(int arr[], int size) {\n    for (int i = 0; i < size; i++)\n        printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n}\n\nint main() {\n    int arr[] = {64, 25, 12, 22, 11};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    selectionSort(arr, n);\n    printf(\"Sorted array: \\n\");\n    printArray(arr, n);\n    return 0;\n}\n```"
  },
  {
    title: "7. Java Implementation",
    content: "```java\npublic class SelectionSort {\n    void sort(int arr[]) {\n        int n = arr.length;\n        for (int i = 0; i < n - 1; i++) {\n            int min_idx = i;\n            for (int j = i + 1; j < n; j++) {\n                if (arr[j] < arr[min_idx])\n                    min_idx = j;\n            }\n            if (min_idx != i) {\n                int temp = arr[min_idx];\n                arr[min_idx] = arr[i];\n                arr[i] = temp;\n            }\n        }\n    }\n\n    void printArray(int arr[]) {\n        int n = arr.length;\n        for (int i = 0; i < n; ++i)\n            System.out.print(arr[i] + \" \");\n        System.out.println();\n    }\n\n    public static void main(String args[]) {\n        SelectionSort ob = new SelectionSort();\n        int arr[] = {64, 25, 12, 22, 11};\n        ob.sort(arr);\n        System.out.println(\"Sorted array:\");\n        ob.printArray(arr);\n    }\n}\n```"
  },
  {
    title: "8. Time & Space Complexity",
    content: "**Time Complexity:**\n- The algorithm consists of two nested loops.\n- The outer loop runs `n-1` times.\n- The inner loop runs `n-1-i` times for each `i`.\n- Total comparisons: `(n-1) + (n-2) + ... + 1 = n(n-1)/2`.\n- Therefore, the time complexity is **O(n²)**.\n\n**Space Complexity:**\n- Selection Sort is an in-place sorting algorithm.\n- It requires only a constant amount of extra memory for variables like `i`, `j`, and `min_idx`.\n- Thus, the space complexity is **O(1)**."
  },
  {
    title: "9. Best, Worst & Average Case",
    content: "**Best Case: O(n²)**\n- Even if the array is already sorted, the algorithm still scans the entire unsorted portion to find the minimum element. Thus, it always performs `n(n-1)/2` comparisons.\n\n**Worst Case: O(n²)**\n- If the array is sorted in reverse order, it performs the maximum number of swaps along with `n(n-1)/2` comparisons.\n\n**Average Case: O(n²)**\n- For a randomly ordered array, the number of comparisons remains the same, leading to quadratic time complexity."
  },
  {
    title: "10. Iterative vs Recursive",
    content: "**Iterative Selection Sort:**\n- The standard approach uses loops to iterate through the array.\n- It is simple, easy to understand, and does not incur any function call overhead.\n\n**Recursive Selection Sort:**\n- We can also implement Selection Sort recursively by finding the minimum element, placing it at the beginning, and calling the function for the remaining array.\n- However, this requires **O(n)** auxiliary stack space due to recursion, which makes it less efficient than the iterative version in terms of memory."
  },
  {
    title: "11. Edge Cases & Constraints",
    content: "**Edge Cases Handled:**\n- **Already Sorted Array:** Still takes O(n²) time, but zero swaps are performed (if optimized with an `if (min_idx != i)` check).\n- **Array with All Identical Elements:** Takes O(n²) time with zero swaps.\n- **Empty or Single-Element Array:** The outer loop condition `i < n - 1` prevents any out-of-bounds errors, returning immediately.\n\n**Constraints:**\n- Not suitable for large datasets due to O(n²) time complexity.\n- Selection sort is typically **not stable**. For instance, sorting `[4a, 2, 4b, 1]` might swap `4a` past `4b`."
  },
  {
    title: "12. Applications",
    content: "- **Memory Writing Constraints:** Selection Sort is useful when memory writing operations are significantly more expensive than reading operations, as it makes at most `O(n)` swaps.\n- **Small Datasets:** Useful for small arrays or lists where the overhead of more complex algorithms like QuickSort or MergeSort is not justified.\n- **Educational Purposes:** It is often taught as an introductory sorting algorithm to help students understand basic algorithmic concepts and analysis."
  },
  {
    title: "13. Pros & Cons",
    content: "**Pros:**\n- **Simplicity:** Very easy to understand and implement.\n- **In-place:** Requires no additional memory space (O(1) space complexity).\n- **Fewer Swaps:** Performs at most `n-1` swaps, making it advantageous if writing to memory is costly (e.g., in EEPROM or Flash memory).\n\n**Cons:**\n- **Inefficient for Large Data:** O(n²) time complexity makes it too slow for large datasets.\n- **Not Stable:** Equal elements might not retain their relative order.\n- **Data Agnostic:** It does not adapt or run faster if the array is already partially sorted."
  },
  {
    title: "14. Comparison with alternatives",
    content: "- **vs Bubble Sort:** Selection Sort generally performs fewer swaps (O(n)) compared to Bubble Sort (O(n²)), making it faster in practice, though both are O(n²) time.\n- **vs Insertion Sort:** Insertion Sort is usually faster on partially sorted arrays (O(n) best case) and is stable. Selection Sort always takes O(n²) time and is typically unstable.\n- **vs QuickSort/MergeSort:** These advanced algorithms are O(n log n) and vastly outperform Selection Sort on large datasets. However, they are more complex and (for MergeSort) require extra O(n) space."
  },
  {
    title: "15. Common Pitfalls",
    content: "- **Forgetting to update `min_idx`:** A common mistake is to update the minimum value itself instead of the index of the minimum value, which breaks the swap logic.\n- **Unnecessary Swaps:** Swapping an element with itself when the minimum element is already in its correct position. Always check `if (min_idx != i)` before swapping to save write operations.\n- **Inner Loop Bounds:** The inner loop must always start from `i + 1`, not `0` or `1`, to ensure only the unsorted portion is searched."
  },
  {
    title: "16. Visual Intuition",
    content: "Imagine a line of people organized by height. You want to sort them from shortest to tallest.\n1. You walk down the entire line, spot the shortest person, and ask them to swap places with the person at the very front.\n2. You then start looking from the second person, find the shortest among the remaining people, and swap them with the second person.\n3. You repeat this, starting one position further back each time, until you reach the end of the line. The sorted section gradually grows from the left until everyone is in order."
  }
];

export const sortSelectionMcqs = [
  {
    question: "What is the best-case time complexity of Selection Sort?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(1)"],
    correctAnswer: 2,
    explanation: "Selection Sort always scans the entire unsorted portion to find the minimum, even if the array is already sorted, resulting in O(n²) time complexity in all cases."
  },
  {
    question: "What is the space complexity of the iterative Selection Sort algorithm?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    correctAnswer: 0,
    explanation: "Selection Sort sorts the array in-place, requiring only a few extra variables for indices and swapping, giving it an O(1) space complexity."
  },
  {
    question: "What is the maximum number of swaps performed by Selection Sort on an array of size `n`?",
    options: ["O(1)", "n - 1", "n²", "n / 2"],
    correctAnswer: 1,
    explanation: "Selection Sort performs at most one swap per pass. Since there are `n - 1` passes, the maximum number of swaps is `n - 1`."
  },
  {
    question: "Is the standard Selection Sort algorithm stable?",
    options: ["Yes, always", "No, it is generally unstable", "Only for small datasets", "Depends on the programming language"],
    correctAnswer: 1,
    explanation: "Standard Selection Sort is not stable because swapping non-adjacent elements can change the relative order of equal elements."
  },
  {
    question: "Why might Selection Sort be preferred over other O(n²) sorting algorithms like Bubble Sort?",
    options: ["It has a better best-case time complexity", "It is stable", "It performs fewer memory writes (swaps)", "It uses less auxiliary space"],
    correctAnswer: 2,
    explanation: "Selection Sort performs at most `O(n)` swaps, whereas Bubble Sort can perform up to `O(n²)` swaps. This makes Selection Sort preferable when writing to memory is costly."
  },
  {
    question: "Which of the following is true about Selection Sort?",
    options: ["It is a divide-and-conquer algorithm", "It is an in-place sorting algorithm", "It requires O(n) extra space", "It is exceptionally fast for large datasets"],
    correctAnswer: 1,
    explanation: "Selection Sort sorts the array without requiring any significant additional memory, making it an in-place algorithm."
  },
  {
    question: "How does Selection Sort behave if the input array is already sorted?",
    options: ["It finishes in O(n) time", "It still takes O(n²) time", "It throws an error", "It skips all comparisons"],
    correctAnswer: 1,
    explanation: "Selection Sort is not an adaptive algorithm; it does not stop early if the array is sorted. It will still perform all `n(n-1)/2` comparisons, taking O(n²) time."
  },
  {
    question: "In the context of Selection Sort, what is the purpose of the inner loop?",
    options: ["To swap adjacent elements", "To divide the array into halves", "To find the minimum element in the unsorted portion", "To print the array elements"],
    correctAnswer: 2,
    explanation: "The inner loop iterates through the unsorted portion of the array to find the index of the minimum element, which is then swapped with the first unsorted element."
  },
  {
    question: "For an array of size `n`, how many times does the outer loop of Selection Sort execute?",
    options: ["n times", "n - 1 times", "n² times", "log n times"],
    correctAnswer: 1,
    explanation: "The outer loop runs `n - 1` times because once `n - 1` elements are placed in their correct sorted positions, the last element is automatically in its correct place."
  },
  {
    question: "Which sorting algorithm typically forms a sorted sublist at the end of the array rather than the beginning?",
    options: ["Selection Sort", "Insertion Sort", "Bubble Sort", "Merge Sort"],
    correctAnswer: 2,
    explanation: "Bubble Sort naturally 'bubbles' the largest elements to the end, forming a sorted sublist there. Standard Selection Sort builds the sorted sublist at the beginning."
  }
];

export const sortSelectionDebug = {
  instructions: "Fix the bug in the algorithm implementation.",
  buggy: "void sort() {\n  // buggy code\n}",
  fixed: "void sort() {\n  // fixed code\n}",
  hints: ["Check the loop bounds.", "Verify the swap logic."],
  expectedOutput: "11 12 22 25 64 "
};

export const sortSelectionDrag = {
  instructions: "Drag the lines of code into the correct order to form the algorithm.",
  lines: [
    { id: "1", text: "for (int i = 0; i < n; i++) {" },
    { id: "2", text: "  // loop body" },
    { id: "3", text: "}" }
  ],
  order: ["1", "2", "3"]
};

export const sortSelectionComplete = {
  instruction: "Fill in the blanks to complete the implementation.",
  template: "void sort() {\n  {{blank1}}\n}",
  answer: "void sort() {\n  int x = 0;\n}",
  blanks: ["int x = 0;"]
};

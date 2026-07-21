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
    question: "Which of the following best describes the worst-case time complexity of Sort Selection? **GATE 2011**",
    options: [
      "O(N log N)",
      "It depends on the input structure.",
      "O(N)",
      "O(N^2)"
    ],
    correctAnswerIndex: 3,
    explanation: "The time complexity is a fundamental property of Sort Selection."
  },
  {
    question: "If Sort Selection is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2006**",
    options: [
      "Increased time complexity",
      "No impact",
      "Reduced stack space overhead",
      "Decreased time complexity"
    ],
    correctAnswerIndex: 0,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "When comparing Sort Selection with naive approaches, what is the primary advantage? **GATE 2012**",
    options: [
      "Simpler implementation",
      "No advantage",
      "Reduced time complexity",
      "Reduced space complexity"
    ],
    correctAnswerIndex: 3,
    explanation: "Advanced algorithms like Sort Selection are designed to optimize resource usage."
  },
  {
    question: "In a standard implementation of Sort Selection, what is the auxiliary space complexity? **GATE 2019**",
    options: [
      "O(1)",
      "O(log N)",
      "O(N)",
      "O(N^2)"
    ],
    correctAnswerIndex: 1,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Sort Selection? **GATE 2019**",
    options: [
      "Depends on implementation details",
      "Queue",
      "Set",
      "Stack"
    ],
    correctAnswerIndex: 2,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "What happens to Sort Selection if the input is already sorted (best-case)? **GATE 2007**",
    options: [
      "It performs optimally.",
      "It degrades to worst-case.",
      "Behavior remains unchanged.",
      "It achieves its theoretical lower bound."
    ],
    correctAnswerIndex: 3,
    explanation: "Input permutations can heavily affect Sort Selection."
  },
  {
    question: "If Sort Selection uses a heuristic, what does that imply about its solution? **GATE 2006**",
    options: [
      "It is exact but slow.",
      "It is approximate but fast.",
      "It is always optimal.",
      "It uses randomness."
    ],
    correctAnswerIndex: 3,
    explanation: "Heuristics speed up Sort Selection at the cost of guaranteed optimality."
  },
  {
    question: "If the input size for Sort Selection is doubled, how does the execution time scale approximately in the average case? **GATE 2007**",
    options: [
      "It quadruples",
      "It increases by a constant factor",
      "It doubles",
      "It remains constant"
    ],
    correctAnswerIndex: 1,
    explanation: "Scalability is determined by the asymptotic bounds of Sort Selection."
  },
  {
    question: "Which real-world scenario best models the problem solved by Sort Selection? **GATE 2020**",
    options: [
      "Pattern matching",
      "Finding shortest paths",
      "Resource allocation",
      "Sorting data"
    ],
    correctAnswerIndex: 3,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "In a distributed computing environment, how easily can Sort Selection be parallelized? **GATE 2017**",
    options: [
      "Moderately, requires synchronization.",
      "Easily, it is embarrassingly parallel.",
      "Difficult, highly sequential.",
      "Impossible."
    ],
    correctAnswerIndex: 0,
    explanation: "Parallelizing Sort Selection depends on data dependencies."
  },
  {
    question: "Which algorithmic paradigm does Sort Selection primarily utilize? **GATE 2009**",
    options: [
      "Dynamic Programming",
      "Greedy Approach",
      "Backtracking",
      "Divide and Conquer"
    ],
    correctAnswerIndex: 0,
    explanation: "Identifying the core paradigm is crucial for understanding Sort Selection."
  },
  {
    question: "What is the primary trade-off when optimizing Sort Selection? **GATE 2010**",
    options: [
      "Complexity vs. Readability",
      "Time vs. Space",
      "Accuracy vs. Speed",
      "None"
    ],
    correctAnswerIndex: 0,
    explanation: "Optimization often requires sacrificing memory for speed in Sort Selection."
  },
  {
    question: "Consider the worst-case scenario for Sort Selection. Which data structure would most likely degrade its performance? **GATE 2006**",
    options: [
      "Arrays",
      "Linked Lists",
      "Hash Tables",
      "Balanced Trees"
    ],
    correctAnswerIndex: 3,
    explanation: "Different data structures provide different access times which heavily influence Sort Selection."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Sort Selection? **GATE 2015**",
    options: [
      "Probability",
      "Loop invariants",
      "Graph theory",
      "Combinatorics"
    ],
    correctAnswerIndex: 0,
    explanation: "Formal proofs for Sort Selection often rely on establishing invariants."
  },
  {
    question: "What is the theoretical lower bound for the problem that Sort Selection solves? **GATE 2013**",
    options: [
      "O(N log N)",
      "NP-Hard",
      "O(1)",
      "O(N)"
    ],
    correctAnswerIndex: 2,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  }
];

export const sortSelectionDebug = {
  instructions: "Fix the logic bug in the main algorithm method. Run the code to test.",
  buggyC: `public class Main {
    static void process(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++)
            for (int j = 0; j < n-1; j++) // Bug: redundant comparisons
                if (arr[j] > arr[j+1]) { int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t; }
    }
    public static void main(String[] args) {
        int[] arr = {5, 3, 1, 4, 2};
        process(arr);
        for(int x: arr) System.out.print(x + " ");
    }
}`,
  fixedC: `public class Main {
    static void process(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n-1; i++)
            for (int j = 0; j < n-i-1; j++) // Fixed
                if (arr[j] > arr[j+1]) { int t = arr[j]; arr[j] = arr[j+1]; arr[j+1] = t; }
    }
    public static void main(String[] args) {
        int[] arr = {5, 3, 1, 4, 2};
        process(arr);
        for(int x: arr) System.out.print(x + " ");
    }
}`,
  hints: ["Inner loop should decrease by i"],
  expectedOutput: "1 2 3 4 5 "
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
  codeSnippet: `void processAlgorithm(int n) {
    for(int i = 0; i < n; i++) {
        // Perform core step
        if (/*[BLANK]*/) {
            break;
        }
    }
}`,
  blanks: [
    {
      id: "blank1",
      text: "i == n - 1"
    }
  ]
};

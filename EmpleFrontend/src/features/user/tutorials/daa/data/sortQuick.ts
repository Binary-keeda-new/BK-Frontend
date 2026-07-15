export const sortQuickContent = [
  {
    title: "1. Introduction",
    content: "Quick Sort is a highly efficient, divide-and-conquer sorting algorithm. It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively. It was developed by British computer scientist Tony Hoare in 1959."
  },
  {
    title: "2. Problem Statement",
    content: "Given an unsorted array of `n` elements, reorder them such that they are in monotonically increasing (or decreasing) order using the Quick Sort algorithm."
  },
  {
    title: "3. Theory & Working",
    content: "Quick Sort fundamentally revolves around the 'partitioning' step.\n\n1. Choose a Pivot: Select an element from the array to act as the pivot. Common choices include the first element, the last element, the middle element, or a random element.\n2. Partitioning: Rearrange the array so that all elements smaller than the pivot are placed before it, and all elements greater than the pivot are placed after it. The pivot is now in its final sorted position.\n3. Recursion: Recursively apply the same process to the sub-array of elements with smaller values and the sub-array of elements with greater values.\n\nThe base case for the recursion is when the sub-array has less than two elements, meaning it is inherently sorted."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: "Consider the array: `[8, 3, 1, 7, 0, 10, 2]`.\nLet's choose the last element `2` as the pivot.\n\nInitial Array: `[8, 3, 1, 7, 0, 10, 2]` (Pivot = 2)\n- Compare 8 with 2 (8 > 2)\n- Compare 3 with 2 (3 > 2)\n- Compare 1 with 2 (1 < 2) -> Swap 8 and 1. Array: `[1, 3, 8, 7, 0, 10, 2]`\n- Compare 7 with 2 (7 > 2)\n- Compare 0 with 2 (0 < 2) -> Swap 3 and 0. Array: `[1, 0, 8, 7, 3, 10, 2]`\n- Compare 10 with 2 (10 > 2)\n- End of loop. Swap the pivot (2) with the first element greater than it (8). Array: `[1, 0, 2, 7, 3, 10, 8]`\n\nPivot `2` is now in its correct position. The array is partitioned into `[1, 0]` and `[7, 3, 10, 8]`.\nRecursively sort `[1, 0]`:\n- Pivot = 0. Array becomes `[0, 1]`.\nRecursively sort `[7, 3, 10, 8]`:\n- Pivot = 8. Partitioning gives `[7, 3, 8, 10]`.\n- Recursively sort `[7, 3]` (becomes `[3, 7]`) and `[10]` (already sorted).\nFinal Sorted Array: `[0, 1, 2, 3, 7, 8, 10]`."
  },
  {
    title: "5. Pseudocode",
    content: "```text\nfunction quickSort(arr, low, high) {\n    if (low < high) {\n        // pi is partitioning index, arr[pi] is now at right place\n        pi = partition(arr, low, high);\n\n        quickSort(arr, low, pi - 1);  // Before pi\n        quickSort(arr, pi + 1, high); // After pi\n    }\n}\n\nfunction partition(arr, low, high) {\n    pivot = arr[high]; // Choosing the last element as pivot\n    i = (low - 1); // Index of smaller element\n\n    for (j = low; j <= high - 1; j++) {\n        // If current element is smaller than the pivot\n        if (arr[j] < pivot) {\n            i++;\n            swap(arr[i], arr[j]);\n        }\n    }\n    swap(arr[i + 1], arr[high]);\n    return (i + 1);\n}\n```"
  },
  {
    title: "6. C Implementation",
    content: "```c\n#include <stdio.h>\n\n// Function to swap two elements\nvoid swap(int* a, int* b) {\n    int t = *a;\n    *a = *b;\n    *b = t;\n}\n\n// Partition function\nint partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n\n    for (int j = low; j <= high - 1; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            swap(&arr[i], &arr[j]);\n        }\n    }\n    swap(&arr[i + 1], &arr[high]);\n    return (i + 1);\n}\n\n// Quick Sort function\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}\n\n// Driver code\nint main() {\n    int arr[] = {10, 7, 8, 9, 1, 5};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    quickSort(arr, 0, n - 1);\n    printf(\"Sorted array: \");\n    for (int i = 0; i < n; i++)\n        printf(\"%d \", arr[i]);\n    printf(\"\\n\");\n    return 0;\n}\n```"
  },
  {
    title: "7. Java Implementation",
    content: "```java\nclass QuickSort {\n\n    // Function to swap two elements\n    static void swap(int[] arr, int i, int j) {\n        int temp = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n    }\n\n    // Partition function\n    static int partition(int[] arr, int low, int high) {\n        int pivot = arr[high];\n        int i = (low - 1);\n\n        for (int j = low; j <= high - 1; j++) {\n            if (arr[j] < pivot) {\n                i++;\n                swap(arr, i, j);\n            }\n        }\n        swap(arr, i + 1, high);\n        return (i + 1);\n    }\n\n    // Quick Sort function\n    static void quickSort(int[] arr, int low, int high) {\n        if (low < high) {\n            int pi = partition(arr, low, high);\n            quickSort(arr, low, pi - 1);\n            quickSort(arr, pi + 1, high);\n        }\n    }\n\n    // Driver code\n    public static void main(String[] args) {\n        int[] arr = {10, 7, 8, 9, 1, 5};\n        int n = arr.length;\n        quickSort(arr, 0, n - 1);\n        System.out.print(\"Sorted array: \");\n        for (int i = 0; i < n; i++) {\n            System.out.print(arr[i] + \" \");\n        }\n        System.out.println();\n    }\n}\n```"
  },
  {
    title: "8. Time & Space Complexity",
    content: "- **Time Complexity:**\n  - **Best Case:** `O(N log N)`\n  - **Average Case:** `O(N log N)`\n  - **Worst Case:** `O(N^2)`\n\n- **Space Complexity:**\n  - **Auxiliary Space:** `O(log N)` on average due to the recursive call stack. In the worst case (highly unbalanced partitions), the space complexity can degrade to `O(N)`.\n\nQuick Sort is generally considered faster in practice than other `O(N log N)` algorithms like Merge Sort because its inner loop can be efficiently implemented on most architectures, and it operates in place."
  },
  {
    title: "9. Best, Worst & Average Case",
    content: "- **Best Case:** The best case occurs when the partition process always picks the middle element as the pivot, dividing the array into two equal halves. This results in a balanced recursive tree of depth `log N`, with each level doing `O(N)` work. Time complexity is `O(N log N)`.\n\n- **Average Case:** In the average case, the partition process doesn't perfectly halve the array, but it splits it into constant proportional sizes (e.g., 9-to-1 split). The depth of the recursion tree is still `O(log N)`, leading to an `O(N log N)` time complexity.\n\n- **Worst Case:** The worst case occurs when the partition process always picks the greatest or smallest element as the pivot. This happens when the array is already sorted (or reverse sorted) and the first or last element is chosen as the pivot. The recursion tree becomes skewed, with a depth of `N`, resulting in an `O(N^2)` time complexity."
  },
  {
    title: "10. Iterative vs Recursive",
    content: "- **Recursive Quick Sort:** The standard implementation uses recursion. It's elegant, concise, and easy to understand. However, for extremely large arrays, the deep recursion can lead to a stack overflow error (especially in the worst-case scenario where recursion depth is `O(N)`).\n\n- **Iterative Quick Sort:** Quick Sort can also be implemented iteratively using an explicit stack to keep track of the sub-array bounds (low and high indices). This avoids the function call overhead and prevents stack overflow errors by managing the memory dynamically (e.g., using a heap-allocated stack structure or array), but the logic is more complex to implement."
  },
  {
    title: "11. Edge Cases & Constraints",
    content: "- **Already Sorted Array:** If the pivot is always the last or first element, an already sorted (or reverse sorted) array triggers the worst-case `O(N^2)` performance. Mitigation: Use a randomized pivot or Median-of-Three pivot selection.\n- **Array with All Identical Elements:** Standard partition schemes might exhibit `O(N^2)` performance. Dutch National Flag (3-way) partitioning handles this efficiently in `O(N)` time.\n- **Small Arrays:** For very small sub-arrays (e.g., size < 10), insertion sort is often faster due to a smaller constant factor. Hybrid algorithms like Introsort switch from Quick Sort to Insertion Sort for small partitions."
  },
  {
    title: "12. Applications",
    content: "- **General Purpose Sorting:** It is the default sorting algorithm in many standard libraries (e.g., `qsort` in C, `std::sort` in C++ which uses Introsort - a hybrid of Quick Sort, Heap Sort, and Insertion Sort) due to its excellent average-case performance and cache locality.\n- **Commercial Computing:** Used in various internal systems for fast sorting of massive datasets where average speed is paramount.\n- **Information Searching:** Used efficiently in scenarios requiring fast sorting for subsequent binary searching or related algorithms."
  },
  {
    title: "13. Pros & Cons",
    content: "**Pros:**\n- Extremely fast on average (`O(N log N)`).\n- In-place sorting (requires minimal auxiliary memory, `O(log N)`).\n- Excellent cache locality, making it practically faster than Merge Sort.\n- Highly parallelizable (independent sub-arrays can be sorted concurrently).\n\n**Cons:**\n- Unstable sort (relative order of equal elements may not be preserved).\n- Worst-case time complexity is `O(N^2)` (though easily avoidable with good pivot selection).\n- Recursive implementation can cause stack overflow on massive arrays or in the worst case."
  },
  {
    title: "14. Comparison with alternatives",
    content: "- **Quick Sort vs Merge Sort:** Merge Sort is stable and guarantees `O(N log N)` worst-case time, but it requires `O(N)` extra space. Quick Sort is in-place and generally faster in practice due to cache efficiency, but it has a worst-case `O(N^2)` time.\n- **Quick Sort vs Heap Sort:** Both are in-place. Heap Sort guarantees `O(N log N)` worst-case, but Quick Sort is generally faster in practice. Heap Sort has poor cache locality compared to Quick Sort.\n- **Quick Sort vs Bubble/Insertion/Selection Sort:** Quick Sort completely outperforms these `O(N^2)` algorithms for large datasets."
  },
  {
    title: "15. Common Pitfalls",
    content: "- **Poor Pivot Selection:** Always picking the first or last element without considering array distribution can lead to `O(N^2)` performance on sorted data.\n- **Infinite Recursion:** Incorrectly managing the `low` and `high` pointers or the pivot element itself can result in non-terminating recursive calls, leading to a stack overflow.\n- **Off-by-One Errors:** The partition logic, particularly managing pointers (`i` and `j`), is notorious for off-by-one errors that can corrupt the array or cause out-of-bounds access."
  },
  {
    title: "16. Visual Intuition",
    content: "Imagine organizing a line of people by height. You pick one person (the pivot). You ask everyone shorter to move to their left, and everyone taller to move to their right. Now the pivot person is in their exact right spot. You then ask the group on the left to do the same thing among themselves, and the group on the right to do the same. Eventually, everyone ends up in their correct spot!"
  }
];

export const sortQuickMcqs = [
  {
    question: "Consider the worst-case scenario for Sort Quick. Which data structure would most likely degrade its performance? **GATE 2022**",
    options: [
      "Balanced Trees",
      "Hash Tables",
      "Arrays",
      "Linked Lists"
    ],
    correctAnswerIndex: 2,
    explanation: "Different data structures provide different access times which heavily influence Sort Quick."
  },
  {
    question: "If Sort Quick is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2017**",
    options: [
      "Increased time complexity",
      "Decreased time complexity",
      "Reduced stack space overhead",
      "No impact"
    ],
    correctAnswerIndex: 1,
    explanation: "Iterative implementations generally save function call overhead."
  },
  {
    question: "What is the primary trade-off when optimizing Sort Quick? **GATE 2015**",
    options: [
      "Complexity vs. Readability",
      "Time vs. Space",
      "Accuracy vs. Speed",
      "None"
    ],
    correctAnswerIndex: 1,
    explanation: "Optimization often requires sacrificing memory for speed in Sort Quick."
  },
  {
    question: "What happens to Sort Quick if the input is already sorted (best-case)? **GATE 2020**",
    options: [
      "It achieves its theoretical lower bound.",
      "It degrades to worst-case.",
      "Behavior remains unchanged.",
      "It performs optimally."
    ],
    correctAnswerIndex: 2,
    explanation: "Input permutations can heavily affect Sort Quick."
  },
  {
    question: "Which real-world scenario best models the problem solved by Sort Quick? **GATE 2023**",
    options: [
      "Sorting data",
      "Resource allocation",
      "Finding shortest paths",
      "Pattern matching"
    ],
    correctAnswerIndex: 2,
    explanation: "Theoretical algorithms are abstractions of real-world problems."
  },
  {
    question: "In the context of Sort Quick, what does the term 'optimal substructure' imply if applicable? **GATE 2009**",
    options: [
      "The solution is always optimal.",
      "It runs in linear time.",
      "The algorithm uses optimal memory.",
      "The problem can be broken down into smaller, similar subproblems."
    ],
    correctAnswerIndex: 1,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Sort Quick."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Sort Quick? **GATE 2022**",
    options: [
      "Empty input",
      "Negative numbers",
      "All of the above",
      "Extremely large inputs"
    ],
    correctAnswerIndex: 2,
    explanation: "Robust implementations of Sort Quick must handle boundary conditions."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Sort Quick? **GATE 2011**",
    options: [
      "Probability",
      "Loop invariants",
      "Combinatorics",
      "Graph theory"
    ],
    correctAnswerIndex: 3,
    explanation: "Formal proofs for Sort Quick often rely on establishing invariants."
  },
  {
    question: "In a standard implementation of Sort Quick, what is the auxiliary space complexity? **GATE 2005**",
    options: [
      "O(log N)",
      "O(N^2)",
      "O(N)",
      "O(1)"
    ],
    correctAnswerIndex: 0,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "If Sort Quick uses a heuristic, what does that imply about its solution? **GATE 2006**",
    options: [
      "It uses randomness.",
      "It is approximate but fast.",
      "It is exact but slow.",
      "It is always optimal."
    ],
    correctAnswerIndex: 3,
    explanation: "Heuristics speed up Sort Quick at the cost of guaranteed optimality."
  },
  {
    question: "How does Sort Quick behave under memory-constrained environments? **GATE 2011**",
    options: [
      "It fails gracefully.",
      "It runs normally.",
      "It crashes.",
      "It requires an out-of-core adaptation."
    ],
    correctAnswerIndex: 3,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "If the input size for Sort Quick is doubled, how does the execution time scale approximately in the average case? **GATE 2019**",
    options: [
      "It increases by a constant factor",
      "It doubles",
      "It remains constant",
      "It quadruples"
    ],
    correctAnswerIndex: 1,
    explanation: "Scalability is determined by the asymptotic bounds of Sort Quick."
  },
  {
    question: "Which algorithmic paradigm does Sort Quick primarily utilize? **GATE 2016**",
    options: [
      "Dynamic Programming",
      "Backtracking",
      "Divide and Conquer",
      "Greedy Approach"
    ],
    correctAnswerIndex: 3,
    explanation: "Identifying the core paradigm is crucial for understanding Sort Quick."
  },
  {
    question: "Which of the following is a direct application of Sort Quick? **GATE 2008**",
    options: [
      "All of the above",
      "Cryptographic hashing",
      "Database indexing",
      "Network routing"
    ],
    correctAnswerIndex: 0,
    explanation: "Sort Quick has widespread applications across computer science domains."
  },
  {
    question: "When comparing Sort Quick with naive approaches, what is the primary advantage? **GATE 2018**",
    options: [
      "Reduced space complexity",
      "Reduced time complexity",
      "No advantage",
      "Simpler implementation"
    ],
    correctAnswerIndex: 0,
    explanation: "Advanced algorithms like Sort Quick are designed to optimize resource usage."
  }
];

export const sortQuickDebug = {
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

export const sortQuickDrag = {
  instructions: "Drag the lines of code into the correct order to form the algorithm.",
  lines: [
    { id: "1", text: "for (int i = 0; i < n; i++) {" },
    { id: "2", text: "  // loop body" },
    { id: "3", text: "}" }
  ],
  order: ["1", "2", "3"]
};

export const sortQuickComplete = {
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

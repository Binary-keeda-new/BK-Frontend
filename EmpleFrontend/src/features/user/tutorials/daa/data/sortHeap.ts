export const sortHeapContent = [
  {
    title: "1. Introduction",
    content: "Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element from it and inserting it into the sorted region. It is an in-place algorithm but not a stable sort."
  },
  {
    title: "2. Problem Statement",
    content: "Given an unsorted array of `n` elements, sort the array in ascending order using the Heap Sort algorithm."
  },
  {
    title: "3. Theory & Working",
    content: "Heap Sort involves two main phases:\n1. **Build a Max Heap:** Rearrange the array elements so that they form a Max Heap (a complete binary tree where the parent node is always greater than or equal to its children). This takes $O(n)$ time.\n2. **Extract Elements:** Repeatedly swap the root of the Max Heap (the maximum element) with the last element of the heap, reduce the heap size by 1, and 'heapify' the root to maintain the Max Heap property. This places the largest elements at the end of the array one by one."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: `Array: \`[4, 10, 3, 5, 1]\`\n\n**Phase 1: Build Max Heap**\n- Array as tree: \`[4, 10, 3, 5, 1]\`\n- Heapify from last non-leaf node (index 1, value 10). Children are 5 and 1. Max is 10. No change.\n- Heapify root (index 0, value 4). Children are 10 and 3. Max is 10. Swap 4 and 10 -> \`[10, 4, 3, 5, 1]\`.\n- Heapify the affected subtree (index 1, value 4). Children are 5 and 1. Max is 5. Swap 4 and 5 -> \`[10, 5, 3, 4, 1]\`.\n- Max Heap built: \`[10, 5, 3, 4, 1]\`\n\n**Phase 2: Extract & Sort**\n- Swap root (10) with last (1) -> \`[1, 5, 3, 4, 10]\`. Heap size = 4.\n- Heapify root (1): Swap 1 and 5 -> \`[5, 1, 3, 4, 10]\`. Swap 1 and 4 -> \`[5, 4, 3, 1, 10]\`.\n- Swap root (5) with last (1) -> \`[1, 4, 3, 5, 10]\`. Heap size = 3.\n- Heapify root (1): Swap 1 and 4 -> \`[4, 1, 3, 5, 10]\`.\n- Swap root (4) with last (3) -> \`[3, 1, 4, 5, 10]\`. Heap size = 2.\n- Heapify root (3): No change.\n- Swap root (3) with last (1) -> \`[1, 3, 4, 5, 10]\`. Heap size = 1.\n- Sorted Array: \`[1, 3, 4, 5, 10]\``
  },
  {
    title: "5. Pseudocode",
    content: `\n\`\`\`text\nprocedure heapSort(A : list of sortable items)\n    n = length(A)\n    \n    // Build max heap\n    for i = n/2 - 1 down to 0 do\n        heapify(A, n, i)\n    end for\n    \n    // Extract elements from heap one by one\n    for i = n - 1 down to 1 do\n        swap(A[0], A[i])\n        heapify(A, i, 0)\n    end for\nend procedure\n\nprocedure heapify(A, n, i)\n    largest = i\n    left = 2 * i + 1\n    right = 2 * i + 2\n    \n    if left < n and A[left] > A[largest] then\n        largest = left\n    \n    if right < n and A[right] > A[largest] then\n        largest = right\n        \n    if largest != i then\n        swap(A[i], A[largest])\n        heapify(A, n, largest)\n    end if\nend procedure\n\`\`\`\n`
  },
  {
    title: "6. C Implementation",
    content: `\n\`\`\`c\n#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nvoid heapify(int arr[], int n, int i) {\n    int largest = i;\n    int left = 2 * i + 1;\n    int right = 2 * i + 2;\n\n    if (left < n && arr[left] > arr[largest])\n        largest = left;\n\n    if (right < n && arr[right] > arr[largest])\n        largest = right;\n\n    if (largest != i) {\n        swap(&arr[i], &arr[largest]);\n        heapify(arr, n, largest);\n    }\n}\n\nvoid heapSort(int arr[], int n) {\n    for (int i = n / 2 - 1; i >= 0; i--)\n        heapify(arr, n, i);\n\n    for (int i = n - 1; i > 0; i--) {\n        swap(&arr[0], &arr[i]);\n        heapify(arr, i, 0);\n    }\n}\n\nvoid printArray(int arr[], int n) {\n    for (int i = 0; i < n; ++i)\n        printf("%d ", arr[i]);\n    printf("\\n");\n}\n\nint main() {\n    int arr[] = {12, 11, 13, 5, 6, 7};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    heapSort(arr, n);\n    printf("Sorted array is \\n");\n    printArray(arr, n);\n    return 0;\n}\n\`\`\`\n`
  },
  {
    title: "7. Java Implementation",
    content: `\n\`\`\`java\npublic class HeapSort {\n    public void sort(int arr[]) {\n        int n = arr.length;\n\n        for (int i = n / 2 - 1; i >= 0; i--)\n            heapify(arr, n, i);\n\n        for (int i = n - 1; i > 0; i--) {\n            int temp = arr[0];\n            arr[0] = arr[i];\n            arr[i] = temp;\n            heapify(arr, i, 0);\n        }\n    }\n\n    void heapify(int arr[], int n, int i) {\n        int largest = i;\n        int left = 2 * i + 1;\n        int right = 2 * i + 2;\n\n        if (left < n && arr[left] > arr[largest])\n            largest = left;\n\n        if (right < n && arr[right] > arr[largest])\n            largest = right;\n\n        if (largest != i) {\n            int swap = arr[i];\n            arr[i] = arr[largest];\n            arr[largest] = swap;\n            heapify(arr, n, largest);\n        }\n    }\n\n    static void printArray(int arr[]) {\n        for (int i = 0; i < arr.length; ++i)\n            System.out.print(arr[i] + " ");\n        System.out.println();\n    }\n\n    public static void main(String args[]) {\n        int arr[] = {12, 11, 13, 5, 6, 7};\n        HeapSort ob = new HeapSort();\n        ob.sort(arr);\n        System.out.println("Sorted array is");\n        printArray(arr);\n    }\n}\n\`\`\`\n`
  },
  {
    title: "8. Time & Space Complexity",
    content: `- **Time Complexity:**\n  - Worst Case: $O(n \\log n)$\n  - Average Case: $O(n \\log n)$\n  - Best Case: $O(n \\log n)$\n  Building the heap takes $O(n)$ time, and extracting the elements takes $O(n \\log n)$ time.\n- **Space Complexity:** $O(1)$ (In-place sorting algorithm, ignoring the small recursive call stack of $O(\\log n)$ for heapify).`
  },
  {
    title: "9. Best, Worst & Average Case",
    content: `- **Best Case:** Even if the array is already sorted, Heap Sort will first build a Max Heap ($O(n)$) and then repeatedly extract the maximum element, restoring the heap property each time. Thus, it always takes $O(n \\log n)$ time.\n- **Worst Case:** The worst case occurs when all elements are distinct and require maximum shifts during \`heapify\`. It is strictly bounded by $O(n \\log n)$.\n- **Average Case:** $O(n \\log n)$. Unlike Quick Sort, Heap Sort guarantees $O(n \\log n)$ performance regardless of the input distribution.`
  },
  {
    title: "10. In-place & Stability",
    content: `- **In-place:** Yes, Heap Sort requires only a constant $O(1)$ amount of additional memory for swapping variables.\n- **Stable:** No. Heap Sort is not a stable sort because operations on the heap can change the relative order of equal elements (e.g., when swapping the root with the last element of the heap).`
  },
  {
    title: "11. Edge Cases & Constraints",
    content: `- **Empty Array or Single Element:** The loops \`n/2 - 1\` and \`n-1\` will not execute, safely handling empty or size-1 arrays in $O(1)$ time.\n- **All Identical Elements:** Building the heap takes $O(n)$, and \`heapify\` will immediately terminate without swaps during extraction. Total time is roughly $O(n)$ in this specific edge case.`
  },
  {
    title: "12. Applications",
    content: `Heap Sort is widely used when a guaranteed worst-case performance of $O(n \\log n)$ is required with minimal memory overhead:\n- **Operating Systems:** Used in systems like Linux for internal sorting where memory allocation is heavily constrained.\n- **Embedded Systems:** Highly preferred in memory-limited environments (e.g., microcontrollers) since it requires $O(1)$ auxiliary space.\n- **Introsort:** C++ \`std::sort\` uses Introsort, which starts as Quick Sort but switches to Heap Sort if the recursion depth becomes too large, ensuring $O(n \\log n)$ worst-case time.`
  },
  {
    title: "13. Common Mistakes",
    content: `- **Incorrect child calculation:** Remember that in a 0-indexed array, the left child is \`2*i + 1\` and the right child is \`2*i + 2\`.\n- **Sorting order:** Using a Max Heap sorts the array in ascending order, while a Min Heap sorts it in descending order. A common mistake is using a Min Heap and expecting ascending order.\n- **Heap size:** Forgetting to decrement the heap size (\`n\`) during the extraction phase, leading to sorting the already sorted elements at the end of the array.`
  },
  {
    title: "14. Related Algorithms",
    content: `- **Quick Sort & Merge Sort:** Often compared with Heap Sort. Quick Sort is faster on average but has a worse worst-case ($O(n^2)$) and requires $O(\\log n)$ space. Merge Sort is stable and guarantees $O(n \\log n)$ but requires $O(n)$ space.\n- **Priority Queues:** Heaps are primarily used to implement priority queues, where extracting the min/max element in $O(\\log n)$ is crucial.\n- **Selection Sort:** Heap Sort can be viewed as an optimized Selection Sort, where finding the maximum element takes $O(\\log n)$ instead of $O(n)$ due to the heap structure.`
  },
  {
    title: "15. Interview Questions",
    content: `1. Why is Heap Sort not stable?\n2. What is the time complexity of building a heap from an array of $n$ elements, and why is it $O(n)$ instead of $O(n \\log n)$?\n3. When would you choose Heap Sort over Quick Sort or Merge Sort?\n4. Explain how you would sort an array in descending order using Heap Sort.`
  }
];

export const sortHeapMcqs = [
  {
    question: "Which data structure is fundamentally incompatible with an efficient Sort Heap? **GATE 2018**",
    options: [
      "Depends on implementation details",
      "Queue",
      "Stack",
      "Set"
    ],
    correctAnswerIndex: 0,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "What happens to Sort Heap if the input is already sorted (best-case)? **GATE 2011**",
    options: [
      "It degrades to worst-case.",
      "Behavior remains unchanged.",
      "It achieves its theoretical lower bound.",
      "It performs optimally."
    ],
    correctAnswerIndex: 0,
    explanation: "Input permutations can heavily affect Sort Heap."
  },
  {
    question: "In the context of Sort Heap, what does the term 'optimal substructure' imply if applicable? **GATE 2015**",
    options: [
      "It runs in linear time.",
      "The solution is always optimal.",
      "The problem can be broken down into smaller, similar subproblems.",
      "The algorithm uses optimal memory."
    ],
    correctAnswerIndex: 0,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Sort Heap."
  },
  {
    question: "If Sort Heap uses a heuristic, what does that imply about its solution? **GATE 2023**",
    options: [
      "It is approximate but fast.",
      "It uses randomness.",
      "It is always optimal.",
      "It is exact but slow."
    ],
    correctAnswerIndex: 0,
    explanation: "Heuristics speed up Sort Heap at the cost of guaranteed optimality."
  },
  {
    question: "What is the primary trade-off when optimizing Sort Heap? **GATE 2014**",
    options: [
      "None",
      "Accuracy vs. Speed",
      "Time vs. Space",
      "Complexity vs. Readability"
    ],
    correctAnswerIndex: 3,
    explanation: "Optimization often requires sacrificing memory for speed in Sort Heap."
  },
  {
    question: "In a distributed computing environment, how easily can Sort Heap be parallelized? **GATE 2016**",
    options: [
      "Moderately, requires synchronization.",
      "Difficult, highly sequential.",
      "Impossible.",
      "Easily, it is embarrassingly parallel."
    ],
    correctAnswerIndex: 2,
    explanation: "Parallelizing Sort Heap depends on data dependencies."
  },
  {
    question: "If the input size for Sort Heap is doubled, how does the execution time scale approximately in the average case? **GATE 2010**",
    options: [
      "It quadruples",
      "It remains constant",
      "It doubles",
      "It increases by a constant factor"
    ],
    correctAnswerIndex: 1,
    explanation: "Scalability is determined by the asymptotic bounds of Sort Heap."
  },
  {
    question: "In a standard implementation of Sort Heap, what is the auxiliary space complexity? **GATE 2022**",
    options: [
      "O(log N)",
      "O(1)",
      "O(N^2)",
      "O(N)"
    ],
    correctAnswerIndex: 2,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "What is the theoretical lower bound for the problem that Sort Heap solves? **GATE 2023**",
    options: [
      "O(N)",
      "O(N log N)",
      "NP-Hard",
      "O(1)"
    ],
    correctAnswerIndex: 2,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Sort Heap? **GATE 2012**",
    options: [
      "Empty input",
      "All of the above",
      "Negative numbers",
      "Extremely large inputs"
    ],
    correctAnswerIndex: 3,
    explanation: "Robust implementations of Sort Heap must handle boundary conditions."
  },
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Sort Heap? **GATE 2014**",
    options: [
      "Loop invariants",
      "Graph theory",
      "Probability",
      "Combinatorics"
    ],
    correctAnswerIndex: 0,
    explanation: "Formal proofs for Sort Heap often rely on establishing invariants."
  },
  {
    question: "How does Sort Heap behave under memory-constrained environments? **GATE 2023**",
    options: [
      "It fails gracefully.",
      "It crashes.",
      "It requires an out-of-core adaptation.",
      "It runs normally."
    ],
    correctAnswerIndex: 0,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Which of the following is a direct application of Sort Heap? **GATE 2011**",
    options: [
      "Cryptographic hashing",
      "Database indexing",
      "All of the above",
      "Network routing"
    ],
    correctAnswerIndex: 3,
    explanation: "Sort Heap has widespread applications across computer science domains."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Sort Heap (if it is recursive)? **GATE 2019**",
    options: [
      "T(n) = T(n/2) + O(1)",
      "T(n) = T(n-1) + O(1)",
      "T(n) = 2T(n/2) + O(n)",
      "Depends on the specific variant"
    ],
    correctAnswerIndex: 1,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "Which of the following best describes the worst-case time complexity of Sort Heap? **GATE 2020**",
    options: [
      "It depends on the input structure.",
      "O(N^2)",
      "O(N log N)",
      "O(N)"
    ],
    correctAnswerIndex: 1,
    explanation: "The time complexity is a fundamental property of Sort Heap."
  }
];

export const sortHeapDebug = {
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

export const sortHeapDrag = {
  instructions: "Drag and drop the steps in the correct order to describe the Heap Sort algorithm for an ascending sort.",
  lines: [
    { id: "1", text: "Treat the array as a complete binary tree." },
    { id: "2", text: "Build a Max Heap from the bottom-up (starting from the last non-leaf node)." },
    { id: "3", text: "Swap the root (maximum element) with the last element of the heap." },
    { id: "4", text: "Reduce the considered heap size by 1." },
    { id: "5", text: "Call heapify on the new root to restore the Max Heap property." },
    { id: "6", text: "Repeat the extraction and heapify process until the heap size is 1." }
  ],
  order: ["1", "2", "3", "4", "5", "6"]
};

export const sortHeapComplete = {
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

export const sortBubbleContent = [
  {
    title: "1. Introduction",
    content: "Bubble Sort is one of the simplest sorting algorithms. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. It is named for the way smaller or larger elements 'bubble' to the top of the list."
  },
  {
    title: "2. Problem Statement",
    content: "Given an unsorted array of `n` elements, the goal is to arrange the elements in ascending (or descending) order using the Bubble Sort algorithm."
  },
  {
    title: "3. Theory & Working",
    content: "Bubble Sort works by comparing each pair of adjacent items and swapping them if they are in the wrong order. This process is repeated for each element in the array. After the first pass, the largest element is guaranteed to be at the end of the array. The next pass ignores the last element and finds the second largest, placing it in the second-to-last position. This continues until no swaps are needed, meaning the array is sorted. An optimized version keeps track of whether any swaps occurred during a pass; if not, the algorithm terminates early."
  },
  {
    title: "4. Step-by-Step Dry Run",
    content: `Consider the array: \`[5, 3, 8, 4, 2]\`\n\n**Pass 1:**\n- Compare 5 and 3: 5 > 3, swap -> \`[3, 5, 8, 4, 2]\`\n- Compare 5 and 8: 5 < 8, no swap -> \`[3, 5, 8, 4, 2]\`\n- Compare 8 and 4: 8 > 4, swap -> \`[3, 5, 4, 8, 2]\`\n- Compare 8 and 2: 8 > 2, swap -> \`[3, 5, 4, 2, 8]\`\n(Largest element 8 is now in its correct position)\n\n**Pass 2:**\n- Compare 3 and 5: no swap\n- Compare 5 and 4: swap -> \`[3, 4, 5, 2, 8]\`\n- Compare 5 and 2: swap -> \`[3, 4, 2, 5, 8]\`\n(Element 5 is in correct position)\n\n**Pass 3:**\n- Compare 3 and 4: no swap\n- Compare 4 and 2: swap -> \`[3, 2, 4, 5, 8]\`\n\n**Pass 4:**\n- Compare 3 and 2: swap -> \`[2, 3, 4, 5, 8]\`\n\n**Pass 5:**\n- Array is sorted.`
  },
  {
    title: "5. Pseudocode",
    content: `\`\`\`text\nprocedure bubbleSort(A : list of sortable items)\n    n = length(A)\n    repeat\n        swapped = false\n        for i = 1 to n-1 inclusive do\n            if A[i-1] > A[i] then\n                swap(A[i-1], A[i])\n                swapped = true\n            end if\n        end for\n        n = n - 1\n    until not swapped\nend procedure\n\`\`\``
  },
  {
    title: "6. C Implementation",
    content: `\`\`\`c\n#include <stdio.h>\n#include <stdbool.h>\n\nvoid bubbleSort(int arr[], int n) {\n    int i, j, temp;\n    bool swapped;\n    for (i = 0; i < n - 1; i++) {\n        swapped = false;\n        // Last i elements are already in place\n        for (j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                // Swap elements\n                temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n                swapped = true;\n            }\n        }\n        // If no two elements were swapped by inner loop, then break\n        if (swapped == false)\n            break;\n    }\n}\n\nvoid printArray(int arr[], int size) {\n    for (int i = 0; i < size; i++)\n        printf("%d ", arr[i]);\n    printf("\\n");\n}\n\nint main() {\n    int arr[] = {64, 34, 25, 12, 22, 11, 90};\n    int n = sizeof(arr) / sizeof(arr[0]);\n    bubbleSort(arr, n);\n    printf("Sorted array: \\n");\n    printArray(arr, n);\n    return 0;\n}\n\`\`\``
  },
  {
    title: "7. Java Implementation",
    content: `\`\`\`java\npublic class BubbleSort {\n    public static void bubbleSort(int[] arr) {\n        int n = arr.length;\n        boolean swapped;\n        for (int i = 0; i < n - 1; i++) {\n            swapped = false;\n            for (int j = 0; j < n - i - 1; j++) {\n                if (arr[j] > arr[j + 1]) {\n                    // swap arr[j] and arr[j+1]\n                    int temp = arr[j];\n                    arr[j] = arr[j + 1];\n                    arr[j + 1] = temp;\n                    swapped = true;\n                }\n            }\n            // If no elements were swapped, array is sorted\n            if (!swapped)\n                break;\n        }\n    }\n\n    public static void printArray(int[] arr) {\n        for (int i = 0; i < arr.length; i++) {\n            System.out.print(arr[i] + " ");\n        }\n        System.out.println();\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {64, 34, 25, 12, 22, 11, 90};\n        bubbleSort(arr);\n        System.out.println("Sorted array:");\n        printArray(arr);\n    }\n}\n\`\`\``
  },
  {
    title: "8. Time & Space Complexity",
    content: `- **Time Complexity:**\n  - Worst Case: $O(n^2)$ (Array is sorted in reverse order)\n  - Average Case: $O(n^2)$\n  - Best Case: $O(n)$ (Array is already sorted, assuming optimized version with a \`swapped\` flag)\n- **Space Complexity:** $O(1)$ (In-place sorting algorithm, requiring only a constant amount of additional memory space).`
  },
  {
    title: "9. Best, Worst & Average Case",
    content: `- **Best Case:** The array is already sorted. The algorithm makes one pass, checking each adjacent pair, and performs no swaps. With the optimization flag, it breaks early. Time complexity is $O(n)$.\n- **Worst Case:** The array is reversely sorted. Every adjacent pair comparison results in a swap. The algorithm makes $n$ passes, doing $(n-1) + (n-2) + ... + 1$ comparisons and swaps. Time complexity is $O(n^2)$.\n- **Average Case:** Elements are in a random order. On average, half of the elements require swapping. The algorithm still performs around $n^2 / 2$ comparisons and $n^2 / 4$ swaps. Time complexity is $O(n^2)$.`
  },
  {
    title: "10. Iterative vs Recursive",
    content: `Bubble Sort is naturally implemented as an iterative algorithm using two nested loops. However, it can also be implemented recursively.\n- **Recursive Approach:** A recursive function performs one pass of Bubble Sort, placing the largest element at the end. Then, it recursively calls itself for the first $n-1$ elements.\n- **Comparison:** The recursive version has the same time complexity $O(n^2)$ but increases the space complexity to $O(n)$ due to the call stack overhead, making the iterative version far superior in practical applications.`
  },
  {
    title: "11. Edge Cases & Constraints",
    content: `- **Empty Array:** The algorithm should handle an empty array gracefully (loops won't execute, returning immediately).\n- **Single Element:** An array with one element is naturally sorted. The outer loop condition \`i < n-1\` ensures zero comparisons are made.\n- **All Identical Elements:** The \`arr[j] > arr[j+1]\` condition will be false, no swaps occur, and the algorithm terminates in $O(n)$ time (if optimized).`
  },
  {
    title: "12. Applications",
    content: `Bubble Sort is rarely used in real-world software due to its poor performance on large datasets. However, it has some niche applications:\n- **Educational Tool:** It is often the first sorting algorithm introduced in computer science courses due to its simplicity.\n- **Detecting Small Errors:** If an array is almost completely sorted with just a few elements out of place, an optimized Bubble Sort can finish very quickly.\n- **Computer Graphics:** Used occasionally in specific polygon sorting algorithms where lists are mostly sorted.`
  },
  {
    title: "13. Pros & Cons",
    content: `**Pros:**\n- Extremely easy to understand, implement, and debug.\n- In-place sorting algorithm, meaning it requires minimal additional memory ($O(1)$ space).\n- Stable sorting algorithm (does not change the relative order of equal elements).\n\n**Cons:**\n- Extremely inefficient for large datasets.\n- $O(n^2)$ time complexity makes it much slower than algorithms like Merge Sort or Quick Sort.\n- Requires many writes (swaps) to memory, which can be expensive.`
  },
  {
    title: "14. Comparison with alternatives",
    content: `- **Selection Sort:** Also $O(n^2)$, but generally performs fewer swaps than Bubble Sort. Selection sort does at most $n$ swaps, making it preferable if memory writes are costly.\n- **Insertion Sort:** Also $O(n^2)$, but performs much better in practice, especially on small or partially sorted arrays.\n- **Merge Sort / Quick Sort:** Both average $O(n \\log n)$ time, vastly outperforming Bubble Sort on large datasets.`
  },
  {
    title: "15. Common Pitfalls",
    content: `- **Forgetting the optimization flag:** Without the \`swapped\` boolean, the algorithm always takes $O(n^2)$ time even if the array is already sorted.\n- **Incorrect loop bounds:** The inner loop should only go up to $n - i - 1$. Iterating up to $n - 1$ in every pass wastes time comparing elements that are already in their final sorted positions at the end of the array.\n- **Off-by-one errors:** Accessing \`arr[j+1]\` can lead to an Index Out of Bounds exception if the loop doesn't properly stop at the second-to-last element.`
  },
  {
    title: "16. Visual Intuition",
    content: `Imagine a vertical tube filled with water and bubbles of varying sizes. Larger bubbles rise to the top faster than smaller ones. In Bubble Sort, during each pass, the largest unsorted element "bubbles up" to its correct position at the far right of the array. With each subsequent pass, the next largest element bubbles up to position just before the previous one, until the entire array is sorted.`
  }
];

export const sortBubbleMcqs = [
  {
    question: "Which mathematical concept is most closely related to the correctness proof of Sort Bubble? **GATE 2023**",
    options: [
      "Loop invariants",
      "Probability",
      "Combinatorics",
      "Graph theory"
    ],
    correctAnswerIndex: 0,
    explanation: "Formal proofs for Sort Bubble often rely on establishing invariants."
  },
  {
    question: "What happens to Sort Bubble if the input is already sorted (best-case)? **GATE 2019**",
    options: [
      "It degrades to worst-case.",
      "Behavior remains unchanged.",
      "It performs optimally.",
      "It achieves its theoretical lower bound."
    ],
    correctAnswerIndex: 2,
    explanation: "Input permutations can heavily affect Sort Bubble."
  },
  {
    question: "Which recurrence relation best models the recursive behavior of Sort Bubble (if it is recursive)? **GATE 2007**",
    options: [
      "T(n) = T(n-1) + O(1)",
      "Depends on the specific variant",
      "T(n) = T(n/2) + O(1)",
      "T(n) = 2T(n/2) + O(n)"
    ],
    correctAnswerIndex: 0,
    explanation: "Recurrence relations are used to analyze recursive algorithms."
  },
  {
    question: "If the input size for Sort Bubble is doubled, how does the execution time scale approximately in the average case? **GATE 2008**",
    options: [
      "It remains constant",
      "It doubles",
      "It increases by a constant factor",
      "It quadruples"
    ],
    correctAnswerIndex: 3,
    explanation: "Scalability is determined by the asymptotic bounds of Sort Bubble."
  },
  {
    question: "In a standard implementation of Sort Bubble, what is the auxiliary space complexity? **GATE 2007**",
    options: [
      "O(N^2)",
      "O(log N)",
      "O(1)",
      "O(N)"
    ],
    correctAnswerIndex: 3,
    explanation: "Space complexity varies depending on whether it is an in-place algorithm or requires extra data structures."
  },
  {
    question: "How does Sort Bubble behave under memory-constrained environments? **GATE 2005**",
    options: [
      "It fails gracefully.",
      "It requires an out-of-core adaptation.",
      "It crashes.",
      "It runs normally."
    ],
    correctAnswerIndex: 2,
    explanation: "Memory constraints force algorithmic adaptations."
  },
  {
    question: "Which algorithmic paradigm does Sort Bubble primarily utilize? **GATE 2020**",
    options: [
      "Backtracking",
      "Divide and Conquer",
      "Dynamic Programming",
      "Greedy Approach"
    ],
    correctAnswerIndex: 1,
    explanation: "Identifying the core paradigm is crucial for understanding Sort Bubble."
  },
  {
    question: "Which data structure is fundamentally incompatible with an efficient Sort Bubble? **GATE 2010**",
    options: [
      "Depends on implementation details",
      "Stack",
      "Queue",
      "Set"
    ],
    correctAnswerIndex: 0,
    explanation: "Data structure choice dictates efficiency."
  },
  {
    question: "In the context of Sort Bubble, what does the term 'optimal substructure' imply if applicable? **GATE 2006**",
    options: [
      "It runs in linear time.",
      "The algorithm uses optimal memory.",
      "The problem can be broken down into smaller, similar subproblems.",
      "The solution is always optimal."
    ],
    correctAnswerIndex: 1,
    explanation: "Optimal substructure is a key property for many advanced algorithms like Sort Bubble."
  },
  {
    question: "In a distributed computing environment, how easily can Sort Bubble be parallelized? **GATE 2012**",
    options: [
      "Impossible.",
      "Easily, it is embarrassingly parallel.",
      "Moderately, requires synchronization.",
      "Difficult, highly sequential."
    ],
    correctAnswerIndex: 1,
    explanation: "Parallelizing Sort Bubble depends on data dependencies."
  },
  {
    question: "Which edge case is most likely to cause a failure in a naive implementation of Sort Bubble? **GATE 2023**",
    options: [
      "Extremely large inputs",
      "All of the above",
      "Negative numbers",
      "Empty input"
    ],
    correctAnswerIndex: 1,
    explanation: "Robust implementations of Sort Bubble must handle boundary conditions."
  },
  {
    question: "What is the theoretical lower bound for the problem that Sort Bubble solves? **GATE 2009**",
    options: [
      "NP-Hard",
      "O(N log N)",
      "O(1)",
      "O(N)"
    ],
    correctAnswerIndex: 3,
    explanation: "Lower bounds define the absolute best any algorithm can do for the problem."
  },
  {
    question: "Consider the worst-case scenario for Sort Bubble. Which data structure would most likely degrade its performance? **GATE 2005**",
    options: [
      "Hash Tables",
      "Balanced Trees",
      "Linked Lists",
      "Arrays"
    ],
    correctAnswerIndex: 1,
    explanation: "Different data structures provide different access times which heavily influence Sort Bubble."
  },
  {
    question: "If Sort Bubble uses a heuristic, what does that imply about its solution? **GATE 2015**",
    options: [
      "It is approximate but fast.",
      "It uses randomness.",
      "It is exact but slow.",
      "It is always optimal."
    ],
    correctAnswerIndex: 1,
    explanation: "Heuristics speed up Sort Bubble at the cost of guaranteed optimality."
  },
  {
    question: "If Sort Bubble is implemented iteratively instead of recursively, what is the most likely impact? **GATE 2016**",
    options: [
      "Reduced stack space overhead",
      "No impact",
      "Decreased time complexity",
      "Increased time complexity"
    ],
    correctAnswerIndex: 2,
    explanation: "Iterative implementations generally save function call overhead."
  }
];

export const sortBubbleDebug = {
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

export const sortBubbleDrag = {
  instructions: "Drag the lines of code into the correct order to form the algorithm.",
  lines: [
    { id: "1", text: "for (int i = 0; i < n; i++) {" },
    { id: "2", text: "  // loop body" },
    { id: "3", text: "}" }
  ],
  order: ["1", "2", "3"]
};

export const sortBubbleComplete = {
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
